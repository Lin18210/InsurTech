import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Phone, Mail, MapPin, Clock, Send, MessageSquare, 
  CheckCircle, ArrowRight, Building2, Headphones,
  Shield, Star, Sparkles
} from 'lucide-react'
import useScrollAnimation from '../utils/useScrollAnimation'

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
    value: 'support@insurtech.com',
    action: 'mailto:support@insurtech.com'
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
    description: 'We\'re available',
    value: 'Mon - Fri: 8:00 AM - 6:00 PM EST',
    action: null
  }
]

// FAQ teaser items
const quickFAQ = [
  'How do I file a claim?',
  'What documents do I need?',
  'How long does claim processing take?'
]

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [cardsRef, cardsInView] = useScrollAnimation()
  const [formRef, formInView] = useScrollAnimation()
  const [ctaRef, ctaInView] = useScrollAnimation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section - Blur and slide animations */}
      <section className="relative bg-gradient-to-br from-sky-400 via-sky-500 to-blue-500 pt-32 pb-20 overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-floatSlow"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          {/* Floating icons */}
          <Shield className="absolute top-20 right-20 w-12 h-12 text-white/20 animate-float" style={{ animationDelay: '0s' }} />
          <Star className="absolute top-40 right-40 w-8 h-8 text-white/15 animate-floatSlow" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute bottom-32 left-20 w-10 h-10 text-white/20 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-scaleInBounce opacity-0-start inline-flex items-center px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20">
            <Headphones className="w-4 h-4 mr-2" />
            We're Here to Help
          </div>
          
          <h1 className="animate-blurIn opacity-0-start delay-100 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Get In <span className="text-sky-100">Touch</span>
          </h1>
          
          <p className="animate-fadeInUp opacity-0-start delay-200 text-lg md:text-xl text-sky-100 max-w-2xl mx-auto">
            Have questions about our insurance products? Need help with a claim? 
            Our friendly team is ready to assist you.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="rgb(240 249 255)"/>
          </svg>
        </div>
      </section>

      {/* Contact Information Cards - Staggered flip animation */}
      <section ref={cardsRef} className="py-12 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16 relative z-10">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-xl border border-sky-100 card-animated ${
                  cardsInView ? 'animate-flipIn' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 transition-transform">
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{info.description}</p>
                {info.action ? (
                  <a 
                    href={info.action}
                    className="text-sky-600 font-medium hover:text-sky-700 transition-colors underline-animate"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-700 text-sm">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section - Slide animations */}
      <section ref={formRef} className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form - Slide in from left */}
            <div className={`relative ${formInView ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-sky-50/30 rounded-3xl -rotate-1"></div>
              <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-sky-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center mr-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                </div>
                
                {isSubmitted ? (
                  <div className="text-center py-12 animate-scaleInBounce">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 text-white flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulseGlow">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-sky-600 font-medium hover:text-sky-700 underline-animate"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className={formInView ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all bg-sky-50/50 hover:border-sky-300"
                          placeholder="John"
                        />
                      </div>
                      <div className={formInView ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: '0.25s' }}>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all bg-sky-50/50 hover:border-sky-300"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className={formInView ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: '0.3s' }}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all bg-sky-50/50 hover:border-sky-300"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className={formInView ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: '0.35s' }}>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all bg-sky-50/50 hover:border-sky-300"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className={formInView ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: '0.4s' }}>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all bg-sky-50/50 hover:border-sky-300"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="quote">Request a Quote</option>
                        <option value="claims">Claims Question</option>
                        <option value="policy">Policy Information</option>
                        <option value="billing">Billing Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className={formInView ? 'animate-fadeInUp' : 'opacity-0'} style={{ animationDelay: '0.45s' }}>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all bg-sky-50/50 hover:border-sky-300 resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full btn-primary flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                        formInView ? 'animate-popIn' : 'opacity-0'
                      }`}
                      style={{ animationDelay: '0.5s' }}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Side Info - Slide in from right with stagger */}
            <div className={`space-y-8 ${formInView ? 'animate-slideInRight' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              {/* Quick FAQ */}
              <div className={`bg-gradient-to-br from-sky-50 to-white rounded-3xl p-8 shadow-lg border border-sky-100 ${
                formInView ? 'animate-bounceInUp' : 'opacity-0'
              }`} style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageSquare className="w-5 h-5 text-sky-500 mr-2" />
                  Frequently Asked
                </h3>
                <ul className="space-y-4">
                  {quickFAQ.map((question, index) => (
                    <li key={index}>
                      <button className="w-full flex items-center justify-between text-left text-gray-700 hover:text-sky-600 transition-colors group p-3 rounded-xl hover:bg-sky-50">
                        <span>{question}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency Support - Rotate animation */}
              <div className={`relative overflow-hidden bg-gradient-to-br from-sky-400 via-sky-500 to-blue-500 rounded-3xl p-8 text-white shadow-2xl ${
                formInView ? 'animate-rotateIn' : 'opacity-0'
              }`} style={{ animationDelay: '0.4s' }}>
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 animate-float"></div>
                <Phone className="w-12 h-12 mb-4 text-sky-100 animate-float" />
                <h3 className="text-xl font-bold mb-2">Need Urgent Help?</h3>
                <p className="text-sky-100 mb-6">
                  For emergency claims or urgent assistance, call our 24/7 hotline.
                </p>
                <a 
                  href="tel:+15551234567"
                  className="inline-flex items-center px-6 py-3 bg-white text-sky-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-sky-50 transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </div>

              {/* Office Location - Pop animation */}
              <div className={`bg-gradient-to-br from-sky-50 to-white rounded-3xl p-8 shadow-lg border border-sky-100 ${
                formInView ? 'animate-popIn' : 'opacity-0'
              }`} style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center mr-3">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Headquarters</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  73^110 Manawhari street<br />
                  Chanmyathasi township<br />
                  Mandalay, Myanmar
                </p>
                <a 
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 font-medium hover:text-sky-700 inline-flex items-center group underline-animate"
                >
                  Get Directions
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
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
        
        <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${ctaInView ? 'animate-blurIn' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Protected?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Explore our insurance products and find the perfect coverage for your needs.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-sky-50 transition-all hover:scale-105"
          >
            View Our Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
