const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/finance`

export const financeService = {
  // Get transactions for a user
  async getUserTransactions(userId) {
    console.log(`📋 Fetching transactions for user: ${userId}`)
    const res = await fetch(`${API_URL}/transactions/${userId}`)
    const data = await res.json()
    if (!res.ok) {
      console.error('❌ Error fetching user transactions:', data)
      throw new Error(data.error || 'Failed to fetch transactions')
    }
    console.log(`✅ Loaded ${data?.length || 0} user transactions`)
    return data || []
  },

  // Get ALL transactions (Admin)
  async getAllTransactions() {
    console.log('📋 [Admin] Fetching all transactions...')
    const res = await fetch(`${API_URL}/all`)
    const data = await res.json()
    if (!res.ok) {
      console.error('❌ Error fetching all transactions:', data)
      throw new Error(data.error || 'Failed to fetch transactions')
    }
    console.log(`✅ [Admin] Loaded ${data?.length || 0} total transactions`)
    return data
  },
  
  // Get financial stats
  async getFinancialStats() {
    console.log('📊 Fetching financial stats...')
    const res = await fetch(`${API_URL}/stats`)
    const data = await res.json()
    if (!res.ok) {
      console.error('❌ Error fetching financial stats:', data)
      throw new Error(data.error || 'Failed to fetch financial stats')
    }
    console.log(`✅ Loaded financial stats - Total revenue: $${data?.totalRevenue || 0}`)
    return data
  }
}
