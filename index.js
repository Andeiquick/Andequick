document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slider-item');
    const dotsContainer = document.getElementById('dots-container');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-white/50', 'transition-colors');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('#dots-container button');

        function goToSlide(n) {
            if(slides[currentSlide]) slides[currentSlide].classList.remove('opacity-100');
            if(dots.length > 0 && dots[currentSlide]) dots[currentSlide].classList.remove('bg-white');
            
            currentSlide = (n + slides.length) % slides.length;
            
            if(slides[currentSlide]) slides[currentSlide].classList.add('opacity-100');
            if(dots.length > 0 && dots[currentSlide]) dots[currentSlide].classList.add('bg-white');
        }

        document.getElementById('prevBtn').addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetInterval();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetInterval();
        });

        function startInterval() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        goToSlide(0);
        startInterval();
    }

    const testimonialSlider = document.getElementById('testimonial-slider');
    if (testimonialSlider) {
        const testimonialSlides = testimonialSlider.querySelectorAll('.testimonial-slide');
        let currentTestimonial = 0;

        function showTestimonial(n) {
            if (testimonialSlides[currentTestimonial]) {
                testimonialSlides[currentTestimonial].classList.remove('active');
            }
            currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
            if (testimonialSlides[currentTestimonial]) {
                testimonialSlides[currentTestimonial].classList.add('active');
            }
        }
        
        const prevTestimonialButton = document.getElementById('prevTestimonial');
        const nextTestimonialButton = document.getElementById('nextTestimonial');

        if (prevTestimonialButton && nextTestimonialButton) {
            prevTestimonialButton.addEventListener('click', () => {
                showTestimonial(currentTestimonial - 1);
            });

            nextTestimonialButton.addEventListener('click', () => {
                showTestimonial(currentTestimonial + 1);
            });
        }

        showTestimonial(0);
    }
});