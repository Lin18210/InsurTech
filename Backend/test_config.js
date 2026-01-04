const supabase = require('./config/supabase');

async function test() {
    console.log('--- Testing Config/Supabase ---');
    try {
        const { count, error } = await supabase
            .from('subscriptions')
            .select('*', { count: 'exact', head: true });
            
        if (error) {
            console.error('Error:', error.message);
        } else {
            console.log('Total subscriptions found:', count);
        }
    } catch (e) {
        console.error('Crash:', e.message);
    }
}

test();
