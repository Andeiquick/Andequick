document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('whatsapp-form');
    const phoneNumber = '+593985030396'; // Tu número de WhatsApp

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        // Construye el mensaje para WhatsApp
        const fullMessage = `Hola, mi nombre es ${name}. ${message}`;
        
        // Codifica el mensaje para que sea seguro en una URL
        const encodedMessage = encodeURIComponent(fullMessage);

        // Construye la URL de WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Abre WhatsApp en una nueva pestaña
        window.open(whatsappUrl, '_blank');
    });
});