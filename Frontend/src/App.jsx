import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import Products from './pages/Products'
import CustomerDashboard from './pages/Dashboard'
import ClaimsCenter from './pages/ClaimsCenter'
import CheckoutFlow from './pages/Checkout/CheckoutFlow'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminClaimsDashboard from './pages/Admin/ClaimsDashboard'
import PolicyManager from './pages/Admin/PolicyManager'
import UserProfile from './pages/UserProfile'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'

function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Customer Routes */}
              <Route path="/dashboard" element={<CustomerDashboard />} />
              <Route path="/claims" element={<ClaimsCenter />} />
              <Route path="/checkout" element={<CheckoutFlow />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/claims" element={<AdminClaimsDashboard />} />
              <Route path="/admin/policies" element={<PolicyManager />} />
              
              {/* User Profile */}
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
    </LanguageProvider>
  )
}

export default App
