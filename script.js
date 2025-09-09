// Pet-Friendly Meetup - Email Signup Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('formMessage');

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showMessage('Please enter your email address.', 'error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate successful signup
            showMessage('Thank you! We\'ll notify you when we launch! 🐾', 'success');
            emailInput.value = '';
            
            // In a real application, you would send this data to a server
            console.log('Email signup:', email);
        });
    }
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.style.color = type === 'success' ? '#2b886b' : '#ff4f4f';
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    }
});