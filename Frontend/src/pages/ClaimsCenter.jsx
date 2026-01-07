import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { claimsService } from '../services/claimsService'
import { insuranceService } from '../services/insuranceService'
import { format } from 'date-fns'
import { supabase } from '../lib/supabase'

export default function ClaimsCenter() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('list') // 'list' or 'new'
  const [claims, setClaims] = useState([])
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)

  // Form State
  const [selectedPolicy, setSelectedPolicy] = useState('')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      const [userClaims, userSubs] = await Promise.all([
        claimsService.getUserClaims(user.id),
        insuranceService.getUserSubscriptions(user.id)
      ])
      setClaims(userClaims)
      setPolicies(userSubs.filter(sub => sub.status === 'active'))
    } catch (error) {
      console.error('Error loading claims data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const sub = policies.find(p => p.policy_id === selectedPolicy)
      if (!sub) return alert('Invalid policy selected')

      let documentUrl = null

      // Upload File if exists
      if (file) {
        setUploading(true)
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${user.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('claim-documents')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('claim-documents')
          .getPublicUrl(filePath)
          
        documentUrl = publicUrl
        setUploading(false)
      }

      await claimsService.submitClaim({
        userId: user.id,
        policyId: sub.policy_id, 
        amount,
        reason,
        description,
        documentUrl
      })
      
      alert('Claim submitted successfully!')
      setActiveTab('list')
      loadData() 
      
      // Reset form
      setAmount('')
      setReason('')
      setDescription('')
      setSelectedPolicy('')
      setFile(null)
    } catch (error) {
      setUploading(false)
      alert('Error submitting claim: ' + error.message)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Claims Center</h1>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
              activeTab === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            My Claims
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
              activeTab === 'new' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            File New Claim
          </button>
        </div>
      </div>

      {activeTab === 'list' ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
           <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claims.map((claim) => (
                <tr key={claim.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(claim.created_at), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {claim.policies?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {claim.reason}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${claim.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${claim.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        claim.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))}
              {claims.length === 0 && (
                <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No claims found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white shadow sm:rounded-lg max-w-2xl mx-auto">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Submit an Insurance Claim</h3>
            <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Policy</label>
                <select
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={selectedPolicy}
                  onChange={(e) => setSelectedPolicy(e.target.value)}
                >
                  <option value="">-- Choose a policy --</option>
                  {policies.map(p => (
                    <option key={p.id} value={p.policy_id}>{p.policies?.name} (Sub ID: {p.id.slice(0,8)}...)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Claim Amount ($)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Reason</label>
                <input
                  type="text"
                  required
                  className="mt-1 sticky block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Car Accident, Medical Emergency"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={4}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about the incident..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Supporting Document (Image/PDF)</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  disabled={uploading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Submit Claim'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
