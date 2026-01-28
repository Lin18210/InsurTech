import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Shield, User, Menu, X, ChevronDown, Heart, Car, Home, Users, Briefcase } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

// Product categories for dropdown
const productCategories = [
  { key: 'life', label: 'Life', icon: Users },
  { key: 'health', label: 'Health', icon: Heart },
  { key: 'auto', label: 'Auto', icon: Car },
  { key: 'property', label: 'Property', icon: Home },
  { key: 'general', label: 'General', icon: Briefcase },
]

export default function Navbar() {
  const { user, profile, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const productsDropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
        setIsProductsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsMenuOpen(false)
    setIsMobileMenuOpen(false)
    await logout()
    navigate('/login')
  }

  const getInitials = (name) => {
    return name ? name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2) : 'U'
  }

  const handleNavClick = (path, e) => {
    // If already on this page, scroll to top
    if (location.pathname === path) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
    setIsMobileProductsOpen(false)
  }

  const handleProductCategoryClick = (categoryKey) => {
    navigate(`/products?category=${categoryKey}`)
    setIsProductsDropdownOpen(false)
    setIsMobileMenuOpen(false)
    setIsMobileProductsOpen(false)
  }

  const navLinks = [
    { to: '/', label: 'Home', show: true },
    { to: '/products', label: 'Products', show: true, hasDropdown: true },
    { to: '/about', label: 'About Us', show: true },
    { to: '/contact', label: 'Contact', show: true },
    { to: '/dashboard', label: 'Dashboard', show: user && !isAdmin },
    { to: '/claims', label: 'Claims', show: user && !isAdmin },
    { to: '/admin', label: 'Admin', show: isAdmin, isAdmin: true },
    { to: '/admin/claims', label: 'Manage Claims', show: isAdmin },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" onClick={(e) => handleNavClick('/', e)} className="flex items-center group">
              <img 
                src="/W&N Logo.png" 
                alt="W&N Insurance Logo" 
                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform drop-shadow-md"
              />
            </Link>
          </div>
            
          {/* Desktop Nav - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-1">
              {navLinks.filter(link => link.show).map((link) => (
                link.hasDropdown ? (
                  <div key={link.to} className="relative" ref={productsDropdownRef}>
                    <button
                      onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.to) || location.pathname.startsWith('/products')
                          ? 'text-sky-600 bg-sky-50' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isProductsDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-scaleIn z-50">
                        <Link
                          to="/products"
                          onClick={() => setIsProductsDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                        >
                          <Shield className="w-5 h-5 mr-3 text-slate-400" />
                          All Products
                        </Link>
                        <div className="border-t border-slate-100 my-1"></div>
                        {productCategories.map((category) => {
                          const CategoryIcon = category.icon
                          return (
                            <button
                              key={category.key}
                              onClick={() => handleProductCategoryClick(category.key)}
                              className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                            >
                              <CategoryIcon className="w-5 h-5 mr-3 text-slate-400" />
                              {category.label} Insurance
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={(e) => handleNavClick(link.to, e)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      link.isAdmin ? 'text-red-600 hover:bg-red-50' :
                      isActive(link.to) 
                        ? 'text-sky-600 bg-sky-50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:block relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center text-sm font-semibold shadow-md">
                    {getInitials(profile?.full_name || user.email)}
                  </div>
                  <span className="text-sm font-medium text-slate-700 hidden lg:block">
                    {profile?.full_name || 'Account'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 animate-scaleIn">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 mr-3 text-slate-400" />
                      My Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Shield className="w-4 h-4 mr-3 text-slate-400" />
                      Dashboard
                    </Link>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm font-semibold text-white px-5 py-2.5 rounded-lg">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
      }`}>
        <div className="px-4 py-4 bg-white border-t border-slate-100 shadow-lg">
          {navLinks.filter(link => link.show).map((link) => (
            link.hasDropdown ? (
              <div key={link.to}>
                <button
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/products') ? 'text-sky-600 bg-sky-50' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileProductsOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-sky-200 pl-4">
                    <Link
                      to="/products"
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileProductsOpen(false); }}
                      className="flex items-center px-3 py-2 text-sm text-slate-600 hover:text-sky-600 rounded-lg hover:bg-sky-50"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      All Products
                    </Link>
                    {productCategories.map((category) => {
                      const CategoryIcon = category.icon
                      return (
                        <button
                          key={category.key}
                          onClick={() => handleProductCategoryClick(category.key)}
                          className="flex items-center w-full px-3 py-2 text-sm text-slate-600 hover:text-sky-600 rounded-lg hover:bg-sky-50"
                        >
                          <CategoryIcon className="w-4 h-4 mr-2" />
                          {category.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleNavClick(link.to, e)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  link.isAdmin ? 'text-red-600' :
                  isActive(link.to) ? 'text-sky-600 bg-sky-50' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
          
          {user ? (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 text-white flex items-center justify-center font-semibold mr-3 shadow-md">
                  {getInitials(profile?.full_name || user.email)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{profile?.full_name || 'User'}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                <User className="w-5 h-5 mr-3 text-slate-400" />
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center px-4 py-3 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-lg font-semibold shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
