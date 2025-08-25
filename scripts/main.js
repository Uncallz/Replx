const BREVO_CONFIG = {
    apiKey: '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',
    discountListId: [3],
    vipListId: [4],
    apiUrl: 'https://api.brevo.com/v3/contacts'
};

async function subscribeToBrevo(email, firstName, listIds, formType) {
    try {
        const response = await fetch(BREVO_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': BREVO_CONFIG.apiKey
            },
            body: JSON.stringify({
                email: email,
                attributes: {
                    FIRSTNAME: firstName || ''
                },
                listIds: listIds,
                updateEnabled: true
            })
        });

        if (response.ok || response.status === 204) {
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData.message || 'Subscription failed' };
        }
    } catch (error) {
        return { success: false, error: 'Network error. Please try again.' };
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
                BREVO_CONFIG.discountListId, 
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
                BREVO_CONFIG.vipListId, 
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