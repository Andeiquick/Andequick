document.addEventListener('DOMContentLoaded', function() {
    const trackingForm = document.getElementById('tracking-form');
    
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const trackingNumberInput = document.getElementById('tracking-number');
            const selectedCarrier = document.querySelector('input[name="carrier"]:checked');
            
            if (!trackingNumberInput.value.trim()) {
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.left = '0';
                modal.style.top = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.style.zIndex = '1000';
                modal.innerHTML = `
                    <div style="background: white; padding: 2rem; border-radius: 0.5rem; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <p style="margin-bottom: 1rem; color: #1f2937; font-size: 1.125rem;">Por favor, ingresa un número de guía.</p>
                        <button id="closeModal" style="padding: 0.5rem 1rem; background-color: #2563eb; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-weight: 500;">Entendido</button>
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
                    trackingUrl = 'https://fenixoper.laarcourier.com/Tracking/Guiacompleta.aspx';
                    break;
                case 'veloces':
                    trackingUrl = 'https://tracking.veloces.app/';
                    break;
            }
            
            if (trackingUrl) {
                window.open(trackingUrl, '_blank');
            }
        });
    }
});