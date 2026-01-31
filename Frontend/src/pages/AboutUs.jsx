import { Link } from 'react-router-dom'
import { 
  Shield, Target, Users, Award, Heart, CheckCircle, 
  TrendingUp, Globe, Building2, ArrowRight, Briefcase,
  Zap, Star, Sparkles, Phone, Mail, MapPin, Clock
} from 'lucide-react'
import useScrollAnimation from '../utils/useScrollAnimation'
import myanmarBanner from '../assets/myanmar_insurance_banner.png'

// Contact information
const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    description: 'Mon-Fri from 8am to 6pm',
    value: '+1 (555) 123-4567',
    action: 'tel:+15551234567'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'We reply within 24 hours',
    value: 'support@W&N Insurance.com',
    action: 'mailto:support@W&N Insurance.com'
  },
  {
    icon: MapPin,
    title: 'Office',
    description: 'Visit our headquarters',
    value: '73^110 Manawhari street,Chanmyathasi township,MDY',
    action: null
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: "We're available",
    value: 'Mon - Fri: 8:00 AM - 6:00 PM EST',
    action: null
  }
]

// Company values
const values = [
  {
    icon: Target,
    title: 'Customer First',
    description: 'Every decision we make starts with how it impacts our customers. Your peace of mind is our priority.'
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We believe in transparent policies, honest communication, and doing what\'s right—even when no one is watching.'
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We understand that behind every claim is a person going through a difficult time. We\'re here to help.'
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We leverage technology to simplify insurance, making it accessible and easy to understand for everyone.'
  }
]

// Stats
const stats = [
  { number: '15+', label: 'Years of Experience', icon: Award },
  { number: '50,000+', label: 'Happy Customers', icon: Users },
  { number: '250B+ MMK', label: 'Claims Paid', icon: TrendingUp },
  { number: '24/7', label: 'Customer Support', icon: Globe }
]

// Why choose us points
const whyChooseUs = [
  'Licensed and regulated insurance provider',
  'Fast claims processing within 48 hours',
  'Customizable coverage options',
  'No hidden fees or surprises',
  'Dedicated account managers',
  'Award-winning customer service'
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

export default function AboutUs() {
  const [cardsRef, cardsInView] = useScrollAnimation()
  const [storyRef, storyInView] = useScrollAnimation()
  const [valuesRef, valuesInView] = useScrollAnimation()
  const [whyUsRef, whyUsInView] = useScrollAnimation()
  const [ctaRef, ctaInView] = useScrollAnimation()

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section - Slide animations */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src={myanmarBanner} 
            alt="Myanmar Insurance" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/85 via-indigo-500/80 to-blue-500/85"></div>
        </div>
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-floatSlow"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          {/* Floating icons */}
          <Shield className="absolute top-20 right-20 w-12 h-12 text-white/20 animate-float" style={{ animationDelay: '0s' }} />
          <Star className="absolute top-40 right-40 w-8 h-8 text-white/15 animate-floatSlow" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute bottom-20 left-20 w-10 h-10 text-white/20 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounceInUp opacity-0-start inline-flex items-center px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20">
            <Building2 className="w-4 h-4 mr-2" />
            About W&N Insurance
          </div>
          
          <h1 className="animate-blurIn opacity-0-start delay-100 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Protecting What Matters
            <span className="text-purple-100"> Most</span>
          </h1>
          
          <p className="animate-fadeInUp opacity-0-start delay-200 text-lg md:text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Since 2009, we've been on a mission to make insurance simple, transparent, and accessible. 
            We believe everyone deserves reliable protection without the complexity.
          </p>
          
          <div className="animate-popIn opacity-0-start delay-400 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl shadow-lg"
            >
              Explore Our Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-purple-600/30 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="rgb(240 249 255)"/>
          </svg>
        </div>
      </section>

      {/* Our Story Section - Slide in from sides */}
      <section ref={storyRef} className="py-24 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={storyInView ? 'animate-slideInLeft' : 'opacity-0'}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Our Story
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Built on Trust, Driven by Purpose
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  W&N Insurance was founded with a simple belief: insurance should protect people, not confuse them. 
                  We saw an industry filled with complex jargon, hidden clauses, and frustrating claims processes.
                </p>
                <p>
                  We decided to change that. By combining cutting-edge technology with old-fashioned customer care, 
                  we've built an insurance experience that's transparent, efficient, and genuinely helpful.
                </p>
                <p>
                  Today, we protect over 50,000 customers and have paid out more than $100 million in claims. 
                  But we measure our success differently—by the families we've helped during their most challenging moments.
                </p>
              </div>
            </div>
            
            <div className={`relative ${storyInView ? 'animate-slideInRight' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200/50 to-sky-100/30 dark:from-sky-800/50 dark:to-sky-900/30 rounded-3xl -rotate-3 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 shadow-xl border border-sky-100 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className={`text-center p-6 bg-gradient-to-br from-sky-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl border border-sky-100 dark:border-gray-600 card-animated ${
                        storyInView ? 'animate-scaleInBounce' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 Trust & Guarantee Banner */}
      <section className="py-12 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-300/20 rounded-full blur-xl animate-floatSlow"></div>
          <CheckCircle className="absolute top-6 left-20 w-10 h-10 text-white/20 animate-pulse" />
          <Shield className="absolute bottom-6 right-20 w-8 h-8 text-white/25 animate-bounce" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Trust Badge */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">A+ Rated</div>
                  <div className="text-white/80 text-sm">Insurance Provider</div>
                </div>
              </div>
            </div>

            {/* Main Message */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                100% Satisfaction Guaranteed
              </h3>
              <p className="text-white/90">
                30-day money-back guarantee on all new policies
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center md:justify-end">
              <Link 
                to="/products" 
                className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Start Risk-Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 💼 Special Offer Card */}
      <AnimatedSection animation="fadeInUp" className="py-16 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
            <Sparkles className="absolute top-8 right-8 w-10 h-10 text-white/20 animate-pulse" />
            
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-bold mb-4 animate-pulse">
                  🎁 EXCLUSIVE OFFER
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Family Protection Bundle
                </h3>
                <p className="text-white/90 text-lg mb-6">
                  Protect your entire family with our comprehensive bundle. Save up to 40% when you combine Life, Health, and Property insurance.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Cover up to 4 family members',
                    'Single premium, complete protection',
                    'Free annual health checkups',
                    'Priority claims processing'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-white/90">
                      <CheckCircle className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/products" 
                  className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Get Family Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center animate-float">
                    <div className="text-center">
                      <div className="text-white/80 text-lg">Save up to</div>
                      <div className="text-6xl md:text-7xl font-bold text-white">40%</div>
                      <div className="text-white/80 text-lg">on bundles</div>
                    </div>
                  </div>
                  {/* Floating icons around */}
                  <Heart className="absolute -top-4 -left-4 w-10 h-10 text-white/40 animate-bounce" style={{ animationDelay: '0.5s' }} />
                  <Shield className="absolute -bottom-4 -right-4 w-12 h-12 text-white/40 animate-bounce" style={{ animationDelay: '0s' }} />
                  <Users className="absolute top-1/2 -right-8 w-8 h-8 text-white/40 animate-bounce" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Our Values Section - Staggered bounce in */}
      <section ref={valuesRef} className="py-24 bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${valuesInView ? 'animate-fadeInDown' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/50 dark:to-pink-900/50 text-rose-600 dark:text-rose-400 text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Our Values
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What We Stand For
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our values guide every interaction, every policy, and every claim we process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-2xl border card-animated ${index === 0 ? 'bg-gradient-to-br from-rose-50 to-white dark:from-rose-900/30 dark:to-gray-800 border-rose-100 dark:border-rose-800/50 hover:border-rose-300' : index === 1 ? 'bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/30 dark:to-gray-800 border-amber-100 dark:border-amber-800/50 hover:border-amber-300' : index === 2 ? 'bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/30 dark:to-gray-800 border-teal-100 dark:border-teal-800/50 hover:border-teal-300' : 'bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/30 dark:to-gray-800 border-purple-100 dark:border-purple-800/50 hover:border-purple-300'} ${
                  valuesInView ? 'animate-bounceInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.1 + index * 0.15}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center mb-6 shadow-lg transition-all group-hover:scale-110 group-hover:rotate-6 ${index === 0 ? 'bg-gradient-to-br from-rose-400 to-pink-500 group-hover:shadow-pink-200' : index === 1 ? 'bg-gradient-to-br from-amber-400 to-orange-500 group-hover:shadow-orange-200' : index === 2 ? 'bg-gradient-to-br from-teal-400 to-emerald-500 group-hover:shadow-teal-200' : 'bg-gradient-to-br from-purple-400 to-indigo-500 group-hover:shadow-purple-200'}`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Alternating slide */}
      <section ref={whyUsRef} className="py-24 bg-gradient-to-b from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={whyUsInView ? 'animate-fadeInLeft' : 'opacity-0'}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 text-orange-600 dark:text-orange-400 text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Why W&N Insurance
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                The W&N Insurance Difference
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We're not just another insurance company. We're your partner in protection, 
                committed to being there when you need us most.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyChooseUs.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start bg-white dark:bg-gray-800 p-4 rounded-xl border border-sky-100 dark:border-gray-700 hover:shadow-md transition-all hover:-translate-y-1 ${
                      whyUsInView ? 'animate-popIn' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`relative ${whyUsInView ? 'animate-rotateIn' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-sky-300 to-sky-400 rounded-3xl -rotate-2 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-sky-400 to-sky-500 rounded-3xl p-10 lg:p-12 text-white shadow-2xl">
                <Briefcase className="w-14 h-14 mb-6 text-sky-100 animate-float" />
                <h4 className="text-2xl font-bold mb-4">Ready to Get Protected?</h4>
                <p className="text-sky-100 mb-8 text-lg">
                  Join thousands of satisfied customers who trust W&N Insurance with their protection needs.
                </p>
                <Link 
                  to="/products"
                  className="inline-flex items-center px-8 py-4 bg-white text-sky-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-sky-50 transition-all hover:scale-105"
                >
                  Get Your Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Scale bounce */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 relative overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl animate-floatSlow"></div>
        </div>
        
        <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${ctaInView ? 'animate-scaleInBounce' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have Questions?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Our team is here to help. Reach out to us and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all hover:scale-105"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-600/30 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section ref={cardsRef} className="py-16 bg-gradient-to-b from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h3>
            <p className="text-gray-600 dark:text-gray-300">We're here to help with all your insurance needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-sky-100 dark:border-gray-700 card-animated ${
                  cardsInView ? 'animate-flipIn' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{info.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{info.description}</p>
                {info.action ? (
                  <a 
                    href={info.action}
                    className="text-sky-600 font-medium hover:text-sky-700 transition-colors underline-animate"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-sky-600 font-medium text-sm ">{info.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Headquarters Map */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                Our Headquarters
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Visit Our Office</h3>
              <p className="text-gray-600 dark:text-gray-300">73^110 Manawhari Street, Chanmyathasi Township, Mandalay</p>
            </div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
              {/* Map Container */}
              <div className="aspect-video md:aspect-[21/9] w-full bg-sky-100 dark:bg-gray-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3700.9138448558315!2d96.08710665047039!3d21.93786332840626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6d61168aa7c1%3A0xcf1acb8f196c3bd6!2sMyanmar%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sth!4v1769603587691!5m2!1sen!2sth"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="W&N Insurance Headquarters Location"
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {/* Address Overlay Card */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl max-w-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">W&N Insurance HQ</h4>
                    <p className="text-sm text-gray-600 mb-2">73^110 Manawhari Street<br/>Chanmyathasi Township, Mandalay</p>
                    <a 
                      href="https://www.google.com/maps/search/Chanmyathasi+Township+Mandalay+Myanmar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sky-600 text-sm font-medium hover:text-sky-700"
                    >
                      Get Directions
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
