
 // Celestial body data mapping with image sources
        const celestialBodies = {
            'sun': '<div class="celestial-image sun-img"><img src="/img/sun.png" alt="Sun" data-celestial="sun"></div>',
            'earth': '<div class="celestial-image earth-img"><img src="/img/earth.png" alt="Earth" data-celestial="earth"></div>',
            'jupiter': '<div class="celestial-image jupiter-img"><img src="/img/jupiter.png" alt="Jupiter" data-celestial="jupiter"></div>',
            'mars': '<div class="celestial-image mars-img"><img src="/img/mars.png" alt="Mars" data-celestial="mars"></div>',
            'moon': '<div class="celestial-image moon-img"><img src="/img/moon.png" alt="Moon" data-celestial="moon"></div>'
        };

        // Get DOM elements
        const buttons = document.querySelectorAll('.nav-button[data-section]');
        const contentWrapper = document.querySelector('.content-wrapper');
        const sections = document.querySelectorAll('.content-section');
        const celestialBody = document.getElementById('celestialBody');
        const contentArea = document.querySelector('.content-area');

        let currentSection = 0;

        // Change celestial body function
        function changeCelestialBody(bodyType) {
            if (!celestialBodies[bodyType]) return;
            
            celestialBody.innerHTML = celestialBodies[bodyType];
            
            // Activate the new image immediately
            const newImage = celestialBody.querySelector('img');
            if (newImage) newImage.classList.add('active');
        }

        // Check if Team section needs scrolling
        function checkScrollForTeamSection(activeIndex) {
            contentArea.classList.remove('needs-scroll');
            
            // Only apply scroll to Team section (index 2)
            if (activeIndex === 2) {
                setTimeout(() => {
                    const activeSection = sections[activeIndex];
                    if (activeSection) {
                        const sectionHeight = activeSection.scrollHeight;
                        const containerHeight = contentArea.clientHeight;
                        
                        if (sectionHeight > containerHeight) {
                            contentArea.classList.add('needs-scroll');
                        }
                    }
                }, 50);
            }
        }

        // Activate section function
        function activateSection(index) {
            if (index === currentSection || index < 0 || index >= sections.length) return;
            
            const button = buttons[index];
            if (!button) return;
            
            const celestialType = button.getAttribute('data-celestial');
            
            // Update celestial body
            if (celestialType) changeCelestialBody(celestialType);
            
            // Reset scroll position
            contentArea.scrollTop = 0;
            
            // Remove active state from all sections and buttons
            sections.forEach(section => section.classList.remove('active'));
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Update current section
            currentSection = index;
            
            // Set content wrapper transform
            contentWrapper.setAttribute('data-active', index);
            
            // Activate new section and button
            sections[index].classList.add('active');
            buttons[index].classList.add('active');
            
            // Check scroll for team section
            checkScrollForTeamSection(index);
        }

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            // Add click listeners to buttons
            buttons.forEach((button, index) => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    activateSection(index);
                });
                
                // Hover effects
                button.addEventListener('mouseenter', function() {
                    if (currentSection !== index) {
                        button.style.transform = 'translateX(-50%) scale(1.1)';
                        button.style.boxShadow = '0 0 20px rgba(148, 163, 184, 0.4)';
                    }
                });
                
                button.addEventListener('mouseleave', function() {
                    if (currentSection !== index) {
                        button.style.transform = 'translateX(-50%)';
                        button.style.boxShadow = '';
                    }
                });
            });
            
            // Initialize first section
            activateSection(0);
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    activateSection((currentSection + 1) % sections.length);
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    activateSection((currentSection - 1 + sections.length) % sections.length);
                    break;
                    
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                    e.preventDefault();
                    const sectionIndex = parseInt(e.key) - 1;
                    if (sectionIndex < sections.length) {
                        activateSection(sectionIndex);
                    }
                    break;
            }
        });

        // Handle link buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('link-button')) {
                if (e.target.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                
                e.target.style.transform = 'translateY(-1px) scale(0.98)';
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 150);
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            checkScrollForTeamSection(currentSection);
        });

        console.log('🚀 QA Mission JavaScript loaded - Optimized version');
