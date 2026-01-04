import { useEffect, useState } from 'react'
import { insuranceService } from '../../services/insuranceService'
import { supabase } from '../../lib/supabase'

export default function PolicyManager() {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPolicies()
  }, [])

  const loadPolicies = async () => {
    try {
      const data = await insuranceService.getPolicies()
      setPolicies(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure? This will hide the policy from new customers.')) return;
    
    // In a real app we might soft-delete. Here we'll try hard delete but it might fail if referenced.
    // Ideally we should just add a 'active' flag to policies. 
    // For now, let's just alert that this feature requires schema update for soft delete or cascading.
    
    try {
        const { error } = await supabase.from('policies').delete().eq('id', id)
        if (error) throw error
        loadPolicies()
    } catch (error) {
        alert('Cannot delete policy: It likely has active subscriptions. (Feature limitation in demo)')
    }
  } 

  // Basic "Add Policy" stub
  const handleAdd = async () => {
      const name = prompt('Policy Name:')
      if (!name) return
      const premium = prompt('Annual Premium:')
      if (!premium) return

      try {
          const { error } = await supabase.from('policies').insert([{
              name,
              base_annual_premium: premium,
              description: 'New policy added by admin',
              coverage_amount: 50000 
          }])
          if (error) throw error
          loadPolicies()
      } catch (error) {
          alert(error.message)
      }
  }

  if (loading) return <div className="p-8">Loading Policies...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Policies</h1>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add New Policy
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {policies.map((policy) => (
            <li key={policy.id} className="px-4 py-4 flex items-center justify-between sm:px-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{policy.name}</h3>
                <p className="text-sm text-gray-500">{policy.description}</p>
                <p className="text-sm font-bold mt-1">${policy.base_annual_premium} / year</p>
              </div>
              <button 
                onClick={() => handleDelete(policy.id)}
                className="text-red-600 hover:text-red-900 text-sm font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
