import { Link } from 'react-router-dom'
import { Shield, Heart, Clock, Headphones, CheckCircle, ArrowRight, Star, Users, TrendingUp, FileCheck, Award, Phone, Sparkles, Zap, Car, Home as HomeIcon, Umbrella, DollarSign, Activity, Plane, Briefcase } from 'lucide-react'
import useScrollAnimation from '../utils/useScrollAnimation'
import heroBanner from '../assets/Banner 3.png'

// Features
const features = [
  {
    icon: Shield,
    title: 'Comprehensive Coverage',
    description: 'Protection that adapts to your life, covering everything from health to assets with customizable plans.'
  },
  {
    icon: Clock,
    title: 'Quick Claims Process',
    description: 'Submit claims online and receive payouts within 48 hours. No paperwork, no hassle.'
  },
  {
    icon: Heart,
    title: 'Family Protection',
    description: 'Extend coverage to your loved ones with our family plans at discounted rates.'
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Our team of insurance experts is available 24/7 to answer your questions.'
  }
]

// Stats
const stats = [
  { number: '50,000+', label: 'Trusted Clients' },
  { number: '98%', label: 'Claims Approved' },
  { number: '250B+ MMK', label: 'Claims Paid' },
  { number: '15+', label: 'Years Experience' }
]

// Testimonials
const testimonials = [
  {
    name: 'David Thompson',
    role: 'Business Owner',
    company: 'Thompson & Associates',
    content: 'InsurTech has been our insurance partner for 5 years. Their professional service and quick claims processing have saved us countless hours.',
    image: 'DT'
  },
  {
    name: 'Maria Santos',
    role: 'HR Director',
    company: 'Global Solutions Inc.',
    content: 'We switched to InsurTech for our employee health coverage. The transition was seamless and our employees love the comprehensive benefits.',
    image: 'MS'
  },
  {
    name: 'James Wilson',
    role: 'Financial Advisor',
    company: 'Wilson Financial',
    content: 'I recommend InsurTech to all my clients. Their transparent pricing and excellent customer service set them apart from competitors.',
    image: 'JW'
  }
]

// Scroll-animated section component
function AnimatedSection({ children, animation = 'fadeInUp', delay = 0, className = '' }) {
  const [ref, isInView] = useScrollAnimation()
  
  return (
    <div 
      ref={ref}
      className={`${className} ${isInView ? `animate-${animation}` : 'opacity-0'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [featuresRef, featuresInView] = useScrollAnimation()
  const [howItWorksRef, howItWorksInView] = useScrollAnimation()
  const [testimonialsRef, testimonialsInView] = useScrollAnimation()
  const [ctaRef, ctaInView] = useScrollAnimation()

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section - Entry Animations */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="InsurTech Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/85 via-indigo-500/80 to-blue-500/85"></div>
        </div>
        {/* Animated Protection Orbit - Always Animating */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient blurs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-floatSlow"></div>
          
          {/* Animated gradient blurs */}
          
          {/* Floating Insurance Particles */}
          <div className="absolute top-20 left-10 w-6 h-6 text-white/20 animate-particle-float" style={{ animationDelay: '0s' }}>
            <Shield className="w-full h-full" />
          </div>
          <div className="absolute top-40 right-10 w-5 h-5 text-white/15 animate-particle-float" style={{ animationDelay: '2s' }}>
            <DollarSign className="w-full h-full" />
          </div>
          <div className="absolute bottom-32 left-1/3 w-4 h-4 text-white/20 animate-particle-float" style={{ animationDelay: '4s' }}>
            <Activity className="w-full h-full" />
          </div>
          <div className="absolute top-1/3 left-20 w-5 h-5 text-white/15 animate-particle-float" style={{ animationDelay: '1s' }}>
            <Star className="w-full h-full" />
          </div>
          <div className="absolute bottom-40 right-1/3 w-6 h-6 text-white/10 animate-particle-float" style={{ animationDelay: '3s' }}>
            <Heart className="w-full h-full" />
          </div>
          <div className="absolute top-1/4 right-1/3 w-4 h-4 text-white/20 animate-particle-float" style={{ animationDelay: '5s' }}>
            <Sparkles className="w-full h-full" />
          </div>
          
          {/* Rising protection particles */}
          <div className="absolute bottom-0 left-1/4 w-3 h-3 text-white/30 animate-rise-up" style={{ animationDelay: '0s', animationDuration: '12s' }}>
            <Shield className="w-full h-full" />
          </div>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 text-white/20 animate-rise-up" style={{ animationDelay: '3s', animationDuration: '15s' }}>
            <Heart className="w-full h-full" />
          </div>
          <div className="absolute bottom-0 right-1/4 w-3 h-3 text-white/25 animate-rise-up" style={{ animationDelay: '6s', animationDuration: '18s' }}>
            <Star className="w-full h-full" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content - Staggered slide up */}
            <div>
              <div className="animate-fadeInDown opacity-0-start inline-flex items-center px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20">
                <Award className="w-4 h-4 mr-2" />
                Rated #1 Insurance Provider 2024
              </div>

              <h1 className="animate-slideUp opacity-0-start delay-100 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Insurance You Can
                <span className="text-sky-100"> Trust</span>
              </h1>

              <p className="animate-slideUp opacity-0-start delay-200 text-lg text-sky-100 mb-8 max-w-lg">
                Protecting families and businesses with comprehensive insurance solutions. 
                Simple, transparent, and always there when you need us.
              </p>

              <div className="animate-fadeInUp opacity-0-start delay-300 flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/products" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl shadow-lg"
                >
                  Get a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-sky-600/30 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Talk to an Expert
                </Link>
              </div>

              {/* Trust indicators - Pop in animation */}
              <div className="animate-popIn opacity-0-start delay-500 flex items-center gap-6 text-sm text-sky-100">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-all">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                  No hidden fees
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-all">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                  Cancel anytime
                </div>
              </div>
            </div>

            {/* Right content - Interactive Orbiting Category Icons */}
            <div className="animate-scaleInBounce opacity-0-start delay-300 lg:pl-12">
              <div className="relative flex items-center justify-center">
                {/* Animated glow background */}
                <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulseGlow"></div>
                
                {/* Orbit Container - expands on hover */}
                <div className="orbit-hover-expand relative w-72 h-72 md:w-80 md:h-80 hover:scale-100">
                  {/* Outer rotating rings */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-80 h-80 border-2 border-dashed border-white/20 rounded-full animate-spin-slow"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-72 h-72 border border-white/30 rounded-full animate-spin-slow-reverse"></div>
                  </div>
                  
                  {/* Central Shield with pulse - stays the same on hover */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Link 
                      to="/products" 
                      className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center animate-protection-ring hover:bg-white/40 hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                      <Shield className="w-10 h-10 text-white" />
                    </Link>
                  </div>
                  
                  {/* Orbiting Category Icons - Clickable */}
                  {[
                    { icon: Heart, label: 'Health', category: 'health', delay: 0 },
                    { icon: HomeIcon, label: 'Property', category: 'property', delay: -2 },
                    { icon: Car, label: 'Auto', category: 'auto', delay: -4 },
                    { icon: Users, label: 'Life', category: 'life', delay: -6 },
                    { icon: Briefcase, label: 'Business', category: 'business', delay: -8 },
                    { icon: Plane, label: 'Travel', category: 'travel', delay: -10 },
                  ].map((item) => {
                    const IconComponent = item.icon
                    return (
                      <div 
                        key={item.category}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ 
                          animation: `orbit 12s linear infinite`, 
                          animationDelay: `${item.delay}s`,
                          pointerEvents: 'none'
                        }}
                      >
                        <Link
                          to={`/products?category=${item.category}`}
                          className="orbit-icon-item w-14 h-14 rounded-full bg-white/25 backdrop-blur-md flex flex-col items-center justify-center shadow-lg cursor-pointer hover:bg-white hover:scale-110 transition-all duration-300"
                          style={{ pointerEvents: 'auto' }}
                          title={`View ${item.label} Insurance`}
                        >
                          <IconComponent className="orbit-icon-svg w-6 h-6 text-white" />
                          <span className="orbit-icon-label text-[9px] text-white font-semibold mt-0.5">
                            {item.label}
                          </span>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider - Animated */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="rgb(240 249 255)"/>
          </svg>
        </div>
      </section>


      {/* Features Section - Staggered fade in from left/right */}
      <section ref={featuresRef} className="py-24 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${featuresInView ? 'animate-bounceInUp' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 text-sm font-medium mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Protection for What Matters Most
            </h3>
            <p className="text-lg text-gray-600">
              We offer a full range of insurance products designed to give you peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 bg-white rounded-2xl border border-sky-100 hover:border-sky-300 hover:shadow-xl transition-all duration-500 card-animated ${
                  featuresInView ? (index % 2 === 0 ? 'animate-fadeInLeft' : 'animate-fadeInRight') : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center mb-6 shadow-lg transition-all group-hover:scale-110 group-hover:rotate-3 ${index === 0 ? 'bg-gradient-to-br from-rose-400 to-pink-500 group-hover:shadow-pink-200' : index === 1 ? 'bg-gradient-to-br from-amber-400 to-orange-500 group-hover:shadow-orange-200' : index === 2 ? 'bg-gradient-to-br from-emerald-400 to-teal-500 group-hover:shadow-teal-200' : 'bg-gradient-to-br from-purple-400 to-indigo-500 group-hover:shadow-indigo-200'}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎉 Special Promotional Banner */}
      <section className="py-12 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-floatSlow"></div>
          <Sparkles className="absolute top-4 right-10 w-8 h-8 text-white/30 animate-pulse" />
          <Star className="absolute bottom-4 left-10 w-6 h-6 text-yellow-200/40 animate-bounce" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold mb-3 animate-pulse">
                🔥 LIMITED TIME OFFER
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Get 25% OFF Your First Year!
              </h3>
              <p className="text-white/90 text-lg">
                New customers save big on all insurance plans. Don't miss out!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Claim Your Discount
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <div className="flex items-center justify-center text-white font-semibold">
                <Clock className="w-5 h-5 mr-2" />
                Ends in 48 hours!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💎 Insurance Deals Showcase */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Special Deals
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Exclusive Insurance Offers
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take advantage of our special promotions designed to give you the best protection at unbeatable prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Heart, 
                title: 'Health Insurance', 
                offer: 'Free Health Checkup', 
                desc: 'Get a complimentary health screening worth 400,000 MMK',
                color: 'from-rose-400 to-pink-500',
                category: 'health'
              },
              { 
                icon: Car, 
                title: 'Auto Insurance', 
                offer: '3 Months Free', 
                desc: 'Pay for 9 months, get 12 months coverage',
                color: 'from-blue-400 to-indigo-500',
                category: 'auto'
              },
              { 
                icon: HomeIcon, 
                title: 'Property Insurance', 
                offer: 'No Deductibles', 
                desc: 'First claim processed without any deductions',
                color: 'from-emerald-400 to-teal-500',
                category: 'property'
              },
              { 
                icon: Users, 
                title: 'Life Insurance', 
                offer: 'Family Bundle', 
                desc: 'Add 2 family members free with any plan',
                color: 'from-amber-400 to-orange-500',
                category: 'life'
              }
            ].map((deal, index) => (
              <Link
                key={index}
                to={`/products?category=${deal.category}`}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${deal.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Badge */}
                <div className="absolute -top-2 -right-2">
                  <div className={`bg-gradient-to-r ${deal.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse`}>
                    SPECIAL
                  </div>
                </div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${deal.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  <deal.icon className="w-7 h-7" />
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-1">{deal.title}</h4>
                <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {deal.offer}
                </div>
                <p className="text-sm text-gray-600">{deal.desc}</p>
                
                <div className="mt-4 flex items-center text-sky-600 font-medium text-sm group-hover:text-sky-700">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              View All Offers
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works - Flip in animation */}
      <section ref={howItWorksRef} className="py-24 bg-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-floatSlow"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${howItWorksInView ? 'animate-blurIn' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Simple Process
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Get Covered in Minutes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Get Your Quote', desc: 'Answer a few questions about your needs and receive an instant personalized quote.', icon: FileCheck },
              { step: '2', title: 'Choose Your Plan', desc: 'Select the coverage level that fits your budget. Customize as needed.', icon: Users },
              { step: '3', title: 'You\'re Protected', desc: 'Your coverage starts immediately. Access your policy documents online anytime.', icon: Shield }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`text-center group ${howItWorksInView ? 'animate-flipIn' : 'opacity-0'}`}
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center mx-auto shadow-lg group-hover:shadow-sky-200 transition-all group-hover:scale-110 group-hover:-rotate-6">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-sky-100 text-sky-600 font-bold flex items-center justify-center text-sm border-2 border-white shadow-md">
                    {item.step}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 ${howItWorksInView ? 'animate-bounceIn' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl shadow-lg"
            >
              Start Your Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Rotate in animation */}
      <section ref={testimonialsRef} className="py-24 bg-gradient-to-b from-white to-sky-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${testimonialsInView ? 'animate-fadeInDown' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              Testimonials
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`p-8 bg-white rounded-2xl border border-sky-100 shadow-lg card-animated ${
                  testimonialsInView ? 'animate-rotateIn' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.1 + index * 0.15}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center font-semibold mr-4 shadow-lg group-hover:rotate-6 transition-transform ${index === 0 ? 'bg-gradient-to-br from-rose-400 to-pink-500' : index === 1 ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 'bg-gradient-to-br from-purple-400 to-indigo-500'}`}>
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Scale animation */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 relative overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl animate-floatSlow"></div>
          
          {/* Animated protection ring on left */}
          <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden md:block">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 animate-protection-ring flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white/40 animate-pulse" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border border-white/20 rounded-full animate-spin-slow"></div>
              </div>
            </div>
          </div>
          
          {/* Animated protection ring on right */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden md:block">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 animate-protection-ring flex items-center justify-center" style={{ animationDelay: '1s' }}>
                  <Heart className="w-8 h-8 text-white/40 animate-heartbeat" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border border-dashed border-white/20 rounded-full animate-spin-slow-reverse"></div>
              </div>
            </div>
          </div>
          
          {/* Orbiting mini icons */}
          <div className="absolute top-10 right-20 w-8 h-8 text-white/20 animate-orbit" style={{ animationDuration: '8s' }}>
            <Car className="w-full h-full" />
          </div>
          <div className="absolute bottom-10 left-20 w-8 h-8 text-white/20 animate-orbit-reverse" style={{ animationDuration: '10s' }}>
            <HomeIcon className="w-full h-full" />
          </div>
          <div className="absolute top-1/4 left-1/3 w-6 h-6 text-white/15 animate-particle-float" style={{ animationDelay: '2s' }}>
            <Umbrella className="w-full h-full" />
          </div>
          <div className="absolute bottom-1/4 right-1/3 w-5 h-5 text-white/20 animate-particle-float" style={{ animationDelay: '4s' }}>
            <DollarSign className="w-full h-full" />
          </div>
        </div>
        
        <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${ctaInView ? 'animate-scaleInBounce' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Protected?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of satisfied customers. Get your free quote in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all hover:scale-105"
            >
              Get Your Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-600/30 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

