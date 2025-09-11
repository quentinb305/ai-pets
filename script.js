// Handle email signup form
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle functionality
    const petOwnerBtn = document.getElementById('petOwnerBtn');
    const venueOwnerBtn = document.getElementById('venueOwnerBtn');
    const petOwnerContent = document.getElementById('petOwnerContent');
    const venueOwnerContent = document.getElementById('venueOwnerContent');
    
    petOwnerBtn.addEventListener('click', function() {
        petOwnerBtn.classList.add('active');
        venueOwnerBtn.classList.remove('active');
        petOwnerContent.style.display = 'block';
        venueOwnerContent.style.display = 'none';
    });
    
    venueOwnerBtn.addEventListener('click', function() {
        venueOwnerBtn.classList.add('active');
        petOwnerBtn.classList.remove('active');
        venueOwnerContent.style.display = 'block';
        petOwnerContent.style.display = 'none';
    });

    // Pet owner signup form
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

    // Venue owner signup form
    const venueSignupForm = document.getElementById('venueSignupForm');
    const venueFormMessage = document.getElementById('venueFormMessage');

    if (venueSignupForm) {
        venueSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('venueEmail').value;
            
            if (email) {
                venueFormMessage.textContent = '🎉 Welcome! Let\'s get your venue registered!';
                venueFormMessage.style.color = '#2b886b';
                document.getElementById('venueEmail').value = '';
                
                // Scroll to venue registration form
                document.getElementById('venueProfileForm').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Venue profile form handling
    const venueProfileForm = document.getElementById('venueProfileForm');
    const venueProfileDisplay = document.getElementById('venueProfileDisplay');
    const editVenueBtn = document.getElementById('editVenueBtn');
    const venueDashboardBtn = document.getElementById('venueDashboardBtn');
    const venueDashboard = document.getElementById('venueDashboard');
    const backToProfileBtn = document.getElementById('backToProfileBtn');

    if (venueProfileForm) {
        venueProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const venueData = {
                name: document.getElementById('venueName').value,
                type: document.getElementById('venueType').value,
                address: document.getElementById('venueAddress').value,
                phone: document.getElementById('venuePhone').value,
                description: document.getElementById('venueDescription').value
            };

            if (venueData.name) {
                displayVenueProfile(venueData);
                venueProfileForm.style.display = 'none';
                venueProfileDisplay.style.display = 'block';
                
                // Save to localStorage
                localStorage.setItem('venueProfile', JSON.stringify(venueData));
            }
        });
    }

    if (editVenueBtn) {
        editVenueBtn.addEventListener('click', function() {
            venueProfileForm.style.display = 'block';
            venueProfileDisplay.style.display = 'none';
            venueDashboard.style.display = 'none';
        });
    }

    if (venueDashboardBtn) {
        venueDashboardBtn.addEventListener('click', function() {
            venueProfileDisplay.style.display = 'none';
            venueDashboard.style.display = 'block';
            
            // Update dashboard with venue name
            const venueProfile = localStorage.getItem('venueProfile');
            if (venueProfile) {
                const venueData = JSON.parse(venueProfile);
                document.getElementById('dashboardVenueName').textContent = venueData.name;
            }
        });
    }

    if (backToProfileBtn) {
        backToProfileBtn.addEventListener('click', function() {
            venueDashboard.style.display = 'none';
            venueProfileDisplay.style.display = 'block';
        });
    }

    // Load existing venue profile if available
    const savedVenueProfile = localStorage.getItem('venueProfile');
    if (savedVenueProfile) {
        const venueData = JSON.parse(savedVenueProfile);
        populateVenueForm(venueData);
        displayVenueProfile(venueData);
        venueProfileForm.style.display = 'none';
        venueProfileDisplay.style.display = 'block';
    }

    function displayVenueProfile(venueData) {
        const venueAvatar = document.getElementById('venueAvatar');
        const displayVenueName = document.getElementById('displayVenueName');
        const displayVenueDetails = document.getElementById('displayVenueDetails');
        const displayVenueDescription = document.getElementById('displayVenueDescription');

        // Set avatar based on venue type
        const avatars = {
            'cafe': '☕',
            'park': '🌳',
            'store': '🛍️',
            'hotel': '🏨',
            'grooming': '✂️',
            'vet': '🏥',
            'other': '🏢'
        };
        
        venueAvatar.textContent = avatars[venueData.type] || '🏢';
        displayVenueName.textContent = venueData.name;
        
        let details = [];
        if (venueData.address) details.push(venueData.address);
        if (venueData.phone) details.push(venueData.phone);
        displayVenueDetails.textContent = details.join(' • ');
        
        displayVenueDescription.textContent = venueData.description || 'A wonderful pet-friendly venue! 🐾';
    }

    function populateVenueForm(venueData) {
        document.getElementById('venueName').value = venueData.name || '';
        document.getElementById('venueType').value = venueData.type || 'cafe';
        document.getElementById('venueAddress').value = venueData.address || '';
        document.getElementById('venuePhone').value = venueData.phone || '';
        document.getElementById('venueDescription').value = venueData.description || '';
    }
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
});