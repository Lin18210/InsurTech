import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { insuranceService } from '../services/insuranceService'
import { Shield, Check, ArrowRight, Star, Award } from 'lucide-react'

// Entry animation styles
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .animate-fade-in-scale {
    animation: fadeInScale 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .animation-delay-100 { animation-delay: 0.1s; }
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-300 { animation-delay: 0.3s; }
  .animation-delay-400 { animation-delay: 0.4s; }
  .animation-delay-500 { animation-delay: 0.5s; }
  .animation-delay-600 { animation-delay: 0.6s; }
  .animation-delay-700 { animation-delay: 0.7s; }
`

export default function Products() {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [frequency, setFrequency] = useState('yearly')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    loadPolicies()
  }, [])

  const loadPolicies = async () => {
    try {
      const data = await insuranceService.getPolicies()
      setPolicies(data)
    } catch (error) {
      console.error('Error loading policies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = (policy) => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate(`/checkout?policyId=${policy.id}&frequency=${frequency}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading plans...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Inject animation styles */}
      <style>{animationStyles}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            Trusted by 50,000+ customers
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Choose Your Coverage Plan
          </h1>
          <p className="text-lg text-slate-600">
            Transparent pricing with no hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Frequency Toggle */}
        <div className="flex flex-col items-center mb-12 animate-fade-in-up animation-delay-200">
          <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm inline-flex">
            {[
              { key: 'monthly', label: 'Monthly' },
              { key: 'quarterly', label: 'Quarterly' },
              { key: 'yearly', label: 'Yearly', badge: 'Save 20%' }
            ].map((freq) => (
              <button
                key={freq.key}
                onClick={() => setFrequency(freq.key)}
                className={`relative px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                  frequency === freq.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {freq.label}
                {freq.badge && frequency === freq.key && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                    {freq.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-500">
            {frequency === 'monthly' ? 'Pay monthly with 10% convenience fee' : 
             frequency === 'quarterly' ? 'Pay quarterly with 5% convenience fee' : 
             'Annual billing – best value'}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {policies.map((policy, index) => {
            const price = insuranceService.calculatePremium(policy.base_annual_premium, frequency)
            const isPopular = index === 1
            const animationDelay = `animation-delay-${(index + 3) * 100}`
            
            return (
              <div 
                key={policy.id} 
                className={`relative bg-white rounded-2xl border transition-all duration-300 hover-lift animate-fade-in-scale ${animationDelay} ${
                  isPopular ? 'border-blue-600 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-lg hover:border-blue-300'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{policy.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {policy.description || 'Comprehensive coverage for peace of mind'}
                      </p>
                    </div>
                    <Shield className={`w-10 h-10 ${isPopular ? 'text-blue-600' : 'text-slate-300'}`} />
                  </div>

                  {/* Price */}
                  <div className="py-6 border-y border-slate-100 my-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-slate-900">${price}</span>
                      <span className="text-slate-500 ml-2">
                        /{frequency === 'monthly' ? 'mo' : frequency === 'quarterly' ? 'qtr' : 'yr'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Coverage up to ${policy.coverage_amount?.toLocaleString()}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {[
                      'Comprehensive health coverage',
                      'Family member add-ons',
                      '24/7 customer support',
                      'Fast claims processing',
                      'No waiting period'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handleApply(policy)}
                    className={`w-full flex items-center justify-center py-4 px-6 rounded-xl font-semibold transition-all ${
                      isPopular
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {user ? 'Get Started' : 'Sign In to Apply'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center animate-fade-in-up animation-delay-700">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-slate-600">
            Rated <span className="font-semibold text-slate-900">4.9 out of 5</span> based on 2,000+ reviews
          </p>
          <p className="text-sm text-slate-500 mt-2">
            * Final premium calculated based on your health assessment
          </p>
        </div>
      </div>
    </div>
  )
}
