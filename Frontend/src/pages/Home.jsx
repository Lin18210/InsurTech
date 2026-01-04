import { Link } from 'react-router-dom'
import { Shield, Heart, Clock, Headphones, CheckCircle, ArrowRight, Star, Users, TrendingUp, FileCheck, Award, Phone } from 'lucide-react'

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


export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 pt-20 pb-32 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="animate-slideUp opacity-0-start inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Rated #1 Insurance Provider 2024
              </div>

              <h1 className="animate-slideUp opacity-0-start delay-100 text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Insurance You Can
                <span className="text-blue-600"> Trust</span>
              </h1>

              <p className="animate-slideUp opacity-0-start delay-200 text-lg text-slate-600 mb-8 max-w-lg">
                Protecting families and businesses with comprehensive insurance solutions. 
                Simple, transparent, and always there when you need us.
              </p>

              <div className="animate-slideUp opacity-0-start delay-300 flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/products" 
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-lg"
                >
                  Get a Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  to="/products" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Talk to an Expert
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="animate-slideUp opacity-0-start delay-400 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  No hidden fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Cancel anytime
                </div>
              </div>
            </div>

            {/* Right content - Stats card */}
            <div className="animate-scaleIn opacity-0-start delay-200 lg:pl-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-900">Why Choose InsurTech?</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-slate-50">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-slate-600">4.9/5 from 2,000+ reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">Our Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Protection for What Matters Most
            </h3>
            <p className="text-lg text-slate-600">
              We offer a full range of insurance products designed to give you peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">Simple Process</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
              Get Covered in Minutes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Get Your Quote', desc: 'Answer a few questions about your needs and receive an instant personalized quote.' },
              { step: '2', title: 'Choose Your Plan', desc: 'Select the coverage level that fits your budget. Customize as needed.' },
              { step: '3', title: 'You\'re Protected', desc: 'Your coverage starts immediately. Access your policy documents online anytime.' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg"
            >
              Start Your Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">Testimonials</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
              What Our Clients Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Protected?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers. Get your free quote in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Your Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">InsurTech</span>
              </div>
              <p className="text-sm max-w-md">
                Providing trusted insurance solutions since 2009. We're committed to protecting what matters most to you and your family.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Health Insurance</a></li>
                <li><a href="#" className="hover:text-white transition">Life Insurance</a></li>
                <li><a href="#" className="hover:text-white transition">Auto Insurance</a></li>
                <li><a href="#" className="hover:text-white transition">Home Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
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
