document.addEventListener('DOMContentLoaded', function() {
    const trackingForm = document.getElementById('tracking-form');
    
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const trackingNumberInput = document.getElementById('tracking-number');
            const selectedCarrier = document.querySelector('input[name="carrier"]:checked');
            
            if (!trackingNumberInput.value.trim()) {
                // Crear y mostrar un modal personalizado en lugar de alert()
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]';
                modal.innerHTML = `
                    <div class="bg-white p-8 rounded-lg text-center shadow-xl max-w-sm w-full mx-4">
                        <p class="mb-4 text-gray-800 text-lg">Por favor, ingresa un número de guía.</p>
                        <button id="closeModal" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">Entendido</button>
                    </div>
                `;
                document.body.appendChild(modal);
                document.getElementById('closeModal').onclick = () => document.body.removeChild(modal);
                return;
            }
            
            const trackingNumber = trackingNumberInput.value.trim();
            let trackingUrl = '';

            switch(selectedCarrier.value) {
                case 'servientrega':
                    trackingUrl = `https://www.servientrega.com.ec/Tracking/?guia=${trackingNumber}&tipo=GUIA`;
                    break;
                case 'gintracom':
                    trackingUrl = `https://ec.gintracom.site/web/site/tracking?q=${trackingNumber}`;
                    break;
                case 'laarcourier':
                    // Para LaarCourier, es mejor abrir su página principal de rastreo
                    // ya que el número de guía debe ingresarse manualmente.
                    trackingUrl = 'https://fenixoper.laarcourier.com/Tracking/Guiacompleta.aspx';
                    break;
                case 'veloces':
                    // Similar a Laar, abrimos la página principal de rastreo.
                    trackingUrl = 'https://tracking.veloces.app/';
                    break;
            }
            
            if (trackingUrl) {
                window.open(trackingUrl, '_blank');
            }
        });
    }
});
