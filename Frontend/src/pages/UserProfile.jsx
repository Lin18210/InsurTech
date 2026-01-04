import { useAuth } from '../context/AuthContext'
import { User, Mail, Shield, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function UserProfile() {
  const { user, profile } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
             <p className="mt-2 text-gray-600">Please <Link to="/login" className="text-blue-600 hover:text-blue-500">login</Link> to view this page.</p>
        </div>
      </div>
    )
  }

  // Helper to get initials
  const getInitials = (name) => {
    return name
      ? name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
      : 'U'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header / Banner */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="px-6 py-6 relative">
                 <div className="absolute -top-16 left-6">
                    <div className="h-32 w-32 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 shadow-lg">
                        {getInitials(profile?.full_name || user.email)}
                    </div>
                 </div>
                 <div className="ml-40 pt-2">
                     <h1 className="text-3xl font-bold text-gray-900">{profile?.full_name || 'User'}</h1>
                     <p className="text-gray-500">{user.email}</p>
                 </div>
            </div>
        </div>

        {/* Details Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            </div>
            <div className="px-6 py-6 space-y-6">
                
                <div className="flex items-center">
                    <User className="h-6 w-6 text-gray-400 mr-4" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="text-lg text-gray-900">{profile?.full_name || 'Not provided'}</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <Mail className="h-6 w-6 text-gray-400 mr-4" />
                    <div>
                         <p className="text-sm font-medium text-gray-500">Email Address</p>
                         <p className="text-lg text-gray-900">{user.email}</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <Shield className="h-6 w-6 text-gray-400 mr-4" />
                    <div>
                         <p className="text-sm font-medium text-gray-500">Account Role</p>
                         <p className="text-lg text-gray-900 capitalize">{profile?.role || 'Customer'}</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <Calendar className="h-6 w-6 text-gray-400 mr-4" />
                    <div>
                         <p className="text-sm font-medium text-gray-500">Member Since</p>
                         <p className="text-lg text-gray-900">
                            {user.created_at ? format(new Date(user.created_at), 'MMMM dd, yyyy') : 'N/A'}
                         </p>
                    </div>
                </div>

            </div>
             <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
                <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Go to Dashboard &rarr;
                </Link>
            </div>
        </div>

      </div>
    </div>
  )
}
