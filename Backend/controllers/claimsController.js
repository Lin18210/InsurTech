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
    const { data, error } = await supabase
      .from('claims')
      .select('*, profiles(full_name, email), policies(name)')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
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
