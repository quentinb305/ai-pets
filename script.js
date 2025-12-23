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

    // Handle pet profile form
    const petProfileForm = document.getElementById('petProfileForm');
    const petProfileDisplay = document.getElementById('petProfileDisplay');
    const editProfileBtn = document.getElementById('editProfileBtn');

    if (petProfileForm) {
        petProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const petData = {
                name: document.getElementById('petName').value,
                breed: document.getElementById('petBreed').value,
                age: document.getElementById('petAge').value,
                type: document.getElementById('petType').value,
                personality: document.getElementById('petPersonality').value
            };

            if (petData.name) {
                displayPetProfile(petData);
                petProfileForm.style.display = 'none';
                petProfileDisplay.style.display = 'block';
                
                // Save to localStorage
                localStorage.setItem('petProfile', JSON.stringify(petData));
            }
        });
    }

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            petProfileForm.style.display = 'block';
            petProfileDisplay.style.display = 'none';
        });
    }

    // Load existing pet profile if available
    const savedProfile = localStorage.getItem('petProfile');
    if (savedProfile) {
        const petData = JSON.parse(savedProfile);
        populateForm(petData);
        displayPetProfile(petData);
        petProfileForm.style.display = 'none';
        petProfileDisplay.style.display = 'block';
    }

    function displayPetProfile(petData) {
        const petAvatar = document.getElementById('petAvatar');
        const displayPetName = document.getElementById('displayPetName');
        const displayPetDetails = document.getElementById('displayPetDetails');
        const displayPetPersonality = document.getElementById('displayPetPersonality');

        // Set avatar based on pet type
        const avatars = {
            'dog': '🐶',
            'cat': '🐱',
            'bird': '🐦',
            'rabbit': '🐰',
            'other': '🐾'
        };
        
        petAvatar.textContent = avatars[petData.type] || '🐾';
        displayPetName.textContent = petData.name;
        
        let details = [];
        if (petData.breed) details.push(petData.breed);
        if (petData.age) details.push(petData.age);
        displayPetDetails.textContent = details.join(' • ');
        
        displayPetPersonality.textContent = petData.personality || 'This pet is special and unique! 🌟';
    }

    function populateForm(petData) {
        document.getElementById('petName').value = petData.name || '';
        document.getElementById('petBreed').value = petData.breed || '';
        document.getElementById('petAge').value = petData.age || '';
        document.getElementById('petType').value = petData.type || 'dog';
        document.getElementById('petPersonality').value = petData.personality || '';
    }

    // Handle share profile functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('share-profile-btn')) {
            const petProfile = localStorage.getItem('petProfile');
            if (petProfile) {
                const petData = JSON.parse(petProfile);
                const shareText = `Check out my pet ${petData.name}! ${petData.breed ? petData.breed + ', ' : ''}${petData.age || 'Age unknown'}. ${petData.personality}`;
                
                if (navigator.share) {
                    navigator.share({
                        title: `Meet ${petData.name}!`,
                        text: shareText,
                        url: window.location.href
                    });
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(shareText).then(() => {
                        alert('Pet profile copied to clipboard! 🐾');
                    });
                }
            }
        }
    });

    // Handle feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackDisplay = document.getElementById('feedbackDisplay');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const newFeedbackBtn = document.getElementById('newFeedbackBtn');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const feedbackData = {
                type: document.getElementById('feedbackType').value,
                email: document.getElementById('feedbackEmail').value,
                title: document.getElementById('feedbackTitle').value,
                details: document.getElementById('feedbackDetails').value,
                timestamp: new Date().toISOString()
            };

            if (feedbackData.type && feedbackData.title && feedbackData.details) {
                // Save feedback to localStorage
                saveFeedback(feedbackData);
                
                // Display success message
                displayFeedbackSuccess(feedbackData);
                feedbackForm.style.display = 'none';
                feedbackDisplay.style.display = 'block';
                
                // Clear form
                feedbackForm.reset();
                feedbackMessage.textContent = '';
            } else {
                feedbackMessage.textContent = 'Please fill in all required fields.';
                feedbackMessage.style.color = '#ff4f4f';
            }
        });
    }

    if (newFeedbackBtn) {
        newFeedbackBtn.addEventListener('click', function() {
            feedbackForm.style.display = 'block';
            feedbackDisplay.style.display = 'none';
        });
    }

    function saveFeedback(feedbackData) {
        // Get existing feedback from localStorage
        let existingFeedback = localStorage.getItem('userFeedback');
        let feedbackList = existingFeedback ? JSON.parse(existingFeedback) : [];
        
        // Add new feedback
        feedbackList.push(feedbackData);
        
        // Save back to localStorage
        localStorage.setItem('userFeedback', JSON.stringify(feedbackList));
    }

    function displayFeedbackSuccess(feedbackData) {
        const submittedFeedback = document.getElementById('submittedFeedback');
        if (submittedFeedback) {
            const typeLabels = {
                'bug': '🐛 Bug Report',
                'feature': '💡 Feature Request',
                'improvement': '⚡ Improvement Suggestion',
                'question': '❓ Question',
                'other': '💬 Other'
            };

            submittedFeedback.innerHTML = `
                <span class="feedback-type">${typeLabels[feedbackData.type] || feedbackData.type}</span>
                <h4>${feedbackData.title}</h4>
                <p><strong>Details:</strong> ${feedbackData.details}</p>
                ${feedbackData.email ? `<p><strong>Contact:</strong> ${feedbackData.email}</p>` : ''}
                <p><strong>Submitted:</strong> ${new Date(feedbackData.timestamp).toLocaleString()}</p>
            `;
        }
    }
});