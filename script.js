// ==========================================
// SUPABASE CONFIGURATION
// ==========================================
// নিচের দুইটা লাইনে আপনার Supabase প্রজেক্টের তথ্য বসাবেন (ধাপ ৩ দেখুন)
const SUPABASE_URL = 'https://czjsvyyihbafizyzvdnh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8ZRafqmUlliQcLBluyu1CQ_WB2Fa';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Contact Form Submission handler
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    formStatus.style.color = '#6366f1';
    formStatus.textContent = 'Sending your message...';

    try {
        const { data, error } = await supabaseClient
            .from('contacts')
            .insert([{ name, email, message }]);

        if (error) throw error;

        formStatus.style.color = '#10b981';
        formStatus.textContent = 'Message sent successfully! Thank you.';
        contactForm.reset();
    } catch (err) {
        console.error('Error:', err);
        formStatus.style.color = '#ef4444';
        formStatus.textContent = 'Failed to send message. Please try again.';
    }
});