body {
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc; /* slate-50 */
    overflow-x: hidden; /* Prevent horizontal scroll on the whole page */
}

.nav-link {
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 50%;
    background-color: #3b82f6; /* blue-600 */
    transition: all 0.3s ease-in-out;
}

.nav-link:hover::after {
    width: 100%;
    left: 0;
}

.slider-item {
    transition: opacity 1s ease-in-out;
}

/* Testimonial Slider Styles */
.testimonial-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-in-out, visibility 0.5s;
}

.testimonial-slide.active {
    position: relative; /* Use relative to take up space and define container height */
    opacity: 1;
    visibility: visible;
}

/* --- FIX FOR TESTIMONIAL ARROWS ON MOBILE --- */
/* Selects the container of the testimonial slider to ensure context */
#testimonial-slider-container {
    position: relative;
}

/* Styles for testimonial navigation buttons */
#prevTestimonial, #nextTestimonial {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    /* Adjust size and appearance if needed */
    z-index: 10;
}

#prevTestimonial {
    left: -20px; /* Default position for larger screens */
}

#nextTestimonial {
    right: -20px; /* Default position for larger screens */
}


/* Media query for mobile devices (e.g., screen width up to 768px) */
@media (max-width: 768px) {
    #prevTestimonial, #nextTestimonial {
        /* Make arrows smaller on mobile */
        width: 32px;  /* Example size, adjust as needed */
        height: 32px; /* Example size, adjust as needed */
        
        /* Reposition arrows to be inside the container */
        top: auto; /* Unset top positioning */
        bottom: 0px; /* Position them at the bottom of the quote box */
        transform: translateY(0); /* Reset transform */
    }

    #prevTestimonial {
        /* Position from the right to align with the next button */
        left: auto;
        right: 48px; /* Place it next to the 'next' button with some space */
    }

    #nextTestimonial {
        right: 10px; /* Position inside the container from the right */
    }
}
