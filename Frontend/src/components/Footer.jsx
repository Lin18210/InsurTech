import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
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
              <li><Link to="/products?category=health" className="hover:text-white transition">Health Insurance</Link></li>
              <li><Link to="/products?category=life" className="hover:text-white transition">Life Insurance</Link></li>
              <li><Link to="/products?category=auto" className="hover:text-white transition">Auto Insurance</Link></li>
              <li><Link to="/products?category=property" className="hover:text-white transition">Home Insurance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/products" className="hover:text-white transition">All Products</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} InsurTech. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
