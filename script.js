class CarouselController {
    constructor() {
        this.currentIndex = 0;
        this.track = document.getElementById('carouselTrack');
        this.cards = document.querySelectorAll('.project-card');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorsContainer = document.getElementById('indicators');
        
        this.init();
    }

    init() {
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

        // Handle demo link clicks
        this.handleDemoLinks();
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
        const newIndex = this.currentIndex + direction;
        
        if (newIndex < 0 || newIndex >= this.cards.length) {
            return; // Don't navigate beyond bounds
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
            
            const offset = index - this.currentIndex;
            
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

    handleDemoLinks() {
        const demoLinks = document.querySelectorAll('.demo-link');
        
        demoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const demoUrl = link.getAttribute('data-demo-url');
                
                if (demoUrl && demoUrl !== '#') {
                    // Open demo in new tab
                    window.open(demoUrl, '_blank', 'noopener,noreferrer');
                } else {
                    // Show a message if demo URL is not set
                    alert('Demo link coming soon!');
                }
            });
        });
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CarouselController();
});
