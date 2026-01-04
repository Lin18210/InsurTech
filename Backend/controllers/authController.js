const supabase = require('../config/supabase')

exports.register = async (req, res) => {
  const { email, password, fullName } = req.body
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getProfile = async (req, res) => {
  const { id } = req.params
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(404).json({ error: 'Profile not found' })
  }
}

// Set user role (for admin management)
exports.setUserRole = async (req, res) => {
  const { userId, role } = req.body
  
  if (!userId || !role) {
    return res.status(400).json({ error: 'Missing userId or role' })
  }

  try {
    console.log(`🔐 Setting role "${role}" for user ${userId}`)
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    console.log(`✅ Role updated successfully:`, data)
    res.json(data)
  } catch (error) {
    console.error('❌ Error setting role:', error.message)
    res.status(500).json({ error: error.message })
  }
}