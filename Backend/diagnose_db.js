require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', supabaseUrl ? 'Defined' : 'Missing');
console.log('Service Key:', supabaseKey ? 'Defined' : 'Missing');

if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    supabase.from('subscriptions')
        .select('id, user_id, profiles(full_name)')
        .then(({ data, error }) => {
            if (error) console.error('Error:', error.message);
            else {
                console.log('--- Subscriptions List ---');
                data.forEach(s => {
                    console.log(`Sub ID: ${s.id} | User ID: ${s.user_id} | Name: ${s.profiles?.full_name || 'N/A'}`);
                });
                console.log('Total:', data.length);
            }
        });
}
