import jsPDF from 'jspdf'

export const generatePolicyPDF = ({ userName, userEmail, policy, subscription }) => {
  const doc = new jsPDF()
  const frequency = subscription?.frequency || 'yearly'
  const premium = subscription?.amount || policy?.base_annual_premium
  const startDate = subscription?.created_at ? new Date(subscription.created_at).toLocaleDateString() : new Date().toLocaleDateString()
  const subId = subscription?.id || 'PENDING'

  doc.setFontSize(22)
  doc.text("Insurance Policy Certificate", 20, 20)
  
  doc.setFontSize(12)
  doc.text(`Policy No: ${subId.slice(0, 8).toUpperCase()}`, 20, 40)
  doc.text(`Date Issued: ${startDate}`, 20, 50)
  
  doc.setLineWidth(0.5)
  doc.line(20, 55, 190, 55)

  doc.setFontSize(14)
  doc.text("Policyholder Details", 20, 65)
  doc.setFontSize(10)
  doc.text(`Name: ${userName || 'Valued Customer'}`, 20, 75)
  doc.text(`Email: ${userEmail || 'N/A'}`, 20, 80)
  // Note: Address/Phone not stored in DB schema yet, so omitted in re-download.

  doc.setFontSize(14)
  doc.text("Coverage Details", 20, 100)
  doc.setFontSize(10)
  doc.text(`Plan: ${policy?.name || 'Insurance Plan'}`, 20, 110)
  doc.text(`Type: ${policy?.type || 'General'}`, 20, 115)
  doc.text(`Coverage Amount: $${policy?.coverage_amount?.toLocaleString() || 'N/A'}`, 20, 120)
  doc.text(`Premium: $${premium} (${frequency})`, 20, 125)
  doc.text(`Status: ${subscription?.status?.toUpperCase() || 'ACTIVE'}`, 20, 130)

  doc.setFontSize(10)
  doc.text("This document certifies that the above policyholder is covered", 20, 150)
  doc.text("under the terms and conditions of the InsurTech Master Policy.", 20, 155)
  
  doc.save(`Policy_${policy?.name?.replace(/\s+/g, '_')}.pdf`)
}
