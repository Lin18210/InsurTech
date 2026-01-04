const supabase = require('../config/supabase')

exports.getUserTransactions = async (req, res) => {
  const { userId } = req.params
  try {
    console.log(`📋 Fetching transactions for user: ${userId}`)
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('transaction_date', { ascending: false })

    if (error) {
      console.error('❌ Error fetching user transactions:', error)
      throw error
    }
    console.log(`✅ Loaded ${data?.length || 0} transactions for user ${userId}`)
    res.json(data || [])
  } catch (error) {
    console.error('❌ Controller Error:', error.message)
    res.status(500).json({ error: error.message })
  }
}

exports.getAllTransactions = async (req, res) => {
  try {
    console.log('📋 [Admin] Fetching all transactions...')
    const { data, error } = await supabase
      .from('transactions')
      .select('*, profiles(full_name, email)')
      .order('transaction_date', { ascending: false })

    if (error) {
      console.error('❌ Error fetching transactions:', error)
      throw error
    }
    console.log(`✅ Loaded ${data?.length || 0} total transactions`)
    res.json(data || [])
  } catch (error) {
    console.error('❌ Controller Error:', error.message)
    res.status(500).json({ error: error.message })
  }
}

exports.getFinancialStats = async (req, res) => {
  try {
    console.log('📊 [Finance] Fetching financial stats...')
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('id, amount, transaction_date, type, status, user_id')
      .eq('type', 'payment')
      .eq('status', 'completed')
      .order('transaction_date', { ascending: false })

    if (error) {
      console.error('❌ Error fetching financial stats:', error)
      throw error
    }

    console.log(`✅ Loaded ${transactions?.length || 0} completed payment transactions`)
    
    const totalRevenue = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0)
    const transactionCount = transactions.length
    
    console.log(`💰 Total revenue: $${totalRevenue}`)
    
    res.json({
      totalRevenue,
      transactionCount,
      transactions
    })
  } catch (error) {
    console.error('❌ Controller Error:', error.message)
    console.error('Error details:', error)
    res.status(500).json({ error: error.message })
  }
}
