import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { insuranceService } from '../../services/insuranceService'
import { financeService } from '../../services/financeService'
import { supabase } from '../../lib/supabase'
import { format } from 'date-fns'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [subscriptions, setSubscriptions] = useState([])
  const [financialStats, setFinancialStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSubscription, setSelectedSubscription] = useState(null)

  useEffect(() => {
    // Redirect non-admins
    if (!authLoading && !isAdmin) {
      navigate('/')
    }
  }, [isAdmin, authLoading, navigate])

  // Memoize loadData to use it in real-time subscription
  const loadData = useCallback(async () => {
    try {
      console.log('📊 [Admin] Loading dashboard data...')
      const [subsData, finStats] = await Promise.all([
        insuranceService.getAllSubscriptions(),
        financeService.getFinancialStats()
      ])
      console.log(`✅ Loaded ${subsData?.length || 0} subscriptions`)
      console.log('📊 Financial stats:', finStats)
      setSubscriptions(subsData || [])
      setFinancialStats(finStats)
    } catch (error) {
      console.error('❌ Error loading admin data:', error)
      alert(`Failed to load data: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAdmin) {
      loadData()
    }
  }, [isAdmin, loadData])

  // Real-time subscription for live updates
  useEffect(() => {
    if (!isAdmin) return

    console.log('🔴 [Admin] Setting up real-time subscription for subscriptions table...')
    
    const channel = supabase
      .channel('admin-subscriptions-realtime')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'subscriptions'
        },
        (payload) => {
          console.log('📡 [Real-time] Subscription change detected:', payload.eventType)
          // Re-fetch all data to get the enriched version with profiles/policies
          loadData()
        }
      )
      .subscribe((status) => {
        console.log('📡 [Real-time] Subscription status:', status)
      })

    // Cleanup on unmount
    return () => {
      console.log('🔴 [Admin] Cleaning up real-time subscription...')
      supabase.removeChannel(channel)
    }
  }, [isAdmin, loadData])

  // Manual refresh handler
  const handleRefresh = () => {
    setLoading(true)
    loadData()
  }

  // Calculate stats from subscriptions
  const totalRevenue = subscriptions.reduce((sum, s) => sum + Number(s.amount || 0), 0)
  const totalSubscriptions = subscriptions.length

  // --- Prepare Chart Data ---

  // 1. Revenue Trends (Monthly)
  // Group transactions by "MMM yyyy"
  const revenueData = []
  if (financialStats?.transactions) {
     const groups = {}
     financialStats.transactions.forEach(t => {
        if (!t.transaction_date) return
        const date = new Date(t.transaction_date)
        const key = format(date, 'MMM yyyy')
        if (!groups[key]) groups[key] = 0
        groups[key] += Number(t.amount)
     })
     
     // Convert to array
     Object.keys(groups).forEach(key => {
        revenueData.push({ name: key, revenue: groups[key] })
     })
  }

  // 2. Policy Popularity
  // Group subscriptions by policy name
  const policyData = []
  if (subscriptions.length > 0) {
      const groups = {}
      subscriptions.forEach(s => {
          const name = s.policies?.name || 'Unknown'
          if (!groups[name]) groups[name] = 0
          groups[name] += 1
      })
      Object.keys(groups).forEach(key => {
          policyData.push({ name: key, value: groups[key] })
      })
  }


  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(subscriptions.map(s => ({
      ID: s.id,
      Date: s.created_at && !isNaN(new Date(s.created_at).getTime()) ? format(new Date(s.created_at), 'yyyy-MM-dd HH:mm') : 'N/A',
      User: s.profiles?.full_name || 'N/A',
      Email: s.profiles?.email || 'N/A',
      Policy: s.policies?.name || 'N/A',
      Amount: s.amount,
      Frequency: s.frequency,
      Status: s.status
    })))
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Subscriptions Report")
    XLSX.writeFile(wb, "InsurTech_Subscriptions_Report.xlsx")
  }

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text("InsurTech Subscriptions Report", 20, 10)
    
    autoTable(doc, {
      head: [['Date', 'User', 'Policy', 'Amount', 'Frequency', 'Status']],
      body: subscriptions.map(s => [
        s.created_at && !isNaN(new Date(s.created_at).getTime()) ? format(new Date(s.created_at), 'yyyy-MM-dd') : 'N/A',
        s.profiles?.full_name || 'N/A',
        s.policies?.name || 'N/A',
        `$${s.amount}`,
        s.frequency,
        s.status
      ]),
    })
    
    doc.save("InsurTech_Subscriptions_Report.pdf")
  }

  if (authLoading || loading) return <div className="p-8">Loading Admin Dashboard...</div>
  
  if (!isAdmin) return <div className="p-8">Access Denied. Redirecting...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-4">
           <button onClick={handleRefresh} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
             Refresh
           </button>
           <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
             Export Excel
           </button>
           <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
             Export PDF
           </button>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Legend />
                        <Bar dataKey="revenue" fill="#4F46E5" name="Revenue" />
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* Policy Distribution Chart */}
          <div className="bg-white p-6 shadow rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Most Popular Policies</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={policyData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {policyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
              </div>
          </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
             <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
             <dd className="mt-1 text-3xl font-semibold text-gray-900">${totalRevenue.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
             <dt className="text-sm font-medium text-gray-500 truncate">Total Subscriptions</dt>
             <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalSubscriptions}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg flex items-center justify-center p-6">
           <Link to="/admin/claims" className="text-blue-600 font-medium hover:underline">
             Manage Claims &rarr;
           </Link>
        </div>
      </div>

      {/* Recent Subscriptions */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Subscriptions (Policy Purchases)</h3>
        </div>
        <div className="border-t border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptions.slice(0, 15).map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {s.created_at && !isNaN(new Date(s.created_at).getTime()) ? format(new Date(s.created_at), 'MMM dd, yyyy') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {s.profiles?.full_name || 'Unknown'}
                    <div className="text-xs text-gray-500">{s.profiles?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {s.policies?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    ${s.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${s.status === 'active' ? 'bg-green-100 text-green-800' : 
                        s.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => setSelectedSubscription(s)}
                      className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {subscriptions.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No subscriptions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Detail Modal */}
      {selectedSubscription && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Subscription Details</h2>
                  <p className="text-blue-100 text-sm">ID: {selectedSubscription.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedSubscription(null)} 
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Customer Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span>
                    <p className="font-medium">{selectedSubscription.profiles?.full_name || 'Unknown'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium">{selectedSubscription.profiles?.email || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Policy Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Policy Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Policy:</span>
                    <p className="font-medium">{selectedSubscription.policies?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Frequency:</span>
                    <p className="font-medium capitalize">{selectedSubscription.frequency}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Premium Amount:</span>
                    <p className="font-bold text-blue-600">${selectedSubscription.amount}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <p>
                      <span className={`px-2 py-1 rounded text-xs font-medium 
                        ${selectedSubscription.status === 'active' ? 'bg-green-100 text-green-800' : 
                          selectedSubscription.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {selectedSubscription.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Created:</span>
                    <p className="font-medium">
                      {selectedSubscription.created_at ? format(new Date(selectedSubscription.created_at), 'MMM dd, yyyy HH:mm') : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Next Payment:</span>
                    <p className="font-medium">
                      {selectedSubscription.next_payment_date ? format(new Date(selectedSubscription.next_payment_date), 'MMM dd, yyyy') : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Health Assessment */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Health Assessment
                </h3>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Date of Birth:</span>
                      <p className="font-medium">
                        {selectedSubscription.dob ? format(new Date(selectedSubscription.dob), 'MMM dd, yyyy') : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Health Status:</span>
                      <p>
                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize
                          ${selectedSubscription.health_status === 'excellent' ? 'bg-green-100 text-green-800' : 
                            selectedSubscription.health_status === 'good' ? 'bg-blue-100 text-blue-800' : 
                            selectedSubscription.health_status === 'fair' ? 'bg-yellow-100 text-yellow-800' : 
                            selectedSubscription.health_status === 'preexisting' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-600'}`}>
                          {selectedSubscription.health_status || 'Not provided'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Smoking Status:</span>
                      <p>
                        {selectedSubscription.is_smoker !== null && selectedSubscription.is_smoker !== undefined ? (
                          selectedSubscription.is_smoker ? (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">Smoker</span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">Non-Smoker</span>
                          )
                        ) : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Medical Document:</span>
                      <p>
                        {selectedSubscription.medical_document_url ? (
                          <a 
                            href={selectedSubscription.medical_document_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Document
                          </a>
                        ) : (
                          <span className="text-gray-400">Not uploaded</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end">
              <button
                onClick={() => setSelectedSubscription(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
