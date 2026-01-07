import { Link } from 'react-router-dom'
import { Shield, Heart, Clock, Headphones, CheckCircle, ArrowRight, Star, Users, TrendingUp, FileCheck, Award, Phone, Sparkles, Zap } from 'lucide-react'
import useScrollAnimation from '../utils/useScrollAnimation'

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
  { number: '$100M+', label: 'Claims Paid' },
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
      <section className="relative bg-gradient-to-br from-sky-400 via-sky-500 to-blue-500 pt-20 pb-32 overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-floatSlow"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          {/* Floating icons with animation */}
          <Shield className="absolute top-24 right-24 w-12 h-12 text-white/20 animate-float" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute top-44 right-44 w-8 h-8 text-white/15 animate-floatSlow" style={{ animationDelay: '1s' }} />
          <Sparkles className="absolute bottom-40 left-20 w-10 h-10 text-white/20 animate-float" style={{ animationDelay: '1.5s' }} />
          <Heart className="absolute top-32 left-32 w-8 h-8 text-white/10 animate-floatSlow" style={{ animationDelay: '2s' }} />
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

            {/* Right content - Scale bounce animation */}
            <div className="animate-scaleInBounce opacity-0-start delay-300 lg:pl-12">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl animate-pulseGlow"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-sky-100 card-animated">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-2">
                      <Zap className="w-4 h-4 mr-2" />
                      Why Choose Us
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Why Choose InsurTech?</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div 
                        key={index} 
                        className="text-center p-4 rounded-xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 hover:shadow-lg transition-all hover:-translate-y-1"
                        style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                      >
                        <div className="text-3xl font-bold text-sky-600 mb-1">{stat.number}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-sky-100">
                    <div className="flex items-center justify-center gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-scaleIn" style={{ animationDelay: `${0.8 + i * 0.1}s` }} />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">4.9/5 from 2,000+ reviews</span>
                    </div>
                  </div>
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
      <section ref={featuresRef} className="py-24 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${featuresInView ? 'animate-bounceInUp' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center mb-6 shadow-lg group-hover:shadow-sky-200 transition-all group-hover:scale-110 group-hover:rotate-3">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center font-semibold mr-4 shadow-lg group-hover:rotate-6 transition-transform">
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
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 relative overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-sky-300/20 rounded-full blur-2xl animate-floatSlow"></div>
          <Shield className="absolute top-10 right-20 w-16 h-16 text-white/10 animate-float" style={{ animationDelay: '0.5s' }} />
          <Heart className="absolute bottom-10 left-20 w-12 h-12 text-white/10 animate-floatSlow" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${ctaInView ? 'animate-scaleInBounce' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Protected?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Join thousands of satisfied customers. Get your free quote in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-sky-50 transition-all hover:scale-105"
            >
              Get Your Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 bg-sky-600/30 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-white">InsurTech</span>
              </div>
              <p className="text-sm max-w-md">
                Providing trusted insurance solutions since 2009. We're committed to protecting what matters most to you and your family.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition underline-animate">Health Insurance</a></li>
                <li><a href="#" className="hover:text-white transition underline-animate">Life Insurance</a></li>
                <li><a href="#" className="hover:text-white transition underline-animate">Auto Insurance</a></li>
                <li><a href="#" className="hover:text-white transition underline-animate">Home Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition underline-animate">About Us</Link></li>
                <li><a href="#" className="hover:text-white transition underline-animate">Careers</a></li>
                <li><Link to="/contact" className="hover:text-white transition underline-animate">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition underline-animate">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© 2024 InsurTech. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
