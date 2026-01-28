import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { insuranceService } from '../../services/insuranceService'
import { useAuth } from '../../context/AuthContext'
import { generatePolicyPDF } from '../../utils/pdfGenerator'
import { supabase } from '../../lib/supabase'
import { CheckCircle, CreditCard, Download, Shield, Heart, User, Calendar, Calculator, AlertCircle, Check, DollarSign, Upload, FileText, X } from 'lucide-react'
import { calculateAge, getAgeGroup, calculateDynamicPremium } from '../../components/PremiumCalculator'

// Constants for premium calculation display
const FREQUENCY_LABELS = {
  monthly: { label: '+10% surcharge', period: '/mo' },
  quarterly: { label: '+5% surcharge', period: '/qtr' },
  yearly: { label: 'Best Value', period: '/yr' }
}

const INCOME_RANGES = [
  { value: 'below_1000', label: 'Below $1,000/month', amount: 1000 },
  { value: '1000_3000', label: '$1,000 - $3,000/month', amount: 2000 },
  { value: '3000_5000', label: '$3,000 - $5,000/month', amount: 4000 },
  { value: '5000_10000', label: '$5,000 - $10,000/month', amount: 7500 },
  { value: 'above_10000', label: 'Above $10,000/month', amount: 15000 }
]

export default function CheckoutFlow() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const policyId = searchParams.get('policyId')
  const initialFrequency = searchParams.get('frequency') || 'yearly'

  const [step, setStep] = useState(1)
  const [policy, setPolicy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [premium, setPremium] = useState(0)
  const [calculation, setCalculation] = useState(null)
  const [ageError, setAgeError] = useState('')
  const [affordabilityWarning, setAffordabilityWarning] = useState('')

  // Premium Calculator Data (Step 1)
  const [calcData, setCalcData] = useState({
    dob: '',
    healthStatus: 'good',
    isSmoker: false,
    income: '3000_5000',
    frequency: initialFrequency,
    medicalDocument: null
  })

  // Form Data (Step 2)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    address: ''
  })

  useEffect(() => {
    if (!policyId) {
      navigate('/products')
      return
    }
    loadPolicy()
  }, [policyId])

  // Pre-fill email if logged in
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email }))
    }
  }, [user])

  // Calculate premium when calculator data changes
  useEffect(() => {
    if (policy && calcData.dob) {
      const age = calculateAge(calcData.dob)
      
      if (age < 18) {
        setAgeError('You must be at least 18 years old to purchase insurance.')
        setCalculation(null)
        return
      }
      
      setAgeError('')
      const result = calculateDynamicPremium({
        basePrice: policy.base_annual_premium,
        age,
        healthStatus: calcData.healthStatus,
        isSmoker: calcData.isSmoker,
        frequency: calcData.frequency
      })
      setCalculation(result)
      setPremium(result.finalPremium)

      // Check affordability
      const incomeData = INCOME_RANGES.find(i => i.value === calcData.income)
      if (incomeData && result) {
        const monthlyPremium = calcData.frequency === 'monthly' 
          ? parseFloat(result.finalPremium)
          : parseFloat(result.annualEquivalent) / 12
        
        if (monthlyPremium > incomeData.amount * 0.10) {
          setAffordabilityWarning('This premium may exceed 10% of your monthly income. Please consider a lower coverage plan.')
        } else {
          setAffordabilityWarning('')
        }
      }
    }
  }, [policy, calcData])

  const loadPolicy = async () => {
    try {
      const policies = await insuranceService.getPolicies()
      const found = policies.find(p => p.id === policyId)
      if (found) {
        setPolicy(found)
        // Set initial basic premium (will be recalculated in Step 1)
        setPremium(insuranceService.calculatePremium(found.base_annual_premium, initialFrequency))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCalcChange = (field, value) => {
    setCalcData(prev => ({ ...prev, [field]: value }))
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      let medicalDocumentUrl = null
      
      // Upload medical document if provided
      if (calcData.medicalDocument && user) {
        const file = calcData.medicalDocument
        const fileExt = file.name.split('.').pop()
        const fileName = `${user.id}_${Date.now()}.${fileExt}`
        const filePath = `medical-documents/${fileName}`
        
        console.log('📤 Uploading medical document...')
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file)
        
        if (uploadError) {
          console.error('⚠️ Medical document upload failed:', uploadError)
          // Continue without document - it's optional
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(filePath)
          medicalDocumentUrl = publicUrl
          console.log('✅ Medical document uploaded:', publicUrl)
        }
      }
      
      // Create subscription with health data
      if (user) {
        await insuranceService.createSubscription({
          userId: user.id,
          policyId: policy.id,
          frequency: calcData.frequency,
          amount: premium,
          healthData: {
            dob: calcData.dob,
            healthStatus: calcData.healthStatus,
            isSmoker: calcData.isSmoker,
            medicalDocumentUrl
          }
        })
      }
      setStep(5) // Go to success step
    } catch (error) {
      alert('Payment processing failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const generatePDF = () => {
    generatePolicyPDF({
      userName: formData.fullName,
      userEmail: formData.email,
      policy: policy,
      subscription: {
        frequency: calcData.frequency,
        amount: premium,
        created_at: new Date().toISOString(),
        id: 'NEW-POLICY'
      }
    })
  }

  if (loading && !policy) return <div className="p-8 text-center text-gray-500">Loading checkout...</div>

  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">
      {/* Progress Bar - 5 Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-500">
          <span className={step >= 1 ? 'text-blue-600' : ''}>1. Quote</span>
          <span className={step >= 2 ? 'text-blue-600' : ''}>2. Details</span>
          <span className={step >= 3 ? 'text-blue-600' : ''}>3. Review</span>
          <span className={step >= 4 ? 'text-blue-600' : ''}>4. Payment</span>
          <span className={step >= 5 ? 'text-blue-600' : ''}>5. Done</span>
        </div>
        <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100">
        
        {/* STEP 1: Premium Calculator / Health Assessment */}
        {step === 1 && (
          <div>
            <div className="flex items-center mb-6">
              <Calculator className="w-8 h-8 mr-3 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold">Premium Calculator</h2>
                <p className="text-gray-500 text-sm">Get your personalized quote for {policy?.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={calcData.dob}
                  onChange={(e) => handleCalcChange('dob', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {calcData.dob && !ageError && (
                  <p className="text-sm text-gray-500 mt-1">Age: {calculateAge(calcData.dob)} years</p>
                )}
              </div>

              {/* Income Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income Range</label>
                <select
                  value={calcData.income}
                  onChange={(e) => handleCalcChange('income', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {INCOME_RANGES.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Health Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Health Status</label>
                <select
                  value={calcData.healthStatus}
                  onChange={(e) => handleCalcChange('healthStatus', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="excellent">Excellent - No health issues</option>
                  <option value="good">Good - Minor issues only</option>
                  <option value="fair">Fair - Some health concerns</option>
                  <option value="preexisting">Pre-existing conditions</option>
                </select>
              </div>

              {/* Smoking Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Status</label>
                <div className="flex gap-4 mt-1">
                  <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${!calcData.isSmoker ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="smoking"
                      checked={!calcData.isSmoker}
                      onChange={() => handleCalcChange('isSmoker', false)}
                      className="sr-only"
                    />
                    <Check className={`w-5 h-5 mr-2 ${!calcData.isSmoker ? 'text-green-600' : 'text-gray-400'}`} />
                    Non-Smoker
                  </label>
                  <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${calcData.isSmoker ? 'bg-orange-50 border-orange-500 text-orange-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="smoking"
                      checked={calcData.isSmoker}
                      onChange={() => handleCalcChange('isSmoker', true)}
                      className="sr-only"
                    />
                    Smoker
                  </label>
                </div>
              </div>

              {/* Medical Document Upload (Optional) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Document <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Upload any relevant medical documents to support your health declaration (e.g., recent medical checkup, lab results)
                </p>
                
                {!calcData.medicalDocument ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PDF, JPG or PNG (max. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            alert('File size must be less than 10MB')
                            return
                          }
                          handleCalcChange('medicalDocument', file)
                        }
                      }}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-8 h-8 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-green-800">{calcData.medicalDocument.name}</p>
                        <p className="text-xs text-green-600">
                          {(calcData.medicalDocument.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCalcChange('medicalDocument', null)}
                      className="p-1 text-green-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Frequency */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
                <div className="flex gap-4">
                  {['monthly', 'quarterly', 'yearly'].map((freq) => (
                    <label
                      key={freq}
                      className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-colors ${
                        calcData.frequency === freq 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="frequency"
                        value={freq}
                        checked={calcData.frequency === freq}
                        onChange={(e) => handleCalcChange('frequency', e.target.value)}
                        className="sr-only"
                      />
                      <div className="font-medium capitalize">{freq}</div>
                      <div className="text-xs text-gray-500">{FREQUENCY_LABELS[freq].label}</div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {ageError && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                <p className="text-red-700">{ageError}</p>
              </div>
            )}

            {/* Affordability Warning */}
            {affordabilityWarning && !ageError && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
                <p className="text-yellow-700">{affordabilityWarning}</p>
              </div>
            )}

            {/* Premium Breakdown */}
            {calculation && !ageError && (
              <div className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Your Premium Quote
                </h3>
                
                {/* Final Premium */}
                <div className="text-center mb-6 p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Your {calcData.frequency} premium</p>
                  <p className="text-4xl font-bold text-blue-600">{calculation.finalPremium} MMK</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Annual equivalent: {calculation.annualEquivalent} MMK/year
                  </p>
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Base Premium</span>
                    <span className="font-medium">{calculation.breakdown.basePremium} MMK/year</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Age Factor ({calculation.breakdown.ageGroup})</span>
                    <span className={`font-medium ${calculation.breakdown.ageFactor.factor < 1 ? 'text-green-600' : calculation.breakdown.ageFactor.factor > 1 ? 'text-orange-600' : ''}`}>
                      {calculation.breakdown.ageFactor.label}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Health Factor</span>
                    <span className={`font-medium ${calculation.breakdown.healthFactor.factor < 1 ? 'text-green-600' : calculation.breakdown.healthFactor.factor > 1 ? 'text-orange-600' : ''}`}>
                      {calculation.breakdown.healthFactor.label}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Smoking Status</span>
                    <span className={`font-medium ${calculation.breakdown.smokingFactor.factor > 1 ? 'text-orange-600' : 'text-green-600'}`}>
                      {calculation.breakdown.smokingFactor.label}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Payment Frequency</span>
                    <span className={`font-medium ${calculation.breakdown.frequencyFactor.factor > 1 ? 'text-orange-600' : 'text-green-600'}`}>
                      {calculation.breakdown.frequencyFactor.label}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => navigate('/products')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Back to Products
              </button>
              <button
                onClick={handleNext}
                disabled={!calculation || ageError}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium"
              >
                Continue to Details
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: User Details */}
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input type="date" value={calcData.dob} disabled className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2 border text-gray-600" />
                <p className="text-xs text-gray-500 mt-1">Set in previous step</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Card / Passport No.</label>
                <input required type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea required name="address" rows={3} value={formData.address} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border" />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" onClick={handleBack} className="text-gray-600 hover:text-gray-900 font-medium">Back</button>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Continue</button>
            </div>
          </form>
        )}

        {/* STEP 3: Review */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Review Application</h2>
            
            <div className="bg-gray-50 p-6 rounded-md mb-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 flex items-center"><Shield className="w-5 h-5 mr-2 text-blue-500"/>Plan Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Policy:</span> <span className="font-medium">{policy.name}</span></div>
                <div><span className="text-gray-500">Frequency:</span> <span className="font-medium capitalize">{calcData.frequency}</span></div>
                <div><span className="text-gray-500">Coverage:</span> <span className="font-medium">{policy.coverage_amount?.toLocaleString()} MMK</span></div>
                <div><span className="text-gray-500">Premium:</span> <span className="font-bold text-blue-600">{premium} MMK</span></div>
              </div>
            </div>

            {/* Health Assessment Summary */}
            <div className="bg-blue-50 p-6 rounded-md mb-6 border border-blue-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 flex items-center"><Heart className="w-5 h-5 mr-2 text-red-500"/>Health Assessment</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-500">Date of Birth:</span>
                  <span className="ml-2 font-medium">{calcData.dob}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-500">Health Status:</span>
                  <span className="ml-2 font-medium capitalize">{calcData.healthStatus}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-500">Smoking Status:</span>
                  <span className={`ml-2 font-medium ${calcData.isSmoker ? 'text-orange-600' : 'text-green-600'}`}>
                    {calcData.isSmoker ? 'Smoker' : 'Non-Smoker'}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-blue-600">* Premium has been calculated based on your health assessment</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Your Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Name:</span> {formData.fullName}</div>
                <div><span className="text-gray-500">Email:</span> {formData.email}</div>
                <div><span className="text-gray-500">Phone:</span> {formData.phone}</div>
                <div><span className="text-gray-500">ID:</span> {formData.idNumber}</div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={handleBack} className="text-gray-600 hover:text-gray-900 font-medium">Back</button>
              <button onClick={handleNext} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Confirm & Proceed</button>
            </div>
          </div>
        )}

        {/* STEP 4: Payment */}
        {step === 4 && (
          <form onSubmit={handlePayment}>
            <h2 className="text-2xl font-bold mb-6">Secure Payment</h2>
            
            <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100 flex justify-between items-center">
              <span className="text-blue-900 font-medium">Total to pay today</span>
              <span className="text-2xl font-bold text-blue-700">{premium} MMK</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" placeholder="0000 0000 0000 0000" className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVC</label>
                  <input type="text" placeholder="123" className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button type="button" onClick={handleBack} className="text-gray-600 hover:text-gray-900 font-medium">Back</button>
              <button 
                type="submit" 
                disabled={loading}
                className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 flex items-center disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay ${premium} MMK`}
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: Success */}
        {step === 5 && (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-8">
              Thank you, {formData.fullName}. Your policy is now active.
            </p>
            
            <div className="flex justify-center space-x-4">
              <button onClick={generatePDF} className="flex items-center bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800">
                <Download className="w-5 h-5 mr-2" />
                Download Policy
              </button>
              <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:text-blue-800 font-medium px-4 py-3">
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
