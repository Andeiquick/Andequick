document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Main Hero Slider Logic ---
    const slider = document.getElementById('slider');
    const slides = slider ? slider.querySelectorAll('.slider-item') : [];
    const dotsContainer = document.getElementById('dots-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Initialize main slider only if elements exist
    if (slider && slides.length > 0 && dotsContainer && prevBtn && nextBtn) {
        
        // Create navigation dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-white/50', 'transition-colors', 'duration-300');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval(); // Reset auto-slide on manual navigation
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

        function goToSlide(n) {
            // Deactivate the old slide and dot
            slides[currentSlide].classList.remove('opacity-100');
            slides[currentSlide].classList.add('opacity-0');
            if (dots[currentSlide]) {
                dots[currentSlide].classList.remove('bg-white');
                dots[currentSlide].classList.add('bg-white/50');
            }
            
            // Calculate next slide index
            currentSlide = (n + slides.length) % slides.length;
            
            // Activate the new slide and dot
            slides[currentSlide].classList.remove('opacity-0');
            slides[currentSlide].classList.add('opacity-100');
            if (dots[currentSlide]) {
                dots[currentSlide].classList.remove('bg-white/50');
                dots[currentSlide].classList.add('bg-white');
            }
        }

        // Button event listeners
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetInterval();
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetInterval();
        });

        // Auto-sliding functionality
        function startInterval() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000); // Change slide every 5 seconds
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        
        // Touch swipe functionality
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            // Swiped left
            if (touchEndX < touchStartX - 50) {
                goToSlide(currentSlide + 1);
                resetInterval();
            }
            // Swiped right
            if (touchEndX > touchStartX + 50) {
                goToSlide(currentSlide - 1);
                resetInterval();
            }
        }

        // Initial setup
        goToSlide(0);
        startInterval();
    }

    // --- Testimonial Slider Logic ---
    const testimonialSlider = document.getElementById('testimonial-slider');
    if (testimonialSlider) {
        const testimonialSlides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const prevTestimonialButton = document.getElementById('prevTestimonial');
        const nextTestimonialButton = document.getElementById('nextTestimonial');
        let currentTestimonial = 0;
        let testimonialInterval;
        let testimonialTouchStartX = 0;
        let testimonialTouchEndX = 0;

        function showTestimonial(n) {
            if (testimonialSlides.length > 0) {
                // Hide current testimonial
                if (testimonialSlides[currentTestimonial]) {
                    testimonialSlides[currentTestimonial].classList.remove('active');
                }
                // Calculate next testimonial index
                currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
                // Show new testimonial
                if (testimonialSlides[currentTestimonial]) {
                    testimonialSlides[currentTestimonial].classList.add('active');
                }
            }
        }
        
        // Auto-sliding functionality for testimonials
        function startTestimonialInterval() {
            testimonialInterval = setInterval(() => {
                showTestimonial(currentTestimonial + 1);
            }, 5000); // Change slide every 5 seconds
        }

        function resetTestimonialInterval() {
            clearInterval(testimonialInterval);
            startTestimonialInterval();
        }

        // Check if buttons exist before adding listeners
        if (prevTestimonialButton && nextTestimonialButton) {
            prevTestimonialButton.addEventListener('click', () => {
                showTestimonial(currentTestimonial - 1);
                resetTestimonialInterval();
            });

            nextTestimonialButton.addEventListener('click', () => {
                showTestimonial(currentTestimonial + 1);
                resetTestimonialInterval();
            });
        }
        
        // Touch swipe functionality for testimonials
        testimonialSlider.addEventListener('touchstart', e => {
            testimonialTouchStartX = e.changedTouches[0].screenX;
        }, false);

        testimonialSlider.addEventListener('touchend', e => {
            testimonialTouchEndX = e.changedTouches[0].screenX;
            handleTestimonialSwipe();
        }, false);

        function handleTestimonialSwipe() {
            // Swiped left
            if (testimonialTouchEndX < testimonialTouchStartX - 50) {
                showTestimonial(currentTestimonial + 1);
                resetTestimonialInterval();
            }
            // Swiped right
            if (testimonialTouchEndX > testimonialTouchStartX + 50) {
                showTestimonial(currentTestimonial - 1);
                resetTestimonialInterval();
            }
        }

        // Show the first testimonial initially and start auto-slide
        if (testimonialSlides.length > 0) {
             showTestimonial(0);
             startTestimonialInterval();
        }
    }
});
