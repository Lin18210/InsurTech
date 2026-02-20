const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/email`

export const emailService = {
  /**
   * Send a receipt email after successful checkout
   */
  async sendReceiptEmail({ to, customerName, policy, premium, frequency, coverage, idNumber, transactionDate }) {
    console.log('📧 Sending receipt email to:', to)
    
    const res = await fetch(`${API_URL}/receipt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        customerName,
        policy,
        premium,
        frequency,
        coverage,
        idNumber,
        transactionDate
      })
    })

    const data = await res.json()
    
    if (!res.ok) {
      console.error('❌ Failed to send receipt email:', data)
      throw new Error(data.error || 'Failed to send receipt email')
    }

    console.log('✅ Receipt email sent successfully')
    return data
  }
}
