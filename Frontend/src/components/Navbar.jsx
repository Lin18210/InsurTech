import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { LogOut, Shield, User, Menu, X, ChevronDown, Heart, Car, Home, Users, Briefcase, Globe, Moon, Sun } from 'lucide-react'
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
  const { language, toggleLanguage, t } = useLanguage()
  const { isDarkMode, toggleDarkMode } = useTheme()
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
    { to: '/', label: t('home'), show: true },
    { to: '/products', label: t('products'), show: true, hasDropdown: true },
    { to: '/about', label: t('aboutUs'), show: true },
    { to: '/contact', label: t('contact'), show: true },
    { to: '/dashboard', label: t('dashboard'), show: user && !isAdmin },
    { to: '/claims', label: t('claims'), show: user && !isAdmin },
    { to: '/admin', label: t('admin'), show: isAdmin, isAdmin: true },
    { to: '/admin/claims', label: t('manageClaims'), show: isAdmin },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-gray-800 shadow-md' : 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm'
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
                  <div 
                    key={link.to} 
                    className="relative group"
                    ref={productsDropdownRef}
                    onMouseEnter={() => setIsProductsDropdownOpen(true)}
                    onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.to) || location.pathname.startsWith('/products')
                          ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30' 
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown with smooth animation - pt-2 creates invisible bridge for hover */}
                    <div className={`absolute left-1/2 -translate-x-1/2 pt-2 w-56 z-50 transition-all duration-300 origin-top ${
                      isProductsDropdownOpen 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}>
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-slate-200 dark:border-gray-700 py-2 overflow-hidden">
                      <Link
                        to="/products"
                        onClick={() => setIsProductsDropdownOpen(false)}
                        className={`flex items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 dark:hover:from-sky-900/50 dark:hover:to-blue-900/50 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 group/item ${
                          isProductsDropdownOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                        }`}
                        style={{ transitionDelay: isProductsDropdownOpen ? '50ms' : '0ms' }}
                      >
                        <Shield className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500 group-hover/item:text-sky-500 transition-colors" />
                        <span>{t('allProducts')}</span>
                      </Link>
                      <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                      {productCategories.map((category, index) => {
                        const CategoryIcon = category.icon
                        return (
                          <button
                            key={category.key}
                            onClick={() => handleProductCategoryClick(category.key)}
                            className={`flex items-center w-full px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-sky-50 cursor-pointer hover:to-blue-50 dark:hover:from-sky-900/50 dark:hover:to-blue-900/50 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 group/item ${
                              isProductsDropdownOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                            }`}
                            style={{ 
                              transitionDelay: isProductsDropdownOpen ? `${(index + 1) * 60}ms` : '0ms'
                            }}
                          >
                            <CategoryIcon className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500 group-hover/item:text-sky-500 group-hover/item:scale-110 transition-all" />
                            <span>{t(`${category.key}Insurance`)}</span>
                          </button>
                        )
                      })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={(e) => handleNavClick(link.to, e)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      link.isAdmin ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30' :
                      isActive(link.to) 
                        ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 group"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 group"
              title={language === 'en' ? 'Switch to Myanmar' : 'Switch to English'}
            >
              <Globe className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {language === 'en' ? 'EN' : 'MM'}
              </span>
            </button>
            
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
                      <p className="text-xs text-slate-500">{t('signedInAs')}</p>
                      <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 mr-3 text-slate-400" />
                      {t('myProfile')}
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Shield className="w-4 h-4 mr-3 text-slate-400" />
                      {t('dashboard')}
                    </Link>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        {t('signOut')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2">
                  {t('signIn')}
                </Link>
                <Link to="/register" className="btn-primary text-sm font-semibold text-white px-5 py-2.5 rounded-lg">
                  {t('getStarted')}
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
                      All Plans
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
          
          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-between w-full px-4 py-3 mt-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <div className="flex items-center">
              {isDarkMode ? (
                <Sun className="w-5 h-5 mr-3 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 mr-3 text-slate-600 dark:text-slate-300" />
              )}
              <span className="text-slate-700 dark:text-slate-200">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <span className={`px-2 py-1 rounded-md text-xs font-bold ${isDarkMode ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-200 text-slate-600'}`}>
              {isDarkMode ? '☀️' : '🌙'}
            </span>
          </button>
          
          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-between w-full px-4 py-3 mt-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-3 text-slate-600 dark:text-slate-300" />
              <span className="text-slate-700 dark:text-slate-200">{language === 'en' ? 'Language' : 'ဘာသာစကား'}</span>
            </div>
            <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-md text-xs font-bold">
              {language === 'en' ? 'EN' : 'MM'}
            </span>
          </button>
          
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
                {t('myProfile')}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-5 h-5 mr-3" />
                {t('signOut')}
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
              >
                {t('signIn')}
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center px-4 py-3 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-lg font-semibold shadow-md"
              >
                {t('getStarted')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
