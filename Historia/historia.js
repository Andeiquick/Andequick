document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.5 // El item se considera visible cuando el 50% de él está en pantalla
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});