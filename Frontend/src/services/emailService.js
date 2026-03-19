const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/email`

export const emailService = {
  /**
   * Send a receipt email after successful checkout via backend API (nodemailer)
   */
  async sendReceiptEmail({ to, customerName, policy, premium, frequency, coverage, idNumber, transactionDate }) {
    console.log('📧 Sending receipt email via backend API to:', to)

    try {
      const response = await fetch(`${API_URL}/receipt`, {
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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send receipt email')
      }

      console.log('✅ Receipt email sent successfully:', data.message)
      return data
    } catch (error) {
      console.error('❌ Receipt email failed:', error)
      throw error
    }
  }
}
