import { Link } from 'react-router-dom'
import { 
  Shield, Target, Users, Award, Heart, CheckCircle, 
  TrendingUp, Globe, Building2, ArrowRight, Briefcase,
  Zap, Star, Sparkles
} from 'lucide-react'
import useScrollAnimation from '../utils/useScrollAnimation'

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
  { number: '$100M+', label: 'Claims Paid', icon: TrendingUp },
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

export default function AboutUs() {
  const [storyRef, storyInView] = useScrollAnimation()
  const [valuesRef, valuesInView] = useScrollAnimation()
  const [whyUsRef, whyUsInView] = useScrollAnimation()
  const [ctaRef, ctaInView] = useScrollAnimation()

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section - Slide animations */}
      <section className="relative bg-gradient-to-br from-sky-400 via-sky-500 to-blue-500 pt-32 pb-24 overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-floatSlow"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          {/* Floating icons */}
          <Shield className="absolute top-20 right-20 w-12 h-12 text-white/20 animate-float" style={{ animationDelay: '0s' }} />
          <Star className="absolute top-40 right-40 w-8 h-8 text-white/15 animate-floatSlow" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute bottom-20 left-20 w-10 h-10 text-white/20 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounceInUp opacity-0-start inline-flex items-center px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20">
            <Building2 className="w-4 h-4 mr-2" />
            About InsurTech
          </div>
          
          <h1 className="animate-blurIn opacity-0-start delay-100 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Protecting What Matters
            <span className="text-sky-100"> Most</span>
          </h1>
          
          <p className="animate-fadeInUp opacity-0-start delay-200 text-lg md:text-xl text-sky-100 max-w-3xl mx-auto mb-8">
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
              className="inline-flex items-center justify-center px-8 py-4 bg-sky-600/30 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
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
      <section ref={storyRef} className="py-24 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={storyInView ? 'animate-slideInLeft' : 'opacity-0'}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Our Story
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on Trust, Driven by Purpose
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  InsurTech was founded with a simple belief: insurance should protect people, not confuse them. 
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
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200/50 to-sky-100/30 rounded-3xl -rotate-3 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-sky-100">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className={`text-center p-6 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-sky-100 card-animated ${
                        storyInView ? 'animate-scaleInBounce' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section - Staggered bounce in */}
      <section ref={valuesRef} className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${valuesInView ? 'animate-fadeInDown' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Our Values
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h3>
            <p className="text-lg text-gray-600">
              Our values guide every interaction, every policy, and every claim we process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`group p-8 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-sky-100 hover:border-sky-300 card-animated ${
                  valuesInView ? 'animate-bounceInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.1 + index * 0.15}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center mb-6 shadow-lg group-hover:shadow-sky-200 transition-all group-hover:scale-110 group-hover:rotate-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Alternating slide */}
      <section ref={whyUsRef} className="py-24 bg-gradient-to-b from-white to-sky-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={whyUsInView ? 'animate-fadeInLeft' : 'opacity-0'}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Why InsurTech
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The InsurTech Difference
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                We're not just another insurance company. We're your partner in protection, 
                committed to being there when you need us most.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyChooseUs.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start bg-white p-4 rounded-xl border border-sky-100 hover:shadow-md transition-all hover:-translate-y-1 ${
                      whyUsInView ? 'animate-popIn' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
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
                  Join thousands of satisfied customers who trust InsurTech with their protection needs.
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
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 relative overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-sky-300/20 rounded-full blur-2xl animate-floatSlow"></div>
        </div>
        
        <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${ctaInView ? 'animate-scaleInBounce' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have Questions?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Our team is here to help. Reach out to us and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-sky-50 transition-all hover:scale-105"
            >
              Contact Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 bg-sky-600/30 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
