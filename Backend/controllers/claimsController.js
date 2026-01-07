const supabase = require('../config/supabase')

exports.submitClaim = async (req, res) => {
  const { userId, policyId, amount, reason, description, documentUrl } = req.body

  try {
    const { data, error } = await supabase
      .from('claims')
      .insert([{
        user_id: userId,
        policy_id: policyId,
        amount,
        reason,
        description,
        document_url: documentUrl,
        status: 'pending'
      }])
      .select()
    
    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getUserClaims = async (req, res) => {
  const { userId } = req.params

  try {
    const { data, error } = await supabase
      .from('claims')
      .select('*, policies(*)')
      .eq('user_id', userId)

    if (error) throw error
    res.json(data || [])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getAllClaims = async (req, res) => {
  try {
    console.log('🔍 [Admin] Fetching all claims...')
    
    // Fetch claims without joins first
    const { data: rawClaims, error } = await supabase
      .from('claims')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching claims:', error)
      throw error
    }
    
    if (!rawClaims || rawClaims.length === 0) {
      console.log('📋 No claims found')
      return res.json([])
    }
    
    console.log(`✅ Fetched ${rawClaims.length} raw claims`)

    // Manually fetch related data to ensure profiles are included
    const enrichedData = await Promise.all(
      rawClaims.map(async (claim) => {
        let policy = null
        let profile = null

        // Fetch policy if policy_id exists
        if (claim.policy_id) {
          const { data: policyData, error: policyError } = await supabase
            .from('policies')
            .select('id, name')
            .eq('id', claim.policy_id)
            .single()
          
          if (policyError) {
            console.warn(`⚠️ Could not fetch policy ${claim.policy_id}:`, policyError.message)
          }
          policy = policyData
        }

        // Fetch profile if user_id exists
        if (claim.user_id) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .eq('id', claim.user_id)
            .single()
          
          if (profileError) {
            console.warn(`⚠️ Could not fetch profile ${claim.user_id}:`, profileError.message)
          }
          profile = profileData
        }

        return {
          ...claim,
          policies: policy,
          profiles: profile
        }
      })
    )

    console.log(`✅ Enriched ${enrichedData.length} claims with profile data`)
    res.json(enrichedData)
  } catch (error) {
    console.error('❌ Controller Error:', error.message)
    res.status(500).json({ error: error.message })
  }
}

exports.updateClaimStatus = async (req, res) => {
  const { id } = req.params
  const { status, adminNotes } = req.body

  try {
    const { data, error } = await supabase
      .from('claims')
      .update({ status, admin_notes: adminNotes, updated_at: new Date() })
      .eq('id', id)
      .select()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
