// Configurazione API locale
const API_CONFIG = {
    baseUrl: window.location.origin
};

// Funzione per iscrivere un utente tramite API serverless
async function subscribeToBrevo(email, firstName, listType, formType) {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/api/subscribe`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                firstName: firstName,
                listType: listType
            })
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('Errore API:', result);
            throw new Error(result.error || 'Errore durante l\'iscrizione');
        }

        return { success: true, message: result.message || 'Iscrizione completata!' };
        
    } catch (error) {
        console.error('Errore nella sottoscrizione:', error);
        return { success: false, error: error.message || 'Errore durante l\'iscrizione. Riprova più tardi.' };
    }
}

function showMessage(elementId, message, type) {
    const messageEl = document.getElementById(elementId);
    messageEl.innerHTML = `<div class="form-message ${type}">${message}</div>`;
    
    setTimeout(() => {
        messageEl.innerHTML = '';
    }, 5000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Discount form handler
    const discountForm = document.getElementById('discountForm');
    if (discountForm) {
        discountForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('discountEmail').value;
            const firstName = document.getElementById('discountName').value;
            const btn = document.getElementById('discountBtn');
            
            btn.disabled = true;
            btn.textContent = 'Sending...';
            
            const result = await subscribeToBrevo(
                email, 
                firstName, 
                'discount', 
                'discount'
            );
            
            if (result.success) {
                showMessage('discountMessage', '🎉 Check your email! Your REPLX09 discount code is on its way!', 'success');
                discountForm.reset();
            } else {
                showMessage('discountMessage', `❌ ${result.error}`, 'error');
            }
            
            btn.disabled = false;
            btn.textContent = 'Get REPLX09 Code 🎉';
        });
    }

    // VIP form handler
    const vipForm = document.getElementById('vipForm');
    if (vipForm) {
        vipForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('vipEmail').value;
            const firstName = document.getElementById('vipName').value;
            const btn = document.getElementById('vipBtn');
            
            btn.disabled = true;
            btn.textContent = 'Joining...';
            
            const result = await subscribeToBrevo(
                email, 
                firstName, 
                'vip', 
                'vip'
            );
            
            if (result.success) {
                showMessage('vipMessage', '⚡ Welcome to the VIP Drop List! Check your email for exclusive perks!', 'success');
                vipForm.reset();
            } else {
                showMessage('vipMessage', `❌ ${result.error}`, 'error');
            }
            
            btn.disabled = false;
            btn.textContent = 'Join VIP List ⚡';
        });
    }

    // Email validation for discount form
    const discountEmail = document.getElementById('discountEmail');
    if (discountEmail) {
        discountEmail.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }

    // Email validation for VIP form
    const vipEmail = document.getElementById('vipEmail');
    if (vipEmail) {
        vipEmail.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }
});