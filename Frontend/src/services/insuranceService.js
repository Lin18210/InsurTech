const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/insurance`

export const insuranceService = {
  // Fetch all available policies
  async getPolicies() {
    console.log('📋 Fetching available policies...')
    const res = await fetch(`${API_URL}/policies`)
    const data = await res.json()
    if (!res.ok) {
      console.error('❌ Error fetching policies:', data)
      throw new Error(data.error)
    }
    console.log(`✅ Loaded ${data?.length || 0} policies`)
    return data
  },

  // Fetch subscriptions for a specific user
  async getUserSubscriptions(userId) {
    console.log(`📋 Fetching subscriptions for user: ${userId}`)
    const res = await fetch(`${API_URL}/subscriptions/${userId}`)
    const data = await res.json()
    console.log(`✅ Loaded ${data?.length || 0} user subscriptions`)
    return data || []
  },

  // Create a new subscription with health assessment data
  async createSubscription({ userId, policyId, frequency, amount, healthData }) {
    console.log('🔄 Creating subscription:', { userId, policyId, frequency, amount, healthData })
    const res = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          policyId, 
          frequency, 
          amount,
          // Health assessment data
          dob: healthData?.dob,
          healthStatus: healthData?.healthStatus,
          isSmoker: healthData?.isSmoker,
          medicalDocumentUrl: healthData?.medicalDocumentUrl
        })
    })
    const data = await res.json()
    if (!res.ok) {
      console.error('❌ Subscription creation failed:', data)
      throw new Error(data.error || 'Failed to create subscription')
    }
    console.log('✅ Subscription created:', data.id)
    return data
  },

  // Get ALL subscriptions (Admin)
  async getAllSubscriptions() {
    console.log('📋 [Admin] Fetching all subscriptions...')
    const res = await fetch(`${API_URL}/subscriptions-all`)
    const data = await res.json()
    if (!res.ok) {
      console.error('❌ Error fetching all subscriptions:', data)
      throw new Error(data.error || 'Failed to fetch subscriptions')
    }
    console.log(`✅ [Admin] Loaded ${data?.length || 0} total subscriptions`)
    return data
  },

  // Helpers (Logic moved to backend, but we keep these for Frontend UI estimations if needed)
  calculatePremium(basePrice, frequency) {
    const base = parseFloat(basePrice)
    if (!base) return 0
    switch (frequency) {
      case 'monthly': return ((base / 12) * 1.10).toFixed(2)
      case 'quarterly': return ((base / 4) * 1.05).toFixed(2)
      case 'yearly': return base.toFixed(2)
      default: return base.toFixed(2)
    }
  }
}

// Re-export dynamic premium calculation from PremiumCalculator
export { calculateDynamicPremium, calculateAge, getAgeGroup } from '../components/PremiumCalculator'
