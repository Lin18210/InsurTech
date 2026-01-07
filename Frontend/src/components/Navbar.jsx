import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Shield, User, Menu, X, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const { user, profile, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)

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
  }

  const navLinks = [
    { to: '/', label: 'Home', show: true },
    { to: '/products', label: 'Products', show: true },
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
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={(e) => handleNavClick('/', e)} className="flex items-center group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-slate-900">InsurTech</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex md:ml-10 space-x-1">
              {navLinks.filter(link => link.show).map((link) => (
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
