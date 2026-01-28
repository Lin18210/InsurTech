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

  if (authLoading || loading) return <div className="p-8 text-gray-900 dark:text-white">Loading Claims...</div>
  
  if (!isAdmin) return <div className="p-8 text-gray-900 dark:text-white">Access Denied. Redirecting...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Claims Processing</h1>
        <button onClick={handleRefresh} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Document</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(claim.created_at), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {claim.profiles?.full_name || 'N/A'}
                  <div className="text-xs text-gray-500 dark:text-gray-400">{claim.profiles?.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="font-medium text-gray-900 dark:text-white">{claim.reason}</div>
                  <div className="text-xs truncate max-w-xs">{claim.description}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {claim.document_url ? (
                    <a href={claim.document_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">None</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                  {claim.amount} MMK
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${claim.status === 'approved' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 
                        claim.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300' : 
                        'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'}`}>
                      {claim.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {claim.status === 'pending' && (
                    <>
                        <button onClick={() => handleUpdateStatus(claim.id, 'approved')} className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-4">Approve</button>
                        <button onClick={() => handleUpdateStatus(claim.id, 'rejected')} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Reject</button>
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
