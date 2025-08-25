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

// Function to attach form handlers
function attachFormHandlers() {
    console.log('Attempting to attach form handlers');
    
    // Discount form handler
    const discountForm = document.getElementById('discountForm');
    console.log('Discount form found:', discountForm);
    if (discountForm && !discountForm.hasAttribute('data-handler-attached')) {
        console.log('Attaching discount form handler');
        discountForm.setAttribute('data-handler-attached', 'true');
        discountForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Discount form submitted - preventDefault called');
            
            const email = document.getElementById('discountEmail').value;
            const btn = document.getElementById('discountBtn');
            
            btn.disabled = true;
            btn.textContent = 'Sending...';
            
            const result = await subscribeToBrevo(
                email, 
                '', // No firstName since we removed the name field
                'discount', 
                'discount'
            );
            
            if (result.success) {
                showMessage('discountMessage', '🎉 Success! Your discount code is: <strong>REPLX09</strong>', 'success');
                discountForm.reset();
            } else {
                showMessage('discountMessage', `❌ ${result.error}`, 'error');
            }
            
            btn.disabled = false;
            btn.textContent = 'Get Code';
        });
    }

    // VIP form handler
    const vipForm = document.getElementById('vipForm');
    console.log('VIP form found:', vipForm);
    if (vipForm && !vipForm.hasAttribute('data-handler-attached')) {
        console.log('Attaching VIP form handler');
        vipForm.setAttribute('data-handler-attached', 'true');
        vipForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('VIP form submitted - preventDefault called');
            
            const email = document.getElementById('vipEmail').value;
            const btn = document.getElementById('vipBtn');
            
            btn.disabled = true;
            btn.textContent = 'Joining...';
            
            const result = await subscribeToBrevo(
                email, 
                '', // No firstName since we removed the name field
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
}

// Try to attach handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - attempting to attach handlers');
    attachFormHandlers();
});

// Also try periodically in case React components load later
let retryCount = 0;
const maxRetries = 10;
const retryInterval = setInterval(() => {
    retryCount++;
    console.log(`Retry attempt ${retryCount}`);
    attachFormHandlers();
    
    if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
        console.log('Stopped retrying after', maxRetries, 'attempts');
    }
}, 1000);