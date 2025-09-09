// Handle email signup form
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const formMessage = document.getElementById('formMessage');

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            if (email) {
                formMessage.textContent = '🎉 Thank you! We\'ll notify you when we launch!';
                formMessage.style.color = '#2b886b';
                document.getElementById('email').value = '';
            }
        });
    }
});