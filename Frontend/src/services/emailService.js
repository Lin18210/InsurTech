import emailjs from '@emailjs/browser'

export const emailService = {
  /**
   * Send a receipt email after successful checkout using EmailJS
   */
  async sendReceiptEmail({ to, customerName, policy, premium, frequency, coverage, idNumber, transactionDate }) {
    console.log('📧 Sending receipt email via EmailJS to:', to)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    console.log('📧 EmailJS Config:', { serviceId, templateId, publicKey: publicKey ? '✅ Set' : '❌ Missing' })

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS configuration is missing. Check your .env file.')
    }

    const formattedDate = new Date(transactionDate).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })

    const formattedPremium = Number(premium).toLocaleString()
    const formattedCoverage = coverage ? Number(coverage).toLocaleString() : 'N/A'

    const frequencyLabel = {
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly'
    }[frequency] || frequency

    const templateParams = {
      to_email: to,
      customer_name: customerName,
      policy_name: policy,
      premium_amount: `${formattedPremium} MMK`,
      frequency: frequencyLabel,
      coverage_amount: `${formattedCoverage} MMK`,
      id_number: idNumber || 'N/A',
      transaction_date: formattedDate
    }

    console.log('📧 Template params:', templateParams)

    try {
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('✅ Receipt email sent successfully:', result.status, result.text)
      return result
    } catch (error) {
      console.error('❌ EmailJS send failed:', error?.status, error?.text || error)
      throw error
    }
  }
}

