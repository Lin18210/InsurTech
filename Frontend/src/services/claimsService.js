const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/claims`

export const claimsService = {
  // Submit a new claim
  async submitClaim({ userId, policyId, amount, reason, description, documentUrl }) {
    const res = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, policyId, amount, reason, description, documentUrl })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data
  },

  // Get claims for specific user
  async getUserClaims(userId) {
    const res = await fetch(`${API_URL}/user/${userId}`)
    const data = await res.json()
    // if (!res.ok) throw new Error(data.error) // backend returns [] on error/empty
    return data || []
  },

  // Get ALL claims (Admin)
  async getAllClaims() {
    const res = await fetch(`${API_URL}/all`)
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data
  },

  // Update claim status (Admin)
  async updateClaimStatus(claimId, status, adminNotes = '') {
    const res = await fetch(`${API_URL}/${claimId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data
  }
}
