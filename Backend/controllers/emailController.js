const { sendReceiptEmail } = require('../utils/emailService')

exports.sendReceipt = async (req, res) => {
  const { to, customerName, policy, premium, frequency, coverage, idNumber, transactionDate } = req.body

  console.log('📧 [Email] Receipt request for:', to)

  if (!to || !customerName || !policy || !premium) {
    return res.status(400).json({ error: 'Missing required fields: to, customerName, policy, premium' })
  }

  try {
    await sendReceiptEmail({
      to,
      customerName,
      policy,
      premium,
      frequency: frequency || 'yearly',
      coverage,
      idNumber,
      transactionDate: transactionDate || new Date().toISOString()
    })

    console.log('✅ [Email] Receipt sent successfully to:', to)
    res.json({ success: true, message: `Receipt sent to ${to}` })
  } catch (error) {
    console.error('❌ [Email] Failed to send receipt:', error.message)
    res.status(500).json({ error: 'Failed to send receipt email', details: error.message })
  }
}
