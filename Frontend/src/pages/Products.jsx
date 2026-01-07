import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { insuranceService } from '../services/insuranceService'
import { 
  Shield, Check, ArrowRight, Star, Award,
  Heart, Car, Home, Briefcase, Umbrella, Users, 
  Plane, Activity, Building2, Sparkles, LayoutGrid
} from 'lucide-react'

// Category definitions with icons
const categories = [
  { key: 'all', label: 'All Plans', icon: LayoutGrid },
  { key: 'health', label: 'Health', icon: Heart },
  { key: 'property', label: 'Property', icon: Home },
  { key: 'auto', label: 'Auto', icon: Car },
  { key: 'life', label: 'Life', icon: Users },
  { key: 'business', label: 'Business', icon: Briefcase },
  { key: 'travel', label: 'Travel', icon: Plane },
]

// Map policy types/names to category keys
const getCategoryForPolicy = (policyName) => {
  const name = policyName?.toLowerCase() || ''
  
  if (name.includes('health') || name.includes('medical') || name.includes('dental') || name.includes('vision')) return 'health'
  if (name.includes('auto') || name.includes('car') || name.includes('vehicle') || name.includes('motor')) return 'auto'
  if (name.includes('home') || name.includes('property') || name.includes('house') || name.includes('renters') || name.includes('apartment')) return 'property'
  if (name.includes('life') || name.includes('term') || name.includes('whole')) return 'life'
  if (name.includes('travel') || name.includes('trip')) return 'travel'
  if (name.includes('business') || name.includes('commercial') || name.includes('liability')) return 'business'
  
  return 'health'
}

// Map policy types/names to icons
const getIconForPolicy = (policyName) => {
  const name = policyName?.toLowerCase() || ''
  
  if (name.includes('health') || name.includes('medical')) return Heart
  if (name.includes('auto') || name.includes('car') || name.includes('vehicle')) return Car
  if (name.includes('home') || name.includes('property') || name.includes('house')) return Home
  if (name.includes('life')) return Users
  if (name.includes('travel')) return Plane
  if (name.includes('business') || name.includes('commercial')) return Briefcase
  if (name.includes('disability') || name.includes('critical')) return Activity
  if (name.includes('umbrella') || name.includes('liability')) return Umbrella
  if (name.includes('renters') || name.includes('apartment')) return Building2
  
  return Shield
}

// Custom card animation styles
const cardAnimationStyles = `
  @keyframes cardReveal {
    0% {
      opacity: 0;
      transform: translateY(60px) scale(0.9) rotateX(10deg);
      filter: blur(10px);
    }
    50% {
      filter: blur(5px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1) rotateX(0);
      filter: blur(0);
    }
  }
  
  @keyframes iconPop {
    0% {
      transform: scale(0) rotate(-180deg);
    }
    60% {
      transform: scale(1.2) rotate(10deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
  
  @keyframes priceCount {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes featureSlide {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
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
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }
  
  .card-reveal {
    animation: cardReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  
  .icon-pop {
    animation: iconPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  .price-count {
    animation: priceCount 0.5s ease-out forwards;
  }
  
  .feature-slide {
    animation: featureSlide 0.4s ease-out forwards;
    opacity: 0;
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

export default function Products() {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [frequency, setFrequency] = useState('yearly')
  const [activeCategory, setActiveCategory] = useState('all')
  const [animateCards, setAnimateCards] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

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

  // Filter policies by category
  const filteredPolicies = activeCategory === 'all' 
    ? policies 
    : policies.filter(policy => getCategoryForPolicy(policy.name) === activeCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-sky-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            <Shield className="absolute inset-0 m-auto w-8 h-8 text-sky-500 animate-pulse" />
          </div>
          <p className="text-slate-600 text-lg">Loading amazing plans...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white pt-24 pb-20 overflow-hidden">
      {/* Inject custom animation styles */}
      <style>{cardAnimationStyles}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with gradient text */}
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fadeInUp">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 text-sky-600 text-sm font-medium mb-4 shadow-sm">
            <Award className="w-4 h-4 mr-2" />
            Trusted by 50,000+ customers
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="gradient-text">Coverage Plan</span>
          </h1>
          <p className="text-lg text-gray-600">
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
                      ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-lg shadow-sky-200'
                      : 'bg-white text-gray-600 hover:bg-sky-50 hover:text-sky-600 border border-sky-100 shadow-sm'
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
          <div className="bg-white p-2 rounded-2xl border border-sky-100 shadow-lg inline-flex relative overflow-hidden">
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
                    : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
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
          <p className="mt-4 text-sm text-gray-500">
            {frequency === 'monthly' ? '💳 Pay monthly with 10% convenience fee' : 
             frequency === 'quarterly' ? '📅 Pay quarterly with 5% convenience fee' : 
             '🎉 Annual billing – best value!'}
          </p>
        </div>

        {/* Pricing Cards with reveal animation */}
        {filteredPolicies.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2" style={{ perspective: '1000px' }}>
            {filteredPolicies.map((policy, index) => {
              const price = insuranceService.calculatePremium(policy.base_annual_premium, frequency)
              const isPopular = index === 1 && filteredPolicies.length > 2
              const PolicyIcon = getIconForPolicy(policy.name)
              
              return (
                <div 
                  key={policy.id} 
                  className={`relative bg-white rounded-3xl border transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl group ${
                    isPopular ? 'border-sky-400 shadow-2xl shadow-sky-200/50 lg:scale-105 z-10' : 'border-sky-100 shadow-xl hover:border-sky-300'
                  } ${animateCards ? 'card-reveal' : 'opacity-0'}`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-400/0 via-sky-400/10 to-sky-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 text-white text-sm font-semibold rounded-full shadow-lg flex items-center animate-pulse">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  )}

                  <div className="relative p-8">
                    {/* Header with Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors">{policy.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {policy.description || 'Comprehensive coverage for peace of mind'}
                        </p>
                      </div>
                      <div 
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
                          animateCards ? 'icon-pop' : ''
                        } ${
                          isPopular 
                            ? 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-500 text-white' 
                            : 'bg-gradient-to-br from-sky-100 to-sky-50 text-sky-500 group-hover:from-sky-400 group-hover:to-sky-500 group-hover:text-white'
                        }`}
                        style={{ animationDelay: `${index * 150 + 300}ms` }}
                      >
                        <PolicyIcon className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Price with count animation */}
                    <div className="py-6 border-y border-sky-100 my-6">
                      <div 
                        className={`flex items-baseline ${animateCards ? 'price-count' : 'opacity-0'}`}
                        style={{ animationDelay: `${index * 150 + 400}ms` }}
                      >
                        <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">${price}</span>
                        <span className="text-gray-500 ml-2 text-lg">
                          /{frequency === 'monthly' ? 'mo' : frequency === 'quarterly' ? 'qtr' : 'yr'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        💰 Coverage up to <span className="font-semibold text-sky-600">${policy.coverage_amount?.toLocaleString()}</span>
                      </p>
                    </div>

                    {/* Features with slide animation */}
                    <ul className="space-y-3 mb-8">
                      {[
                        '✨ Comprehensive coverage',
                        '👨‍👩‍👧‍👦 Family member add-ons',
                        '📞 24/7 customer support',
                        '⚡ Fast claims processing',
                        '🚀 No waiting period'
                      ].map((feature, i) => (
                        <li 
                          key={i} 
                          className={`flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors ${
                            animateCards ? 'feature-slide' : 'opacity-0'
                          }`}
                          style={{ animationDelay: `${index * 150 + 500 + i * 80}ms` }}
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA with hover effect */}
                    <button
                      onClick={() => handleApply(policy)}
                      className={`w-full flex items-center justify-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        isPopular
                          ? 'bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 text-white hover:from-sky-500 hover:via-sky-600 hover:to-blue-600'
                          : 'bg-gradient-to-r from-sky-50 to-sky-100 text-sky-600 hover:from-sky-100 hover:to-sky-200 border border-sky-200'
                      }`}
                    >
                      {user ? '🚀 Get Started' : '🔐 Sign In to Apply'}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
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
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Plans Found</h3>
            <p className="text-gray-600 mb-6">We don't have any plans in this category yet.</p>
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
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-white px-8 py-4 rounded-full shadow-xl border border-sky-100">
            {[1,2,3,4,5].map((i) => (
              <Star 
                key={i} 
                className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" 
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
            <span className="ml-3 text-gray-700 text-lg">
              Rated <span className="font-bold text-gray-900">4.9/5</span>
            </span>
          </div>
          <p className="text-gray-600 text-lg">
            Trusted by <span className="font-bold text-sky-600">2,000+</span> happy customers
          </p>
        </div>
      </div>
    </div>
  )
}
