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

    // Pet Profile functionality
    initializePetProfiles();
});

// Pet Profile Management
function initializePetProfiles() {
    const petForm = document.getElementById('petForm');
    const petFormMessage = document.getElementById('petFormMessage');
    
    if (petForm) {
        petForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addPetProfile();
        });
    }
    
    // Load existing pet profiles
    loadPetProfiles();
}

function addPetProfile() {
    const form = document.getElementById('petForm');
    const formMessage = document.getElementById('petFormMessage');
    
    // Get form data
    const petData = {
        id: Date.now().toString(), // Simple ID generation
        name: form.petName.value.trim(),
        type: form.petType.value,
        breed: form.petBreed.value.trim(),
        age: form.petAge.value.trim(),
        description: form.petDescription.value.trim()
    };
    
    // Validate required fields
    if (!petData.name || !petData.type) {
        formMessage.textContent = '❌ Please fill in pet name and type';
        formMessage.style.color = '#ff4f4f';
        return;
    }
    
    // Get existing profiles
    let petProfiles = JSON.parse(localStorage.getItem('petProfiles') || '[]');
    
    // Add new profile
    petProfiles.push(petData);
    
    // Save to localStorage
    localStorage.setItem('petProfiles', JSON.stringify(petProfiles));
    
    // Show success message
    formMessage.textContent = '🎉 Pet profile added successfully!';
    formMessage.style.color = '#2b886b';
    
    // Clear form
    form.reset();
    
    // Reload profiles display
    loadPetProfiles();
}

function loadPetProfiles() {
    const profilesList = document.getElementById('petProfilesList');
    const petProfiles = JSON.parse(localStorage.getItem('petProfiles') || '[]');
    
    if (petProfiles.length === 0) {
        profilesList.innerHTML = `
            <div class="no-pets-message">
                <span class="pet-icon">🐾</span>
                <p>No pet profiles yet. Create your first one!</p>
            </div>
        `;
        return;
    }
    
    // Generate HTML for pet profiles
    const profilesHTML = petProfiles.map(pet => createPetCard(pet)).join('');
    profilesList.innerHTML = profilesHTML;
    
    // Add event listeners for delete buttons
    profilesList.querySelectorAll('.delete-pet-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const petId = this.getAttribute('data-pet-id');
            deletePetProfile(petId);
        });
    });
}

function createPetCard(pet) {
    const typeIcons = {
        'dog': '🐶',
        'cat': '🐱',
        'bird': '🐦',
        'rabbit': '🐰',
        'other': '🐾'
    };
    
    const icon = typeIcons[pet.type] || '🐾';
    const breedAge = [pet.breed, pet.age].filter(Boolean).join(', ');
    
    return `
        <div class="pet-card">
            <div class="pet-card-header">
                <span class="pet-type-icon">${icon}</span>
                <div class="pet-card-title">
                    <h4>${escapeHtml(pet.name)}</h4>
                    ${breedAge ? `<div class="pet-breed-age">${escapeHtml(breedAge)}</div>` : ''}
                </div>
            </div>
            ${pet.description ? `<div class="pet-description">${escapeHtml(pet.description)}</div>` : ''}
            <div class="pet-card-actions">
                <button class="delete-pet-btn" data-pet-id="${pet.id}" title="Delete pet profile">×</button>
            </div>
        </div>
    `;
}

function deletePetProfile(petId) {
    if (confirm('Are you sure you want to delete this pet profile?')) {
        let petProfiles = JSON.parse(localStorage.getItem('petProfiles') || '[]');
        petProfiles = petProfiles.filter(pet => pet.id !== petId);
        localStorage.setItem('petProfiles', JSON.stringify(petProfiles));
        loadPetProfiles();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}