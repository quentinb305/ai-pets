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

    // Pet profile functionality
    initPetProfiles();
});

// Pet Profile Management
function initPetProfiles() {
    const petProfileForm = document.getElementById('petProfileForm');
    const petFormMessage = document.getElementById('petFormMessage');
    
    if (petProfileForm) {
        petProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePetProfileSubmission();
        });
    }
    
    // Load and display existing profiles
    displayPetProfiles();
}

function handlePetProfileSubmission() {
    const form = document.getElementById('petProfileForm');
    const formMessage = document.getElementById('petFormMessage');
    
    // Get form data
    const formData = new FormData(form);
    const petProfile = {
        id: Date.now(), // Simple ID generation
        name: formData.get('petName'),
        type: formData.get('petType'),
        breed: formData.get('petBreed') || '',
        age: formData.get('petAge') || '',
        description: formData.get('petDescription') || '',
        temperament: formData.getAll('temperament'),
        createdAt: new Date().toLocaleDateString()
    };
    
    // Validate required fields
    if (!petProfile.name || !petProfile.type) {
        formMessage.textContent = '❌ Please fill in all required fields.';
        formMessage.style.color = '#ff4f4f';
        return;
    }
    
    // Save to localStorage
    savePetProfile(petProfile);
    
    // Show success message
    formMessage.textContent = '🎉 Pet profile created successfully!';
    formMessage.style.color = '#2b886b';
    
    // Reset form
    form.reset();
    
    // Refresh the profiles display
    displayPetProfiles();
    
    // Clear message after 3 seconds
    setTimeout(() => {
        formMessage.textContent = '';
    }, 3000);
}

function savePetProfile(profile) {
    let profiles = getPetProfiles();
    profiles.push(profile);
    localStorage.setItem('petProfiles', JSON.stringify(profiles));
}

function getPetProfiles() {
    const stored = localStorage.getItem('petProfiles');
    return stored ? JSON.parse(stored) : [];
}

function displayPetProfiles() {
    const profilesList = document.getElementById('profilesList');
    const noProfiles = document.getElementById('noProfiles');
    const profiles = getPetProfiles();
    
    if (profiles.length === 0) {
        if (noProfiles) noProfiles.style.display = 'block';
        return;
    }
    
    if (noProfiles) noProfiles.style.display = 'none';
    
    const profilesHTML = profiles.map(profile => `
        <div class="pet-card">
            <h4>${escapeHtml(profile.name)} ${getPetTypeEmoji(profile.type)}</h4>
            <div class="pet-type">${formatPetType(profile.type)}</div>
            <div class="pet-details">
                ${profile.breed ? `<strong>Breed:</strong> ${escapeHtml(profile.breed)}<br>` : ''}
                ${profile.age ? `<strong>Age:</strong> ${escapeHtml(profile.age)}<br>` : ''}
                ${profile.description ? `<strong>About:</strong> ${escapeHtml(profile.description)}<br>` : ''}
                <strong>Created:</strong> ${profile.createdAt}
            </div>
            ${profile.temperament && profile.temperament.length > 0 ? `
                <div class="pet-temperament">
                    ${profile.temperament.map(trait => `<span class="temperament-tag">${escapeHtml(trait)}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    if (profilesList) {
        profilesList.innerHTML = profilesHTML;
    }
}

function getPetTypeEmoji(type) {
    const emojis = {
        'dog': '🐶',
        'cat': '🐱',
        'bird': '🐦',
        'rabbit': '🐰',
        'hamster': '🐹',
        'fish': '🐠',
        'reptile': '🦎',
        'other': '🐾'
    };
    return emojis[type] || '🐾';
}

function formatPetType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}