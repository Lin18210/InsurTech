import { useState, useEffect } from 'react'
import { X, Calculator, AlertCircle, Check, DollarSign } from 'lucide-react'

// Premium calculation factors
const AGE_FACTORS = {
  '18-25': { factor: 0.85, label: 'Young Adult Discount (-15%)' },
  '26-35': { factor: 1.0, label: 'Standard Rate' },
  '36-45': { factor: 1.15, label: 'Middle Age (+15%)' },
  '46-55': { factor: 1.35, label: 'Senior (+35%)' },
  '56-65': { factor: 1.55, label: 'Pre-Retirement (+55%)' },
  '65+': { factor: 1.80, label: 'Retirement Age (+80%)' }
}

const HEALTH_FACTORS = {
  excellent: { factor: 0.90, label: 'Excellent Health (-10%)' },
  good: { factor: 1.0, label: 'Good Health (Standard)' },
  fair: { factor: 1.15, label: 'Fair Health (+15%)' },
  preexisting: { factor: 1.40, label: 'Pre-existing Conditions (+40%)' }
}

const SMOKING_FACTORS = {
  no: { factor: 1.0, label: 'Non-Smoker (Standard)' },
  yes: { factor: 1.50, label: 'Smoker (+50%)' }
}

const FREQUENCY_FACTORS = {
  monthly: { factor: 1.10, label: '+10% surcharge' },
  quarterly: { factor: 1.05, label: '+5% surcharge' },
  yearly: { factor: 1.0, label: 'Best Value' }
}

const INCOME_RANGES = [
  { value: 'below_1000', label: 'Below $1,000/month', amount: 1000 },
  { value: '1000_3000', label: '$1,000 - $3,000/month', amount: 2000 },
  { value: '3000_5000', label: '$3,000 - $5,000/month', amount: 4000 },
  { value: '5000_10000', label: '$5,000 - $10,000/month', amount: 7500 },
  { value: 'above_10000', label: 'Above $10,000/month', amount: 15000 }
]

export function calculateAge(dob) {
  const today = new Date()
  const birthDate = new Date(dob)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export function getAgeGroup(age) {
  if (age < 18) return null
  if (age <= 25) return '18-25'
  if (age <= 35) return '26-35'
  if (age <= 45) return '36-45'
  if (age <= 55) return '46-55'
  if (age <= 65) return '56-65'
  return '65+'
}

export function calculateDynamicPremium({ basePrice, age, healthStatus, isSmoker, frequency }) {
  const ageGroup = getAgeGroup(age)
  if (!ageGroup) return null // Age below 18

  const ageFactor = AGE_FACTORS[ageGroup].factor
  const healthFactor = HEALTH_FACTORS[healthStatus]?.factor || 1.0
  const smokingFactor = SMOKING_FACTORS[isSmoker ? 'yes' : 'no'].factor
  const frequencyFactor = FREQUENCY_FACTORS[frequency]?.factor || 1.0

  const basePremium = Number(basePrice)
  const annualPremium = basePremium * ageFactor * healthFactor * smokingFactor
  
  // Apply frequency calculation
  let periodPremium
  switch (frequency) {
    case 'monthly':
      periodPremium = (annualPremium / 12) * frequencyFactor
      break
    case 'quarterly':
      periodPremium = (annualPremium / 4) * frequencyFactor
      break
    default:
      periodPremium = annualPremium * frequencyFactor
  }

  return {
    finalPremium: periodPremium.toFixed(2),
    annualEquivalent: annualPremium.toFixed(2),
    breakdown: {
      basePremium: basePremium.toFixed(2),
      ageGroup,
      ageFactor: AGE_FACTORS[ageGroup],
      healthFactor: HEALTH_FACTORS[healthStatus],
      smokingFactor: SMOKING_FACTORS[isSmoker ? 'yes' : 'no'],
      frequencyFactor: FREQUENCY_FACTORS[frequency]
    }
  }
}

export default function PremiumCalculator({ isOpen, onClose, policy, initialFrequency, onContinue }) {
  const [dob, setDob] = useState('')
  const [healthStatus, setHealthStatus] = useState('good')
  const [isSmoker, setIsSmoker] = useState(false)
  const [income, setIncome] = useState('3000_5000')
  const [frequency, setFrequency] = useState(initialFrequency || 'yearly')
  const [calculation, setCalculation] = useState(null)
  const [error, setError] = useState('')
  const [affordabilityWarning, setAffordabilityWarning] = useState('')

  useEffect(() => {
    if (policy && dob) {
      const age = calculateAge(dob)
      
      if (age < 18) {
        setError('You must be at least 18 years old to purchase insurance.')
        setCalculation(null)
        return
      }
      
      setError('')
      const result = calculateDynamicPremium({
        basePrice: policy.base_annual_premium,
        age,
        healthStatus,
        isSmoker,
        frequency
      })
      setCalculation(result)

      // Check affordability
      const incomeData = INCOME_RANGES.find(i => i.value === income)
      if (incomeData && result) {
        const monthlyPremium = frequency === 'monthly' 
          ? parseFloat(result.finalPremium)
          : parseFloat(result.annualEquivalent) / 12
        
        if (monthlyPremium > incomeData.amount * 0.10) {
          setAffordabilityWarning('This premium may exceed 10% of your monthly income. Please consider a lower coverage plan.')
        } else {
          setAffordabilityWarning('')
        }
      }
    }
  }, [dob, healthStatus, isSmoker, frequency, income, policy])

  const handleContinue = () => {
    if (!calculation) return
    
    const age = calculateAge(dob)
    onContinue({
      dob,
      age,
      healthStatus,
      isSmoker,
      income,
      frequency,
      calculatedPremium: calculation.finalPremium,
      breakdown: calculation.breakdown
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calculator className="w-8 h-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Premium Calculator</h2>
                <p className="text-blue-100 text-sm">Get your personalized quote for {policy?.name}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-blue-200 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {dob && (
                <p className="text-sm text-gray-500 mt-1">Age: {calculateAge(dob)} years</p>
              )}
            </div>

            {/* Income Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income Range</label>
              <select
                value={income}
                onChange={(e) => setIncome(e.target.value)}
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
                value={healthStatus}
                onChange={(e) => setHealthStatus(e.target.value)}
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
              <div className="flex gap-4 mt-2">
                <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${!isSmoker ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="smoking"
                    checked={!isSmoker}
                    onChange={() => setIsSmoker(false)}
                    className="sr-only"
                  />
                  <Check className={`w-5 h-5 mr-2 ${!isSmoker ? 'text-green-600' : 'text-gray-400'}`} />
                  Non-Smoker
                </label>
                <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${isSmoker ? 'bg-orange-50 border-orange-500 text-orange-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="smoking"
                    checked={isSmoker}
                    onChange={() => setIsSmoker(true)}
                    className="sr-only"
                  />
                  Smoker
                </label>
              </div>
            </div>

            {/* Payment Frequency */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
              <div className="flex gap-4">
                {['monthly', 'quarterly', 'yearly'].map((freq) => (
                  <label
                    key={freq}
                    className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-colors ${
                      frequency === freq 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={freq}
                      checked={frequency === freq}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="sr-only"
                    />
                    <div className="font-medium capitalize">{freq}</div>
                    <div className="text-xs text-gray-500">{FREQUENCY_FACTORS[freq].label}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Affordability Warning */}
          {affordabilityWarning && !error && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
              <p className="text-yellow-700">{affordabilityWarning}</p>
            </div>
          )}

          {/* Premium Breakdown */}
          {calculation && !error && (
            <div className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                Your Premium Quote
              </h3>
              
              {/* Final Premium */}
              <div className="text-center mb-6 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Your {frequency} premium</p>
                <p className="text-4xl font-bold text-blue-600">${calculation.finalPremium}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Annual equivalent: ${calculation.annualEquivalent}/year
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Base Premium</span>
                  <span className="font-medium">${calculation.breakdown.basePremium}/year</span>
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
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              disabled={!calculation || error}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium"
            >
              Continue to Checkout
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
