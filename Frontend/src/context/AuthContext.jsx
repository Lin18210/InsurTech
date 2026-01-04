import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/authService'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          console.log('✅ Found existing session for:', session.user.email)
          setUser(session.user)
          
          try {
            const userProfile = await authService.getProfile(session.user.id)
            setProfile(userProfile)
          } catch(e) {
            console.warn('Profile sync failed', e)
          }
        } else {
          console.log('ℹ️ No existing session found')
        }
      } catch (error) {
        console.error('Session initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes (Required for Google Login redirect flow)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('🔐 Auth state changed:', event)
        
        const currentUser = session?.user || null
        
        if (currentUser) {
            setUser(currentUser)
            try {
                const userProfile = await authService.getProfile(currentUser.id)
                setProfile(userProfile)
            } catch(e) {
                console.warn('Profile sync failed', e)
            }
        } else if (event === 'SIGNED_OUT') {
            // Only clear state on explicit sign out
            setUser(null)
            setProfile(null)
        }
    })
    
    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    login: async (email, password) => {
      const data = await authService.login(email, password)
      const { user, session } = data
      
      if (session) {
        console.log('🔐 Syncing session to frontend client')
        await supabase.auth.setSession(session)
      }

      setLoading(false) // Just in case
      setUser(user)
      
      if (user) {
        try {
            console.log('Fetching profile for:', user.id)
            const userProfile = await authService.getProfile(user.id)
            console.log('Profile fetched:', userProfile)
            setProfile(userProfile)
        } catch(e) {
            console.warn('Profile fetch failed', e)
        }
      }
      return data
    },
    register: async (email, password, fullName) => {
      const data = await authService.register(email, password, fullName)
      const { user, session } = data
      
      if (session) {
        console.log('🔐 Syncing session after registration')
        await supabase.auth.setSession(session)
        setUser(user)
        try {
            const userProfile = await authService.getProfile(user.id)
            setProfile(userProfile)
        } catch(e) {
            console.warn('Profile sync failed', e)
        }
      }
      return data
    },
    logout: async () => {
      await authService.logout() // Call API logout
      await supabase.auth.signOut() // Sync Supabase client (clears local storage)
      setUser(null)
      setProfile(null)
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-xl font-semibold text-blue-600">Loading InsurTech...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
