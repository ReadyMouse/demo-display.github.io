import { projects } from './projects/index.js';

class CarouselController {
    constructor(projectsData) {
        this.projectsData = projectsData;
        this.currentIndex = 0;
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.getElementById('indicators');
        
        this.init();
    }

    init() {
        // Render projects
        this.renderProjects();
        
        // Get cards after rendering
        this.cards = document.querySelectorAll('.project-card');
        
        // Create indicators
        this.createIndicators();
        
        // Set initial active card
        this.updateActiveCard();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });

        // Touch/swipe support
        this.addTouchSupport();
    }

    renderProjects() {
        const githubIconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>`;

        const youtubeIconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>`;

        const linkIconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>`;

        this.projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            // Check which links are available
            const hasGithub = project.githubUrl && project.githubUrl.trim() !== '';
            const hasYoutube = project.youtubeUrl && project.youtubeUrl.trim() !== '';
            const hasDemo = project.demoUrl && project.demoUrl.trim() !== '';
            
            card.innerHTML = `
                <h1 class="project-title">${project.title}</h1>
                <h2 class="project-subtitle">${project.subtitle}</h2>
                <div class="image-container">
                    <img src="${project.image}" 
                         alt="${project.title}" 
                         class="project-image">
                </div>
                <p class="event-info">${project.event}</p>
                <div class="project-links">
                    <a href="${hasGithub ? project.githubUrl : '#'}" 
                       class="project-link ${!hasGithub ? 'disabled' : ''}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       ${!hasGithub ? 'onclick="return false;"' : ''}>
                        ${githubIconSvg}
                        <span>View on GitHub</span>
                    </a>
                    <a href="${hasYoutube ? project.youtubeUrl : '#'}" 
                       class="project-link ${!hasYoutube ? 'disabled' : ''}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       ${!hasYoutube ? 'onclick="return false;"' : ''}>
                        ${youtubeIconSvg}
                        <span>YouTube Promo</span>
                    </a>
                    <a href="${hasDemo ? project.demoUrl : '#'}" 
                       class="project-link ${!hasDemo ? 'disabled' : ''}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       ${!hasDemo ? 'onclick="return false;"' : ''}>
                        ${linkIconSvg}
                        <span>Demo Site</span>
                    </a>
                </div>
            `;
            this.track.appendChild(card);
        });
    }

    createIndicators() {
        this.cards.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = document.querySelectorAll('.indicator');
    }

    navigate(direction) {
        let newIndex = this.currentIndex + direction;
        
        // Wrap around for circular carousel
        if (newIndex < 0) {
            newIndex = this.cards.length - 1; // Go to last card
        } else if (newIndex >= this.cards.length) {
            newIndex = 0; // Go to first card
        }
        
        this.currentIndex = newIndex;
        this.updateCarousel();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.cards.length) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        this.updateActiveCard();
        this.updateIndicators();
    }

    updateActiveCard() {
        this.cards.forEach((card, index) => {
            // Remove all position classes
            card.classList.remove('active', 'left', 'right', 'far-left', 'far-right');
            
            // Calculate offset with wrap-around support
            let offset = index - this.currentIndex;
            const totalCards = this.cards.length;
            
            // Normalize offset to handle circular wrapping
            // This ensures we always take the shortest path
            if (offset > totalCards / 2) {
                offset -= totalCards;
            } else if (offset < -totalCards / 2) {
                offset += totalCards;
            }
            
            if (offset === 0) {
                // Current card - center, full size
                card.classList.add('active');
            } else if (offset === -1) {
                // One to the left
                card.classList.add('left');
            } else if (offset === 1) {
                // One to the right
                card.classList.add('right');
            } else if (offset === -2) {
                // Two to the left
                card.classList.add('far-left');
            } else if (offset === 2) {
                // Two to the right
                card.classList.add('far-right');
            }
            // Cards further away remain with default hidden state
        });
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.navigate(1); // Swipe left
                } else {
                    this.navigate(-1); // Swipe right
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }

}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CarouselController(projects);
});
