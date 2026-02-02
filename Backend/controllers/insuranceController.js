const supabase = require('../config/supabase')
const { addMonths, addYears, format } = require('date-fns')

exports.getPolicies = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .order('base_annual_premium', { ascending: true })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getUserSubscriptions = async (req, res) => {
  const { userId } = req.params
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, policies(*)')
      .eq('user_id', userId)

    if (error) throw error
    res.json(data || [])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get ALL subscriptions (Admin)
exports.getAllSubscriptions = async (req, res) => {
  try {
    console.log('🔍 [Admin] Fetching all subscriptions...')
    
    // DEBUG: Try simple count first
    const { count, error: countError } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
    
    console.log(`📊 Total subscriptions in DB: ${count}`)
    if (countError) console.error('❌ Count check failed:', countError)

    // Fetch subscriptions WITHOUT joins first
    const { data: rawSubs, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
        console.error('❌ Supabase Error:', error.message)
        console.error('Error details:', error)
        return res.status(500).json({ 
          error: error.message,
          details: error.details,
          hint: 'Check RLS policies or Supabase configuration'
        })
    }
    
    if (!rawSubs) {
      console.warn('⚠️ No subscriptions returned (null)')
      return res.json([])
    }
    
    console.log(`✅ Fetched ${rawSubs.length} raw subscriptions from DB`)
    rawSubs.forEach(s => console.log(`- Sub: ${s.id} User: ${s.user_id}`));

    // Manually fetch related data to avoid JOIN filtering
    const enrichedData = await Promise.all(
      rawSubs.map(async (sub) => {
        let policy = null
        let profile = null

        // Fetch policy if policy_id exists
        if (sub.policy_id) {
          const { data: policyData, error: policyError } = await supabase
            .from('policies')
            .select('id, name, base_annual_premium, coverage_amount')
            .eq('id', sub.policy_id)
            .single()
          
          if (policyError) {
            console.warn(`⚠️ Could not fetch policy ${sub.policy_id}:`, policyError.message)
          }
          policy = policyData
        }

        // Fetch profile if user_id exists
        if (sub.user_id) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('id, full_name, email, role')
            .eq('id', sub.user_id)
            .single()
          
          if (profileError) {
            console.warn(`⚠️ Could not fetch profile ${sub.user_id}:`, profileError.message)
          }
          profile = profileData
        }

        return {
          ...sub,
          policies: policy,
          profiles: profile
        }
      })
    )

    console.log(`✅ Final Data: Enriched ${enrichedData.length} subscriptions`)
    res.json(enrichedData || [])
  } catch (error) {
    console.error('❌ Controller Error:', error.message)
    console.error('Stack:', error.stack)
    res.status(500).json({ error: error.message, type: 'controller_error' })
  }
}

// Logic Helpers
const calculateNextPayment = (startDate, frequency) => {
    const start = new Date(startDate)
    let nextDate
    switch (frequency) {
      case 'monthly': nextDate = addMonths(start, 1); break;
      case 'quarterly': nextDate = addMonths(start, 3); break;
      case 'yearly': nextDate = addYears(start, 1); break;
      default: nextDate = addYears(start, 1);
    }
    return format(nextDate, 'yyyy-MM-dd')
}

exports.createSubscription = async (req, res) => {
  const { userId, policyId, frequency, amount, dob, healthStatus, isSmoker, medicalDocumentUrl } = req.body
  
  console.log('🔄 [Create Subscription] Received:', { userId, policyId, frequency, amount, dob, healthStatus, isSmoker })
  
  if (!userId || !policyId || !frequency || !amount) {
    console.error('❌ Missing required fields')
    return res.status(400).json({ error: 'Missing required fields: userId, policyId, frequency, amount' })
  }
  
  const nextPaymentDate = calculateNextPayment(new Date(), frequency)

  try {
    console.log('💾 Inserting subscription into database...')
    const { data: subData, error: subError } = await supabase
      .from('subscriptions')
      .insert([{
        user_id: userId,
        policy_id: policyId,
        frequency,
        amount,
        next_payment_date: nextPaymentDate,
        status: 'active',
        // Health assessment data
        dob: dob || null,
        health_status: healthStatus || null,
        is_smoker: isSmoker || false,
        medical_document_url: medicalDocumentUrl || null
      }])
      .select()
      .single()

    if (subError) {
      console.error('❌ Subscription insert error:', subError)
      throw subError
    }
    
    console.log('✅ Subscription created:', subData.id)

    // 2. Create Transaction
    console.log('💾 Creating transaction record...')
    const { error: txError } = await supabase
      .from('transactions')
      .insert([{
        user_id: userId,
        subscription_id: subData.id,
        amount,
        type: 'payment',
        description: 'Initial payment for subscription',
        status: 'completed'
      }])

    if (txError) {
      console.error('❌ Transaction insert error:', txError)
      throw txError
    }
    
    console.log('✅ Transaction created for subscription:', subData.id)
    
    res.status(201).json(subData)
  } catch (error) {
    console.error('❌ Controller Error:', error.message)
    res.status(400).json({ error: error.message, details: error })
  }
}

// ========== POLICY MANAGEMENT (Admin) ==========

// Create a new policy
exports.createPolicy = async (req, res) => {
  const { name, description, base_annual_premium, coverage_amount } = req.body
  
  console.log('📝 [Admin] Creating new policy:', name)
  
  if (!name || !base_annual_premium) {
    return res.status(400).json({ error: 'Missing required fields: name and base_annual_premium are required' })
  }

  try {
    const { data, error } = await supabase
      .from('policies')
      .insert([{
        name,
        description: description || '',
        base_annual_premium: parseFloat(base_annual_premium),
        coverage_amount: parseFloat(coverage_amount) || 50000000
      }])
      .select()
      .single()

    if (error) {
      console.error('❌ Policy creation error:', error)
      throw error
    }
    
    console.log('✅ Policy created:', data.id)
    res.status(201).json(data)
  } catch (error) {
    console.error('❌ Controller Error:', error.message)
    res.status(400).json({ error: error.message })
  }
}

// Update an existing policy
exports.updatePolicy = async (req, res) => {
  const { id } = req.params
  const { name, description, base_annual_premium, coverage_amount } = req.body
  
  console.log('📝 [Admin] Updating policy:', id)

  try {
    const updateData = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (base_annual_premium !== undefined) updateData.base_annual_premium = parseFloat(base_annual_premium)
    if (coverage_amount !== undefined) updateData.coverage_amount = parseFloat(coverage_amount)

    const { data, error } = await supabase
      .from('policies')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Policy update error:', error)
      throw error
    }
    
    if (!data) {
      return res.status(404).json({ error: 'Policy not found' })
    }
    
    console.log('✅ Policy updated:', data.id)
    res.json(data)
  } catch (error) {
    console.error('❌ Controller Error:', error.message)
    res.status(400).json({ error: error.message })
  }
}

// Delete a policy
exports.deletePolicy = async (req, res) => {
  const { id } = req.params
  
  console.log('🗑️ [Admin] Deleting policy:', id)

  try {
    // Check if policy has active subscriptions
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('policy_id', id)
      .eq('status', 'active')
      .limit(1)
    
    if (subError) throw subError
    
    if (subscriptions && subscriptions.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete policy with active subscriptions. Please cancel all subscriptions first.' 
      })
    }

    const { error } = await supabase
      .from('policies')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Policy delete error:', error)
      throw error
    }
    
    console.log('✅ Policy deleted:', id)
    res.json({ message: 'Policy deleted successfully', id })
  } catch (error) {
    console.error('❌ Controller Error:', error.message)
    res.status(400).json({ error: error.message })
  }
}

