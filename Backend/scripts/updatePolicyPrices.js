const supabase = require('../config/supabase')

// Policy pricing configuration based on plan type (in MMK)
// These prices are typical for Myanmar insurance market
const policyPricing = {
  // Life Insurance Plans
  'Term Life Insurance': { premium: 350000, coverage: 50000000 },
  'Whole Life Insurance': { premium: 550000, coverage: 75000000 },
  'Life Insurance': { premium: 450000, coverage: 60000000 },
  
  // Health Insurance Plans
  'Health Insurance': { premium: 280000, coverage: 30000000 },
  'Medical Insurance': { premium: 320000, coverage: 40000000 },
  'Critical Illness Insurance': { premium: 420000, coverage: 50000000 },
  'Dental Insurance': { premium: 120000, coverage: 5000000 },
  'Vision Insurance': { premium: 95000, coverage: 3000000 },
  
  // Auto Insurance Plans
  'Auto Insurance': { premium: 180000, coverage: 25000000 },
  'Car Insurance': { premium: 200000, coverage: 30000000 },
  'Vehicle Insurance': { premium: 175000, coverage: 20000000 },
  'Motor Insurance': { premium: 165000, coverage: 15000000 },
  
  // Property Insurance Plans
  'Home Insurance': { premium: 250000, coverage: 100000000 },
  'Property Insurance': { premium: 300000, coverage: 150000000 },
  'House Insurance': { premium: 275000, coverage: 120000000 },
  'Renters Insurance': { premium: 85000, coverage: 10000000 },
  'Apartment Insurance': { premium: 95000, coverage: 15000000 },
  
  // General Insurance Plans
  'Travel Insurance': { premium: 75000, coverage: 20000000 },
  'Business Insurance': { premium: 650000, coverage: 200000000 },
  'Commercial Insurance': { premium: 750000, coverage: 250000000 },
  'Liability Insurance': { premium: 380000, coverage: 75000000 },
  'Umbrella Insurance': { premium: 420000, coverage: 100000000 },
  'Disability Insurance': { premium: 320000, coverage: 40000000 },
}

// Function to find the best matching price for a policy name
function getPricingForPolicy(policyName) {
  const name = policyName.toLowerCase()
  
  // Try exact match first
  for (const [key, value] of Object.entries(policyPricing)) {
    if (key.toLowerCase() === name) {
      return value
    }
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(policyPricing)) {
    if (name.includes(key.toLowerCase()) || key.toLowerCase().includes(name)) {
      return value
    }
  }
  
  // Default pricing based on category detection
  if (name.includes('life') || name.includes('term') || name.includes('whole')) {
    return { premium: 400000, coverage: 55000000 }
  }
  if (name.includes('health') || name.includes('medical')) {
    return { premium: 300000, coverage: 35000000 }
  }
  if (name.includes('auto') || name.includes('car') || name.includes('vehicle') || name.includes('motor')) {
    return { premium: 180000, coverage: 22000000 }
  }
  if (name.includes('home') || name.includes('property') || name.includes('house')) {
    return { premium: 260000, coverage: 110000000 }
  }
  if (name.includes('travel')) {
    return { premium: 75000, coverage: 20000000 }
  }
  if (name.includes('business') || name.includes('commercial')) {
    return { premium: 700000, coverage: 225000000 }
  }
  
  // Fallback - Generate varied price based on name hash
  // This ensures different policies get different prices
  let hash = 0
  for (let i = 0; i < policyName.length; i++) {
    hash = ((hash << 5) - hash) + policyName.charCodeAt(i)
    hash = hash & hash
  }
  const variation = Math.abs(hash % 400000)
  return { 
    premium: 200000 + variation, 
    coverage: (20 + (variation / 10000)) * 1000000 
  }
}

async function updatePolicyPrices() {
  console.log('🔄 Fetching all policies...')
  
  try {
    // Fetch all policies
    const { data: policies, error: fetchError } = await supabase
      .from('policies')
      .select('*')
    
    if (fetchError) {
      console.error('❌ Error fetching policies:', fetchError)
      return
    }
    
    console.log(`📋 Found ${policies.length} policies to update\n`)
    
    // Update each policy with varied pricing
    for (const policy of policies) {
      const pricing = getPricingForPolicy(policy.name)
      
      console.log(`📝 Updating: ${policy.name}`)
      console.log(`   Old: ${policy.base_annual_premium} MMK | Coverage: ${policy.coverage_amount}`)
      console.log(`   New: ${pricing.premium} MMK | Coverage: ${pricing.coverage}`)
      
      const { error: updateError } = await supabase
        .from('policies')
        .update({ 
          base_annual_premium: pricing.premium,
          coverage_amount: pricing.coverage 
        })
        .eq('id', policy.id)
      
      if (updateError) {
        console.error(`   ❌ Error updating ${policy.name}:`, updateError.message)
      } else {
        console.log(`   ✅ Updated successfully\n`)
      }
    }
    
    console.log('🎉 All policy prices have been varied!')
    console.log('\n📊 Summary of pricing tiers:')
    console.log('   Life Insurance: 350,000 - 550,000 MMK/year')
    console.log('   Health Insurance: 95,000 - 420,000 MMK/year')
    console.log('   Auto Insurance: 165,000 - 200,000 MMK/year')
    console.log('   Property Insurance: 85,000 - 300,000 MMK/year')
    console.log('   General Insurance: 75,000 - 750,000 MMK/year')
    
  } catch (error) {
    console.error('❌ Script error:', error)
  }
}

// Run the script
updatePolicyPrices()
