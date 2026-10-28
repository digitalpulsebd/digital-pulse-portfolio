const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const organization = document.getElementById('organization').value;
    const serviceType = document.getElementById('serviceType').value;
    const message = document.getElementById('message').value;

    formStatus.style.color = '#7c3aed';
    formStatus.textContent = 'Sending your message...';

    try {
        const { data, error } = await supabaseClient
            .from('contacts') // Supabase table name
            .insert([{ name, email, mobile, organization, service_type: serviceType, message }]);

        if (error) throw error;

        formStatus.style.color = '#10b981';
        formStatus.textContent = 'Message sent successfully!';
        contactForm.reset();
    } catch (error) {
        formStatus.style.color = '#ef4444';
        formStatus.textContent = 'Error sending message. Please try again.';
        console.error('Error:', error.message);
    }
});
