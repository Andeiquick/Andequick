document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica de la Galería de Imágenes ---
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.getElementById('prev-image-btn');
    const nextBtn = document.getElementById('next-image-btn');
    let currentImageIndex = 0;

    // Función para mostrar una imagen específica y actualizar la miniatura activa
    function showImage(index) {
        if (index >= thumbnails.length) {
            index = 0;
        } else if (index < 0) {
            index = thumbnails.length - 1;
        }

        // Actualiza la imagen principal
        mainImage.src = thumbnails[index].src;

        // Actualiza el borde de la miniatura activa
        thumbnails.forEach(thumb => thumb.classList.remove('thumbnail-active', 'border-blue-500'));
        thumbnails[index].classList.add('thumbnail-active', 'border-blue-500');
        
        currentImageIndex = index;
    }

    // Añade un evento de clic a cada miniatura
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            showImage(index);
        });
    });

    // Añade eventos de clic a los botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showImage(currentImageIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showImage(currentImageIndex + 1);
        });
    }
    
    // Inicializa la primera imagen como activa
    showImage(0);


    // --- Lógica del Modal de Pedido ---
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('order-modal');

    if (openModalBtn && closeModalBtn && modal) {
        // Abrir modal
        openModalBtn.addEventListener('click', () => {
            const productName = document.getElementById('product-name').textContent;
            const productPrice = document.getElementById('product-price').textContent;
            
            document.getElementById('modal-product-name').textContent = productName;
            document.getElementById('modal-product-price').textContent = productPrice;
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
        
        // Función para cerrar el modal
        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };

        closeModalBtn.addEventListener('click', closeModal);
        
        // Cerrar al hacer clic fuera del contenido del modal
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // --- Lógica del Formulario de WhatsApp ---
    const whatsappOrderForm = document.getElementById('whatsapp-order-form');
    if (whatsappOrderForm) {
        whatsappOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('modal-full-name').value;
            const city = document.getElementById('modal-city').value;
            const address = document.getElementById('modal-address').value;
            const pickup = document.getElementById('office-pickup').checked;
            
            const productName = document.getElementById('product-name').textContent;
            const productPrice = document.getElementById('product-price').textContent;
            
            let message = `¡Hola Andequick! 👋\n\nEstoy interesado en comprar el siguiente producto:\n\n*Producto:* ${productName}\n*Precio:* ${productPrice}\n\n*Mis datos de envío son:*\n*Nombre:* ${fullName}\n*Ciudad:* ${city}\n`;
            
            if (pickup) {
                message += `*Entrega:* Deseo retirar en oficina.`;
            } else {
                if (address.trim() === "") {
                    // Reemplazamos el alert con un modal simple
                    const alertModal = document.createElement('div');
                    alertModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[1001]';
                    alertModal.innerHTML = `
                        <div class="bg-white p-8 rounded-lg text-center shadow-xl max-w-sm w-full mx-4">
                            <p class="mb-4 text-gray-800 text-lg">La dirección es obligatoria para el envío a domicilio.</p>
                            <button id="closeAlertModal" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">Entendido</button>
                        </div>
                    `;
                    document.body.appendChild(alertModal);
                    document.getElementById('closeAlertModal').onclick = () => document.body.removeChild(alertModal);
                    return;
                }
                message += `*Dirección:* ${address}`;
            }

            const whatsappUrl = `https://wa.me/593985030396?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });

        const pickupCheckbox = document.getElementById('office-pickup');
        const addressTextarea = document.getElementById('modal-address');
        const addressContainer = addressTextarea.parentElement;

        if (pickupCheckbox && addressTextarea && addressContainer) {
            pickupCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    addressTextarea.required = false;
                    addressContainer.classList.add('hidden');
                } else {
                    addressTextarea.required = true;
                    addressContainer.classList.remove('hidden');
                }
            });
            // Estado inicial del campo de dirección
            addressTextarea.required = !pickupCheckbox.checked;
             if (pickupCheckbox.checked) {
                 addressContainer.classList.add('hidden');
             }
        }
    }
});
