// ── EMAILJS CONFIG ──────────────────────────────────────────────────────
// Step 1: Sign up free at https://www.emailjs.com
// Step 2: Create an Email Service (Gmail recommended) → copy Service ID
// Step 3: Create an Email Template → copy Template ID
//         Template variables to use: {{from_name}}, {{from_email}}, {{message}}
// Step 4: Go to Account → copy your Public Key
// Replace the three values below with your own:
const EMAILJS_PUBLIC_KEY  = '-GpTbnuhJOCn5I1gi';   // e.g. 'abc123XYZ'
const EMAILJS_SERVICE_ID  = 'service_7brc4e9';      // e.g. 'service_xxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_2j77bfr';     // e.g. 'template_xxxxxx'
// ────────────────────────────────────────────────────────────────────────

// Initialize EmailJS
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ── HAMBURGER MENU ──
const ham = document.getElementById('ham');
const navLinks = document.getElementById('navLinks');

ham.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── CONTACT FORM ──
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const btn     = this.querySelector('.form-btn');

  if (!name || !email || !message) return;

  btn.textContent = 'Sending…';
  btn.disabled = true;

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  name,
    from_email: email,
    message:    message,
    reply_to:   email
  }).then(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#00ffe1';
    btn.style.color = '#0a0a0f';
    this.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 4000);
  }).catch((err) => {
    console.error('EmailJS error:', err);
    btn.textContent = '✗ Failed — Try Again';
    btn.style.background = '#ff0066';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
    }, 4000);
  });
});
