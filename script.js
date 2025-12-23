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

    // AI Pet Profile Data
    const aiPetData = {
        names: {
            dog: ['Buddy', 'Max', 'Luna', 'Charlie', 'Bella', 'Rocky', 'Daisy', 'Cooper', 'Lucy', 'Duke'],
            cat: ['Whiskers', 'Shadow', 'Luna', 'Oliver', 'Mittens', 'Simba', 'Chloe', 'Tiger', 'Princess', 'Smokey'],
            bird: ['Sunny', 'Rio', 'Kiwi', 'Phoenix', 'Sky', 'Melody', 'Rainbow', 'Echo', 'Chirpy', 'Azure'],
            rabbit: ['Bunny', 'Cotton', 'Snowball', 'Clover', 'Hazel', 'Pepper', 'Cocoa', 'Marshmallow', 'Buttercup', 'Oreo'],
            other: ['Buddy', 'Star', 'Peanut', 'Gizmo', 'Patches', 'Ziggy', 'Mochi', 'Biscuit', 'Pickles', 'Noodle']
        },
        breeds: {
            dog: ['Golden Retriever', 'Labrador', 'German Shepherd', 'Bulldog', 'Beagle', 'Poodle', 'Husky', 'Border Collie'],
            cat: ['Persian', 'Maine Coon', 'Siamese', 'British Shorthair', 'Ragdoll', 'Scottish Fold', 'Russian Blue'],
            bird: ['Parakeet', 'Cockatiel', 'Canary', 'Lovebird', 'Conure', 'Macaw', 'African Grey'],
            rabbit: ['Holland Lop', 'Netherland Dwarf', 'Flemish Giant', 'Angora', 'Rex', 'Mini Rex'],
            other: ['Mixed Breed', 'Rescue', 'Unique Mix']
        },
        personalities: [
            'Playful and energetic, loves running around and playing fetch!',
            'Calm and gentle, perfect cuddle companion for quiet evenings.',
            'Curious and adventurous, always exploring new places and meeting new friends.',
            'Loyal and protective, forms strong bonds with family members.',
            'Intelligent and trainable, loves learning new tricks and commands.',
            'Social butterfly who gets along with everyone they meet.',
            'Independent spirit with a mischievous side and lots of personality.',
            'Affectionate lap pet who loves attention and being pampered.',
            'Active outdoor enthusiast who enjoys hiking and long walks.',
            'Gentle soul with a calm demeanor, great with children and other pets.'
        ],
        colors: ['brown', 'black', 'white', 'golden', 'gray', 'orange', 'mixed'],
        sizes: ['tiny', 'small', 'medium', 'large', 'giant'],
        markings: [
            'white chest and paws',
            'distinctive facial markings',
            'beautiful striped pattern',
            'solid colored with bright eyes',
            'spotted coat with unique patterns',
            'fluffy tail and perky ears',
            'sleek coat with subtle highlights',
            'distinctive collar markings',
            'expressive eyes and gentle face',
            'unique color combinations'
        ],
        ages: ['6 months', '1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years']
    };

    // Generate AI Profile
    function generateAIProfile() {
        const petType = document.getElementById('petType').value || getRandomElement(['dog', 'cat', 'bird', 'rabbit', 'other']);
        
        const profile = {
            name: getRandomElement(aiPetData.names[petType]),
            breed: getRandomElement(aiPetData.breeds[petType]),
            age: getRandomElement(aiPetData.ages),
            type: petType,
            color: getRandomElement(aiPetData.colors),
            size: getRandomElement(aiPetData.sizes),
            markings: getRandomElement(aiPetData.markings),
            personality: getRandomElement(aiPetData.personalities)
        };

        return profile;
    }

    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Handle AI Profile Generation
    const generateAIBtn = document.getElementById('generateAIProfile');
    if (generateAIBtn) {
        generateAIBtn.addEventListener('click', function() {
            const aiProfile = generateAIProfile();
            populateForm(aiProfile);
            
            // Add a brief animation effect
            generateAIBtn.textContent = '✨ Generated!';
            generateAIBtn.style.background = 'linear-gradient(90deg, #2b886b, #7f6cff)';
            
            setTimeout(() => {
                generateAIBtn.textContent = '✨ Generate AI Profile';
                generateAIBtn.style.background = 'linear-gradient(90deg, #7f6cff, #2b886b)';
            }, 2000);
        });
    }

    // Handle pet profile form
    const petProfileForm = document.getElementById('petProfileForm');
    const petProfileDisplay = document.getElementById('petProfileDisplay');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const regenerateProfileBtn = document.getElementById('regenerateProfileBtn');

    if (petProfileForm) {
        petProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const petData = {
                name: document.getElementById('petName').value,
                breed: document.getElementById('petBreed').value,
                age: document.getElementById('petAge').value,
                type: document.getElementById('petType').value,
                color: document.getElementById('petColor').value,
                size: document.getElementById('petSize').value,
                markings: document.getElementById('petMarkings').value,
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

    if (regenerateProfileBtn) {
        regenerateProfileBtn.addEventListener('click', function() {
            const currentName = document.getElementById('displayPetName').textContent;
            const aiProfile = generateAIProfile();
            
            // Keep the current name if user wants
            if (currentName && currentName !== '') {
                aiProfile.name = currentName;
            }
            
            populateForm(aiProfile);
            displayPetProfile(aiProfile);
            localStorage.setItem('petProfile', JSON.stringify(aiProfile));
            
            // Animation feedback
            regenerateProfileBtn.textContent = '✨ Regenerated!';
            setTimeout(() => {
                regenerateProfileBtn.textContent = '✨ Regenerate with AI';
            }, 2000);
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
        const displayAppearance = document.getElementById('displayAppearance');

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
        
        // Display appearance information
        let appearance = [];
        if (petData.color) {
            const colorNames = {
                'brown': 'Brown',
                'black': 'Black', 
                'white': 'White',
                'golden': 'Golden',
                'gray': 'Gray',
                'orange': 'Orange',
                'mixed': 'Mixed colors'
            };
            appearance.push(colorNames[petData.color] || petData.color);
        }
        if (petData.size) {
            const sizeNames = {
                'tiny': 'Tiny',
                'small': 'Small',
                'medium': 'Medium',
                'large': 'Large', 
                'giant': 'Giant'
            };
            appearance.push(sizeNames[petData.size] + ' size');
        }
        if (petData.markings) {
            appearance.push(petData.markings);
        }
        
        if (appearance.length > 0) {
            displayAppearance.textContent = appearance.join(' • ');
            document.getElementById('appearanceDisplay').style.display = 'block';
        } else {
            document.getElementById('appearanceDisplay').style.display = 'none';
        }
        
        displayPetPersonality.textContent = petData.personality || 'This pet is special and unique! 🌟';
    }

    function populateForm(petData) {
        document.getElementById('petName').value = petData.name || '';
        document.getElementById('petBreed').value = petData.breed || '';
        document.getElementById('petAge').value = petData.age || '';
        document.getElementById('petType').value = petData.type || 'dog';
        document.getElementById('petColor').value = petData.color || '';
        document.getElementById('petSize').value = petData.size || '';
        document.getElementById('petMarkings').value = petData.markings || '';
        document.getElementById('petPersonality').value = petData.personality || '';
    }

    // Handle share profile functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('share-profile-btn')) {
            const petProfile = localStorage.getItem('petProfile');
            if (petProfile) {
                const petData = JSON.parse(petProfile);
                let shareText = `Check out my pet ${petData.name}!`;
                
                if (petData.breed || petData.age) {
                    const details = [];
                    if (petData.breed) details.push(petData.breed);
                    if (petData.age) details.push(petData.age);
                    shareText += ` ${details.join(', ')}.`;
                }
                
                if (petData.personality) {
                    shareText += ` ${petData.personality}`;
                }
                
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