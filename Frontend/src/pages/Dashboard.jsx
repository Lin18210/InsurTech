import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { insuranceService } from '../services/insuranceService'
import { financeService } from '../services/financeService'
import { generatePolicyPDF } from '../utils/pdfGenerator'
import { format } from 'date-fns'

export default function CustomerDashboard() {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      const [subs, trans] = await Promise.all([
        insuranceService.getUserSubscriptions(user.id),
        financeService.getUserTransactions(user.id)
      ])
      setSubscriptions(subs || [])
      setTransactions(Array.isArray(trans) ? trans : [])
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8">Loading dashboard...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Dashboard</h1>

      {/* Active Policies Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Policies</h2>
        {subscriptions.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-gray-500">
            No active policies found. <a href="/products" className="text-blue-600 hover:text-blue-500">Browse Plans</a>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {subscriptions.map((sub) => (
                <li key={sub.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{sub.policies?.name}</h3>
                      <p className="text-sm text-gray-500">Coverage: ${sub.policies?.coverage_amount?.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block">
                        {sub.status.toUpperCase()}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Next Payment: {sub.next_payment_date && !isNaN(new Date(sub.next_payment_date).getTime()) ? format(new Date(sub.next_payment_date), 'MMM dd, yyyy') : 'TBD'}
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        ${sub.amount} / {sub.frequency}
                      </p>
                      <button 
                        onClick={() => generatePolicyPDF({
                            userName: user?.user_metadata?.full_name || user?.email, // Fallback logic
                            userEmail: user?.email,
                            policy: sub.policies,
                            subscription: sub
                        })}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline flex items-center justify-end w-full"
                      >
                         Download Certificate
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Transaction History Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h2>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((t) => (
                      <tr key={t.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {t.created_at && !isNaN(new Date(t.created_at).getTime()) 
                            ? format(new Date(t.created_at), 'MMM dd, yyyy HH:mm') 
                            : 'Invalid Date'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {t.description}
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {t.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                          ${t.amount}
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No transactions found</td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
