import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { insuranceService } from '../services/insuranceService'
import { 
  Shield, Check, ArrowRight, Star, Award, X, ChevronRight,
  Heart, Car, Home, Briefcase, Umbrella, Users, 
  Activity, Building2, Sparkles, LayoutGrid, Plane, ShieldCheck
} from 'lucide-react'

// Category definitions with icons
const categories = [
  { key: 'all', label: 'All Plans', icon: LayoutGrid },
  { key: 'life', label: 'Life', icon: Users },
  { key: 'health', label: 'Health', icon: Heart },
  { key: 'auto', label: 'Auto', icon: Car },
  { key: 'property', label: 'Property', icon: Home },
  { key: 'general', label: 'General', icon: Briefcase },
]

// Curated list of 3 important plans per category with detailed info
const policyDetailsData = {
  // Life Insurance - 3 plans
  'Term Life Insurance': {
    category: 'life',
    tagline: 'Affordable protection for your family',
    description: 'Term Life Insurance provides financial protection for your loved ones during a specified period. If something happens to you during the term, your beneficiaries receive a death benefit to help cover expenses.',
    coverage: [
      'Death benefit payout to beneficiaries',
      'Coverage for 10, 20, or 30-year terms',
      'Accidental death benefit',
      'Terminal illness benefit',
      'Conversion option to permanent life insurance'
    ],
    benefits: [
      'Most affordable life insurance option',
      'Fixed premiums throughout the term',
      'Simple and straightforward coverage',
      'No medical exam options available',
      'Tax-free death benefit for beneficiaries'
    ],
    icon: Users
  },
  'Whole Life Insurance': {
    category: 'life',
    tagline: 'Lifetime coverage with cash value growth',
    description: 'Whole Life Insurance provides permanent coverage that lasts your entire lifetime. It includes a cash value component that grows over time, which you can borrow against or withdraw.',
    coverage: [
      'Guaranteed death benefit for life',
      'Cash value accumulation',
      'Dividend payments (participating policies)',
      'Loan options against cash value',
      'Accelerated death benefit for terminal illness'
    ],
    benefits: [
      'Coverage never expires',
      'Level premiums that never increase',
      'Builds cash value over time',
      'Can be used for estate planning',
      'Provides financial flexibility'
    ],
    icon: Users
  },
  'Universal Life Insurance': {
    category: 'life',
    tagline: 'Flexible premiums with investment growth',
    description: 'Universal Life Insurance offers flexible premiums and adjustable death benefits. The cash value earns interest based on market conditions or a minimum guaranteed rate.',
    coverage: [
      'Adjustable death benefit',
      'Flexible premium payments',
      'Cash value with interest accumulation',
      'Policy loans and withdrawals',
      'Living benefits for chronic illness'
    ],
    benefits: [
      'Premium flexibility based on your budget',
      'Potential for higher cash value growth',
      'Adjustable coverage as needs change',
      'Tax-deferred cash value growth',
      'Can skip premiums if cash value is sufficient'
    ],
    icon: Users
  },

  // Health Insurance - 3 plans
  'Health Insurance': {
    category: 'health',
    tagline: 'Comprehensive medical coverage',
    description: 'Health Insurance covers medical expenses including doctor visits, hospital stays, surgeries, and prescription medications. Protect yourself and your family from unexpected healthcare costs.',
    coverage: [
      'Hospitalization and surgery',
      'Doctor and specialist visits',
      'Prescription medications',
      'Laboratory and diagnostic tests',
      'Emergency room care',
      'Mental health services'
    ],
    benefits: [
      'Access to network of quality hospitals',
      'Preventive care at no extra cost',
      'Annual health checkups included',
      '24/7 telemedicine consultations',
      'No lifetime coverage limits'
    ],
    icon: Heart
  },
  'Critical Illness Insurance': {
    category: 'health',
    tagline: 'Lump sum payout for serious diagnoses',
    description: 'Critical Illness Insurance provides a lump-sum payment if you are diagnosed with a covered serious illness such as cancer, heart attack, or stroke. Use the funds for treatment, bills, or living expenses.',
    coverage: [
      'Cancer (all stages)',
      'Heart attack and stroke',
      'Organ transplant',
      'Kidney failure',
      'Major burns',
      'Paralysis and coma'
    ],
    benefits: [
      'Tax-free lump sum payment',
      'Use funds for any purpose',
      'Covers income loss during recovery',
      'Supplement to health insurance',
      'Multiple claim options available'
    ],
    icon: Activity
  },
  'Medical Insurance': {
    category: 'health',
    tagline: 'Focus on hospitalization and treatment',
    description: 'Medical Insurance covers the costs of inpatient hospitalization, surgeries, and medical treatments. Ideal for those who want focused coverage for major medical events.',
    coverage: [
      'Inpatient hospitalization',
      'Surgical procedures',
      'Intensive care unit (ICU)',
      'Pre and post hospitalization expenses',
      'Ambulance services',
      'Day surgery procedures'
    ],
    benefits: [
      'Cashless treatment at panel hospitals',
      'No sub-limits on room charges',
      'Covers pre-existing conditions after waiting period',
      'Worldwide emergency coverage',
      'Annual limit restoration'
    ],
    icon: Heart
  },

  // Auto Insurance - 3 plans
  'Auto Insurance': {
    category: 'auto',
    tagline: 'Complete protection for your vehicle',
    description: 'Auto Insurance provides comprehensive coverage for your vehicle against accidents, theft, and damage. Also covers liability for injuries or damage you may cause to others.',
    coverage: [
      'Collision damage coverage',
      'Comprehensive (theft, fire, natural disasters)',
      'Third-party liability',
      'Personal injury protection',
      'Uninsured motorist coverage',
      'Roadside assistance'
    ],
    benefits: [
      'Quick claims processing',
      'Network of authorized repair shops',
      'No claim bonus up to 50%',
      '24/7 accident assistance',
      'Flexible deductible options'
    ],
    icon: Car
  },
  'Car Insurance': {
    category: 'auto',
    tagline: 'Essential coverage for private cars',
    description: 'Car Insurance specifically designed for private passenger vehicles. Covers your car against accidents, theft, and provides liability protection for third-party claims.',
    coverage: [
      'Own damage coverage',
      'Theft and total loss',
      'Third-party bodily injury',
      'Third-party property damage',
      'Personal accident for driver and passengers',
      'Windshield and glass coverage'
    ],
    benefits: [
      'Agreed value coverage option',
      'New car replacement (first year)',
      'Choice of repair workshops',
      'Rental car during repairs',
      'Easy online claims submission'
    ],
    icon: Car
  },
  'Motor Insurance': {
    category: 'auto',
    tagline: 'Coverage for motorcycles and two-wheelers',
    description: 'Motor Insurance provides protection for motorcycles, scooters, and other two-wheelers. Covers accidents, theft, and liability with affordable premiums.',
    coverage: [
      'Accidental damage',
      'Theft protection',
      'Third-party liability',
      'Personal accident cover',
      'Pillion rider coverage',
      'Accessories and modifications'
    ],
    benefits: [
      'Affordable premiums',
      'Quick claim settlement',
      'Helmet and gear coverage',
      'On-the-spot assistance',
      'Multi-year discount available'
    ],
    icon: Car
  },

  // Property Insurance - 3 plans
  'Home Insurance': {
    category: 'property',
    tagline: 'Protect your home and belongings',
    description: 'Home Insurance protects your house and personal belongings against fire, theft, natural disasters, and other covered perils. Includes liability coverage for accidents on your property.',
    coverage: [
      'Structure and building coverage',
      'Personal belongings and contents',
      'Fire and lightning damage',
      'Theft and burglary',
      'Natural disasters (flood, earthquake)',
      'Liability for guest injuries'
    ],
    benefits: [
      'Replacement cost coverage',
      'Temporary living expenses if displaced',
      'Valuable items coverage option',
      'Home office equipment included',
      'Inflation protection'
    ],
    icon: Home
  },
  'Property Insurance': {
    category: 'property',
    tagline: 'Commercial and investment property protection',
    description: 'Property Insurance provides coverage for commercial buildings, rental properties, and real estate investments. Protect your property assets against various risks.',
    coverage: [
      'Building structure and fixtures',
      'Tenant improvements',
      'Business equipment on premises',
      'Loss of rental income',
      'Natural disaster coverage',
      'Vandalism and malicious damage'
    ],
    benefits: [
      'Multiple property discounts',
      'Business interruption coverage',
      'Landlord liability protection',
      'Legal expense coverage',
      'Flexible coverage limits'
    ],
    icon: Building2
  },
  'Renters Insurance': {
    category: 'property',
    tagline: 'Affordable protection for tenants',
    description: 'Renters Insurance protects your personal belongings in a rented apartment or home. Also provides liability coverage and additional living expenses if you need to relocate temporarily.',
    coverage: [
      'Personal belongings coverage',
      'Electronics and appliances',
      'Theft away from home',
      'Fire and smoke damage',
      'Water damage (non-flood)',
      'Personal liability'
    ],
    benefits: [
      'Very affordable premiums',
      'Easy online application',
      'Coverage follows you when you move',
      'Guest medical payments',
      'Identity theft protection included'
    ],
    icon: Building2
  },

  // General Insurance - 3 plans
  'Travel Insurance': {
    category: 'general',
    tagline: 'Worry-free journeys worldwide',
    description: 'Travel Insurance covers unexpected events during your trips including medical emergencies, trip cancellation, lost luggage, and flight delays. Essential protection for international travel.',
    coverage: [
      'Emergency medical treatment abroad',
      'Medical evacuation and repatriation',
      'Trip cancellation and interruption',
      'Lost or delayed baggage',
      'Flight delay compensation',
      'Personal accident while traveling'
    ],
    benefits: [
      '24/7 worldwide assistance',
      'Direct billing at partner hospitals',
      'Coverage for adventure activities',
      'Family plans available',
      'Annual multi-trip options'
    ],
    icon: Plane
  },
  'Business Insurance': {
    category: 'general',
    tagline: 'Comprehensive protection for your business',
    description: 'Business Insurance protects your company against property damage, liability claims, and business interruption. Essential coverage for small to medium enterprises.',
    coverage: [
      'Business property and equipment',
      'General liability',
      'Product liability',
      'Professional liability (E&O)',
      'Business interruption',
      'Employee theft and fraud'
    ],
    benefits: [
      'Customizable coverage packages',
      'Industry-specific options',
      'Covers legal defense costs',
      'Business income protection',
      'Cyber liability add-on available'
    ],
    icon: Briefcase
  },
  'Liability Insurance': {
    category: 'general',
    tagline: 'Protection against legal claims',
    description: 'Liability Insurance protects you from financial losses if you are held legally responsible for injuries or damage to others. Covers legal fees and settlement costs.',
    coverage: [
      'Bodily injury liability',
      'Property damage liability',
      'Personal injury (libel, slander)',
      'Legal defense costs',
      'Court judgments and settlements',
      'Medical payments to others'
    ],
    benefits: [
      'Peace of mind from lawsuits',
      'Covers legal representation',
      'Umbrella options for extra protection',
      'Worldwide coverage available',
      'Affordable premiums'
    ],
    icon: Umbrella
  }
}

// Get policy details or generate default
const getPolicyDetails = (policyName) => {
  // Try exact match first
  if (policyDetailsData[policyName]) {
    return policyDetailsData[policyName]
  }
  
  // Try to find partial match
  for (const [key, value] of Object.entries(policyDetailsData)) {
    if (policyName?.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(policyName?.toLowerCase())) {
      return value
    }
  }
  
  // Return default
  return {
    category: 'general',
    tagline: 'Comprehensive insurance coverage',
    description: 'This insurance plan provides comprehensive coverage to protect you and your assets. Contact us for more details about this plan.',
    coverage: [
      'Standard coverage for covered events',
      'Protection against common risks',
      'Claims support and assistance',
      'Documentation and processing help'
    ],
    benefits: [
      'Affordable premium rates',
      '24/7 customer support',
      'Quick claims processing',
      'Flexible payment options'
    ],
    icon: Shield
  }
}

// Map policy types/names to category keys
const getCategoryForPolicy = (policyName) => {
  const details = policyDetailsData[policyName]
  if (details) return details.category
  
  const name = policyName?.toLowerCase() || ''
  if (name.includes('life') || name.includes('term') || name.includes('whole') || name.includes('universal')) return 'life'
  if (name.includes('health') || name.includes('medical') || name.includes('dental') || name.includes('vision') || name.includes('critical')) return 'health'
  if (name.includes('auto') || name.includes('car') || name.includes('vehicle') || name.includes('motor')) return 'auto'
  if (name.includes('home') || name.includes('property') || name.includes('house') || name.includes('renters') || name.includes('apartment')) return 'property'
  return 'general'
}

// Map policy types/names to icons
const getIconForPolicy = (policyName) => {
  const details = policyDetailsData[policyName]
  if (details) return details.icon
  
  const name = policyName?.toLowerCase() || ''
  if (name.includes('life')) return Users
  if (name.includes('health') || name.includes('medical')) return Heart
  if (name.includes('critical') || name.includes('illness')) return Activity
  if (name.includes('auto') || name.includes('car') || name.includes('vehicle') || name.includes('motor')) return Car
  if (name.includes('home')) return Home
  if (name.includes('property') || name.includes('renters') || name.includes('apartment')) return Building2
  if (name.includes('travel')) return Plane
  if (name.includes('umbrella') || name.includes('liability')) return Umbrella
  return Briefcase
}

// Animation styles
const cardAnimationStyles = `
  @keyframes cardSlideIn {
    0% {
      opacity: 0;
      transform: translateX(-40px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes modalFadeIn {
    0% {
      opacity: 0;
      transform: scale(0.95) translateY(20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @keyframes backdropFadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes categoryBounce {
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(20px);
    }
    60% {
      transform: scale(1.1) translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @keyframes shimmerGlow {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  .card-slide-in {
    animation: cardSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  
  .modal-fade-in {
    animation: modalFadeIn 0.3s ease-out forwards;
  }
  
  .backdrop-fade-in {
    animation: backdropFadeIn 0.2s ease-out forwards;
  }
  
  .category-bounce {
    animation: categoryBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  
  .shimmer-glow {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    background-size: 200% 100%;
    animation: shimmerGlow 2s linear infinite;
  }
`

// Detail Modal Component
function PolicyDetailModal({ policy, frequency, onClose, onApply }) {
  const details = getPolicyDetails(policy.name)
  const PolicyIcon = getIconForPolicy(policy.name)
  const price = insuranceService.calculatePremium(policy.base_annual_premium, frequency)
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-fade-in"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl modal-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-sky-500 to-blue-600 p-8 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <PolicyIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{policy.name}</h2>
              <p className="text-sky-100 mt-1">{details.tagline}</p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          {/* Price Section */}
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Premium</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{Number(price).toLocaleString()}</span>
                  <span className="text-gray-500 dark:text-gray-400">MMK/{frequency === 'monthly' ? 'mo' : frequency === 'quarterly' ? 'qtr' : 'yr'}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Coverage up to</p>
                <p className="text-xl font-bold text-sky-600 dark:text-sky-400">{policy.coverage_amount?.toLocaleString()} MMK</p>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About This Plan</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{details.description}</p>
          </div>
          
          {/* What's Covered */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              What's Covered
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {details.coverage.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Benefits */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Key Benefits
            </h3>
            <ul className="space-y-3">
              {details.benefits.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                  <Star className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA */}
          <button
            onClick={() => onApply(policy)}
            className="w-full py-4 px-6 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 text-white font-semibold rounded-xl hover:from-sky-500 hover:via-sky-600 hover:to-blue-600 transition-all hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Apply for This Plan
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [frequency, setFrequency] = useState('yearly')
  const [activeCategory, setActiveCategory] = useState('all')
  const [animateCards, setAnimateCards] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Read category from URL on mount or when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl && categories.some(c => c.key === categoryFromUrl)) {
      setActiveCategory(categoryFromUrl)
    }
  }, [searchParams])

  useEffect(() => {
    loadPolicies()
  }, [])

  useEffect(() => {
    // Reset and trigger animation when category changes
    setAnimateCards(false)
    const timer = setTimeout(() => setAnimateCards(true), 50)
    return () => clearTimeout(timer)
  }, [activeCategory, policies])

  const loadPolicies = async () => {
    try {
      setError(null)
      // Add timeout to prevent infinite loading
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const data = await insuranceService.getPolicies()
      clearTimeout(timeoutId)
      setPolicies(data || [])
    } catch (error) {
      console.error('Error loading policies:', error)
      setError('Unable to load insurance plans. Please try again later.')
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

  // Filter policies by category and limit to important ones
  const filteredPolicies = policies.filter(policy => {
    // Check if this policy is in our curated list
    const isInCuratedList = Object.keys(policyDetailsData).some(
      key => key.toLowerCase() === policy.name?.toLowerCase()
    )
    
    if (activeCategory === 'all') {
      return isInCuratedList
    }
    
    const policyCategory = getCategoryForPolicy(policy.name)
    return isInCuratedList && policyCategory === activeCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-sky-200 dark:border-sky-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            <Shield className="absolute inset-0 m-auto w-8 h-8 text-sky-500 animate-pulse" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">Loading amazing plans...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => {
              setLoading(true)
              loadPolicies()
            }}
            className="btn-primary inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Try Again
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-20 overflow-hidden transition-colors duration-300">
      {/* Inject custom animation styles */}
      <style>{cardAnimationStyles}</style>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with gradient text */}
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fadeInUp">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 text-sky-600 text-sm font-medium mb-4 shadow-sm">
            <Award className="w-4 h-4 mr-2" />
            Trusted by 50,000+ customers
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your <span className="gradient-text">Coverage Plan</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Transparent pricing with no hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Category Tabs with bounce animation */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => {
              const CategoryIcon = category.icon
              const isActive = activeCategory === category.key
              
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`category-bounce flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-lg shadow-sky-200 dark:shadow-sky-900'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-gray-700 hover:text-sky-600 dark:hover:text-sky-400 border border-sky-100 dark:border-gray-700 shadow-sm'
                  }`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <CategoryIcon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Frequency Toggle */}
        <div className="flex flex-col items-center mb-12 animate-scaleIn">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl border border-sky-100 dark:border-gray-700 shadow-lg inline-flex relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 shimmer-glow pointer-events-none"></div>
            {[
              { key: 'monthly', label: 'Monthly' },
              { key: 'quarterly', label: 'Quarterly' },
              { key: 'yearly', label: 'Yearly', badge: 'Save 20%' }
            ].map((freq) => (
              <button
                key={freq.key}
                onClick={() => setFrequency(freq.key)}
                className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  frequency === freq.key
                    ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-lg transform scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-gray-700'
                }`}
              >
                {freq.label}
                {freq.badge && frequency === freq.key && (
                  <span className="absolute -top-3 -right-3 px-2 py-1 bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                    {freq.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {frequency === 'monthly' ? '💳 Pay monthly with 10% convenience fee' : 
             frequency === 'quarterly' ? '📅 Pay quarterly with 5% convenience fee' : 
             '🎉 Annual billing – best value!'}
          </p>
        </div>

        {/* Horizontal Policy Cards */}
        {filteredPolicies.length > 0 ? (
          <div className="space-y-4">
            {filteredPolicies.map((policy, index) => {
              const price = insuranceService.calculatePremium(policy.base_annual_premium, frequency)
              const PolicyIcon = getIconForPolicy(policy.name)
              const details = getPolicyDetails(policy.name)
              
              return (
                <div 
                  key={policy.id}
                  onClick={() => setSelectedPolicy(policy)}
                  className={`bg-white dark:bg-gray-800 rounded-2xl border border-sky-100 dark:border-gray-700 shadow-lg hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-600 transition-all duration-300 cursor-pointer group ${
                    animateCards ? 'card-slide-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center p-6 gap-6">
                    {/* Icon */}
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900 dark:to-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:from-sky-400 group-hover:to-sky-500 transition-all duration-300">
                      <PolicyIcon className="w-8 h-8 md:w-10 md:h-10 text-sky-500 group-hover:text-white transition-colors" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                            {policy.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {details.tagline}
                          </p>
                        </div>
                        
                        {/* Price on desktop */}
                        <div className="hidden md:block text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {Number(price).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            MMK/{frequency === 'monthly' ? 'mo' : frequency === 'quarterly' ? 'qtr' : 'yr'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Price on mobile */}
                      <div className="md:hidden mt-3 flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-gray-900 dark:text-white">{Number(price).toLocaleString()}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">MMK/{frequency === 'monthly' ? 'mo' : frequency === 'quarterly' ? 'qtr' : 'yr'}</span>
                        </div>
                      </div>
                      
                      {/* Coverage badge */}
                      <div className="mt-3 flex items-center gap-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 text-xs font-medium">
                          💰 Coverage: {policy.coverage_amount?.toLocaleString()} MMK
                        </span>
                        <span className="text-sky-500 text-sm font-medium group-hover:text-sky-600 flex items-center gap-1">
                          View Details
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 animate-fadeIn">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center mx-auto mb-6 animate-float">
              <Shield className="w-12 h-12 text-sky-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No Plans Found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">We don't have any plans in this category yet.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="btn-primary inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              View All Plans
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        {/* Trust Section */}
        <div className="mt-16 text-center animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-white dark:bg-gray-800 px-8 py-4 rounded-full shadow-xl border border-sky-100 dark:border-gray-700">
            {[1,2,3,4,5].map((i) => (
              <Star 
                key={i} 
                className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" 
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
            <span className="ml-3 text-gray-700 dark:text-gray-300 text-lg">
              Rated <span className="font-bold text-gray-900 dark:text-white">4.9/5</span>
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Trusted by <span className="font-bold text-sky-600">2,000+</span> happy customers
          </p>
        </div>
      </div>
      
      {/* Detail Modal */}
      {selectedPolicy && (
        <PolicyDetailModal
          policy={selectedPolicy}
          frequency={frequency}
          onClose={() => setSelectedPolicy(null)}
          onApply={handleApply}
        />
      )}
    </div>
  )
}
