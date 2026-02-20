const nodemailer = require('nodemailer')

// Create Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

/**
 * Send a receipt email after successful checkout
 */
async function sendReceiptEmail({ to, customerName, policy, premium, frequency, coverage, idNumber, transactionDate }) {
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

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:0;background-color:#f4f7fa;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7fa;padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:32px 40px;text-align:center;">
                <h1 style="color:#ffffff;margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;">🛡️ InsurTech</h1>
                <p style="color:#bfdbfe;margin:8px 0 0;font-size:14px;">Your Trusted Insurance Partner</p>
              </td>
            </tr>

            <!-- Success Badge -->
            <tr>
              <td style="padding:32px 40px 0;text-align:center;">
                <div style="display:inline-block;background-color:#ecfdf5;border:2px solid #10b981;border-radius:50px;padding:12px 28px;">
                  <span style="color:#059669;font-size:16px;font-weight:600;">✅ Payment Successful</span>
                </div>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:24px 40px 0;">
                <p style="color:#1e293b;font-size:16px;margin:0;">Dear <strong>${customerName}</strong>,</p>
                <p style="color:#64748b;font-size:14px;margin:8px 0 0;line-height:1.6;">
                  Thank you for choosing InsurTech! Your insurance policy has been successfully activated. Below are the details of your purchase.
                </p>
              </td>
            </tr>

            <!-- Policy Details Card -->
            <tr>
              <td style="padding:24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                  <tr>
                    <td style="background-color:#1e40af;padding:14px 20px;">
                      <h3 style="color:#ffffff;margin:0;font-size:15px;font-weight:600;">📋 Policy Details</h3>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:20px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:8px 0;color:#64748b;font-size:13px;width:40%;">Policy Name</td>
                          <td style="padding:8px 0;color:#1e293b;font-size:13px;font-weight:600;">${policy}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#64748b;font-size:13px;border-top:1px solid #e2e8f0;">Coverage Amount</td>
                          <td style="padding:8px 0;color:#1e293b;font-size:13px;font-weight:600;border-top:1px solid #e2e8f0;">${formattedCoverage} MMK</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#64748b;font-size:13px;border-top:1px solid #e2e8f0;">Payment Frequency</td>
                          <td style="padding:8px 0;color:#1e293b;font-size:13px;font-weight:600;border-top:1px solid #e2e8f0;">${frequencyLabel}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#64748b;font-size:13px;border-top:1px solid #e2e8f0;">ID Number</td>
                          <td style="padding:8px 0;color:#1e293b;font-size:13px;font-weight:600;border-top:1px solid #e2e8f0;">${idNumber || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#64748b;font-size:13px;border-top:1px solid #e2e8f0;">Transaction Date</td>
                          <td style="padding:8px 0;color:#1e293b;font-size:13px;font-weight:600;border-top:1px solid #e2e8f0;">${formattedDate}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Amount Paid -->
            <tr>
              <td style="padding:0 40px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#059669,#10b981);border-radius:10px;overflow:hidden;">
                  <tr>
                    <td style="padding:20px;text-align:center;">
                      <p style="color:#d1fae5;font-size:13px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">Amount Paid</p>
                      <p style="color:#ffffff;font-size:32px;font-weight:700;margin:0;">${formattedPremium} MMK</p>
                      <p style="color:#a7f3d0;font-size:12px;margin:4px 0 0;">${frequencyLabel} Payment</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;">
                <p style="color:#94a3b8;font-size:12px;margin:0;text-align:center;line-height:1.6;">
                  This is an automated receipt from InsurTech. Please keep this email for your records.<br>
                  If you have any questions, please contact us at our support page.
                </p>
                <p style="color:#cbd5e1;font-size:11px;margin:12px 0 0;text-align:center;">
                  © ${new Date().getFullYear()} InsurTech. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `

  const mailOptions = {
    from: `"InsurTech" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ InsurTech - Payment Receipt for ${policy}`,
    html: htmlContent
  }

  console.log(`📧 Sending receipt email to ${to}...`)
  const info = await transporter.sendMail(mailOptions)
  console.log(`✅ Receipt email sent: ${info.messageId}`)
  return info
}

module.exports = { sendReceiptEmail }
