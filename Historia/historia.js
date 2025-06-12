/**
 * Este script utiliza la API Intersection Observer para animar los hitos de la línea de tiempo
 * a medida que el usuario se desplaza por la página.
 */
document.addEventListener('DOMContentLoaded', function() {

    // Selecciona todos los elementos que tienen la clase 'timeline-item'.
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Comprueba si se encontraron elementos para observar.
    if (timelineItems.length === 0) {
        return; // No hace nada si no hay hitos en la página.
    }

    // Configura el observador.
    // La función callback se ejecutará cada vez que un elemento observado
    // cambie su estado de intersección con el viewport.
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento es visible en el viewport...
            if (entry.isIntersecting) {
                // ...añade la clase 'is-visible' para activar la animación CSS.
                entry.target.classList.add('is-visible');
                
                // Deja de observar el elemento una vez que ha sido animado.
                // Esto mejora el rendimiento, ya que no se vuelve a comprobar.
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Opciones del observador:
        // root: null (usa el viewport del navegador como área de intersección).
        // rootMargin: '0px' (sin margen adicional alrededor del root).
        // threshold: 0.1 (el callback se dispara cuando al menos el 10% del elemento es visible).
        threshold: 0.1
    });

    // Pone a cada hito de la línea de tiempo bajo la observación del Intersection Observer.
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
