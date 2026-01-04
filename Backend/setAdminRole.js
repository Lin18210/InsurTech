// Script to set user role to admin
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function setAdminRole() {
  try {
    const userId = 'a1788bf3-bce5-4da1-91a0-31741cf7169f' // Dean's user ID
    console.log(`\n🔐 Setting role "admin" for user ${userId}`)
    
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userId)
      .select()
      .single()
    
    if (error) {
      console.error('❌ Error:', error)
      return
    }
    
    console.log('✅ Successfully updated user role to admin')
    console.log('📊 Updated profile:', data)
    console.log('\n✅ Dean can now access the admin dashboard!\n')
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

setAdminRole()
