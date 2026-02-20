require('dotenv').config()
const express = require('express')
const cors = require('cors')
const supabase = require('./config/supabase')

const authRoutes = require('./routes/authRoutes')
const claimsRoutes = require('./routes/claimsRoutes')
const insuranceRoutes = require('./routes/insuranceRoutes')
const financeRoutes = require('./routes/financeRoutes')
const emailRoutes = require('./routes/emailRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/claims', claimsRoutes)
app.use('/api/insurance', insuranceRoutes)
app.use('/api/finance', financeRoutes)
app.use('/api/email', emailRoutes)

// Test Route
app.get('/', (req, res) => {
  res.send('InsurTech API is running...')
})

// Debug endpoint - Check database connection and data
app.get('/api/debug/status', async (req, res) => {
  try {
    const { count: subCount, error: subError } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })

    const { count: txCount, error: txError } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })

    const { count: policyCount, error: policyError } = await supabase
      .from('policies')
      .select('*', { count: 'exact', head: true })

    res.json({
      status: 'ok',
      database: {
        subscriptions: subCount || 0,
        subscriptions_error: subError?.message,
        transactions: txCount || 0,
        transactions_error: txError?.message,
        policies: policyCount || 0,
        policies_error: policyError?.message,
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
