document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // CÓDIGO QUE YA ESTABA (SLIDER PRINCIPAL Y TESTIMONIOS)
    // =================================================================

    const slides = document.querySelectorAll('.slider-item');
    const dotsContainer = document.getElementById('dots-container');
    let currentSlide = 0;
    let slideInterval;

    // Se ejecuta solo si encuentra los elementos del slider principal
    if (slides.length > 0 && dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'bg-white/50', 'transition-colors');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

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
            if (testimonialSlides.length > 0) {
                 if (testimonialSlides[currentTestimonial]) {
                    testimonialSlides[currentTestimonial].classList.remove('active');
                }
                currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
                if (testimonialSlides[currentTestimonial]) {
                    testimonialSlides[currentTestimonial].classList.add('active');
                }
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

    // =================================================================
    // CÓDIGO NUEVO (SLIDER DE PRODUCTOS CON SWIPER)
    // =================================================================
    
    // Verificamos si el elemento del slider de productos existe antes de correr el código
    if (document.querySelector('.product-slider')) {
        const productSlider = new Swiper('.product-slider', {
            // Cuántos productos se ven a la vez (responsive)
            slidesPerView: 2, // 2 en móvil
            spaceBetween: 16, // Espacio entre productos
            
            breakpoints: {
                // Cuando la pantalla es >= 768px
                768: {
                  slidesPerView: 3, // Muestra 3 productos
                  spaceBetween: 24
                },
                // Cuando la pantalla es >= 1024px
                1024: {
                  slidesPerView: 4, // Muestra 4 productos
                  spaceBetween: 32
                }
            },
          
            // Botones de navegación (flechas)
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
    
            // Permite arrastrar con el mouse en escritorio y usar teclado
            mousewheel: true,
            keyboard: true,
        });
    }

});

