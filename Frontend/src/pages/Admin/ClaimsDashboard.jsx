import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { claimsService } from '../../services/claimsService'
import { supabase } from '../../lib/supabase'
import { format } from 'date-fns'

export default function AdminClaimsDashboard() {
  const { isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Redirect non-admins
    if (!authLoading && !isAdmin) {
      navigate('/')
    }
  }, [isAdmin, authLoading, navigate])

  // Memoize loadClaims for real-time subscription
  const loadClaims = useCallback(async () => {
    try {
      const data = await claimsService.getAllClaims()
      setClaims(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAdmin) {
      loadClaims()
    }
  }, [isAdmin, loadClaims])

  // Real-time subscription for live updates
  useEffect(() => {
    if (!isAdmin) return

    console.log('🔴 [Admin] Setting up real-time subscription for claims table...')
    
    const channel = supabase
      .channel('admin-claims-realtime')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'claims'
        },
        (payload) => {
          console.log('📡 [Real-time] Claims change detected:', payload.eventType)
          // Re-fetch all data to get the enriched version with profiles/policies
          loadClaims()
        }
      )
      .subscribe((status) => {
        console.log('📡 [Real-time] Claims subscription status:', status)
      })

    // Cleanup on unmount
    return () => {
      console.log('🔴 [Admin] Cleaning up claims real-time subscription...')
      supabase.removeChannel(channel)
    }
  }, [isAdmin, loadClaims])

  // Manual refresh handler
  const handleRefresh = () => {
    setLoading(true)
    loadClaims()
  }

  const handleUpdateStatus = async (id, status) => {
    try {
        await claimsService.updateClaimStatus(id, status, 'Updated by Admin')
        loadClaims()
    } catch (error) {
        alert('Update failed: ' + error.message)
    }
  }

  if (authLoading || loading) return <div className="p-8">Loading Claims...</div>
  
  if (!isAdmin) return <div className="p-8">Access Denied. Redirecting...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Claims Processing</h1>
        <button onClick={handleRefresh} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(claim.created_at), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {claim.profiles?.full_name || 'N/A'}
                  <div className="text-xs text-gray-500">{claim.profiles?.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="font-medium">{claim.reason}</div>
                  <div className="text-xs truncate max-w-xs">{claim.description}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {claim.document_url ? (
                    <a href={claim.document_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  ${claim.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${claim.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        claim.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {claim.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {claim.status === 'pending' && (
                    <>
                        <button onClick={() => handleUpdateStatus(claim.id, 'approved')} className="text-green-600 hover:text-green-900 mr-4">Approve</button>
                        <button onClick={() => handleUpdateStatus(claim.id, 'rejected')} className="text-red-600 hover:text-red-900">Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
