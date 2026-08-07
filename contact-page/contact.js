const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');
const submitButton = form ? form.querySelector('button[type="submit"]') : null;

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const action = form.getAttribute('action') || '';
        const method = (form.getAttribute('method') || 'POST').toUpperCase();

        if (action.includes('your-form-id')) {
            if (statusMessage) {
                statusMessage.textContent = 'Please replace the placeholder Formspree form ID with your real one before submitting.';
                statusMessage.classList.add('is-error');
                statusMessage.classList.remove('is-success');
                statusMessage.classList.add('is-visible');
            }
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        if (statusMessage) {
            statusMessage.innerHTML = '<span class="status-pill">Sending your message…</span>';
            statusMessage.classList.remove('is-error');
            statusMessage.classList.remove('is-success');
            statusMessage.classList.add('is-visible');
        }

        try {
            const response = await fetch(action, {
                method,
                headers: {
                    Accept: 'application/json'
                },
                body: new FormData(form)
            });

            if (!response.ok) {
                throw new Error('Unable to send your message right now. Please try again in a moment.');
            }

            if (statusMessage) {
                statusMessage.innerHTML = '<span class="status-pill is-success-pill">Thanks for your message! I will get back to you soon.</span>';
                statusMessage.classList.remove('is-error');
                statusMessage.classList.add('is-success');
                statusMessage.classList.add('is-visible');
            }

            form.reset();
        } catch (error) {
            if (statusMessage) {
                statusMessage.innerHTML = `<span class="status-pill is-error-pill">${error.message || 'Something went wrong. Please try again.'}</span>`;
                statusMessage.classList.remove('is-success');
                statusMessage.classList.add('is-error');
                statusMessage.classList.add('is-visible');
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send message';
            }
        }
    });
}