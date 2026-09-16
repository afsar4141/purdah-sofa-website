/**
 * join.js
 * -----------------------------------------------------------------------
 * Powers join.html — the "Join as a Worker" registration page.
 * Handles: English/Hindi language toggle, form validation, and saving
 * the registration to the backend.
 *
 * Update API_BASE_URL to match the same value used in the main site's
 * script.js:
 *   - Local testing:   "http://localhost:4000"
 *   - After deploying: "https://your-backend-name.onrender.com"
 * -----------------------------------------------------------------------
 */
const API_BASE_URL = "http://localhost:4000";

/* ---------------------------------------------------------------------
   LANGUAGE TOGGLE
   Every translatable element carries data-en and data-hi attributes.
   Inputs/selects also carry data-en-placeholder / data-hi-placeholder.
--------------------------------------------------------------------- */
(function () {
  const langButtons = document.querySelectorAll('.lang-btn');

  function applyLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) el.textContent = text;
    });

    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
      const placeholder = el.getAttribute('data-' + lang + '-placeholder');
      if (placeholder !== null) el.setAttribute('placeholder', placeholder);
    });

    document.documentElement.lang = lang;
    langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    localStorage.setItem('joinPageLang', lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  // Remember the last language chosen on this device
  const savedLang = localStorage.getItem('joinPageLang');
  if (savedLang === 'hi') applyLanguage('hi');
})();

/* ---------------------------------------------------------------------
   FORM SUBMISSION
--------------------------------------------------------------------- */
(function () {
  const form = document.getElementById('joinForm');
  const successBox = document.getElementById('joinSuccess');
  const submitBtn = document.getElementById('joinSubmitBtn');
  const joinAnotherBtn = document.getElementById('joinAnotherBtn');

  function clearErrors() {
    form.querySelectorAll('.join-field').forEach(f => f.classList.remove('has-error'));
    form.querySelectorAll('.join-error').forEach(e => e.textContent = '');
  }

  function getCurrentLang() {
    return document.documentElement.lang === 'hi' ? 'hi' : 'en';
  }

  function setError(fieldId, enMsg, hiMsg) {
    const field = document.getElementById(fieldId).closest('.join-field');
    const errorEl = form.querySelector('[data-error-for="' + fieldId + '"]');
    field.classList.add('has-error');
    errorEl.textContent = getCurrentLang() === 'hi' ? hiMsg : enMsg;
  }

  function isValidPhone(value) {
    return value.replace(/\D/g, '').length >= 10;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('wName').value.trim();
    const phone = document.getElementById('wPhone').value.trim();
    const skill = document.getElementById('wSkill').value;
    const experience = document.getElementById('wExperience').value;
    const area = document.getElementById('wArea').value.trim();

    let valid = true;

    if (!name) {
      setError('wName', 'Please enter your name', 'कृपया अपना नाम लिखें');
      valid = false;
    }
    if (!phone) {
      setError('wPhone', 'Please enter your phone number', 'कृपया अपना फ़ोन नंबर लिखें');
      valid = false;
    } else if (!isValidPhone(phone)) {
      setError('wPhone', 'Please enter a valid 10-digit number', 'कृपया सही 10 अंकों का नंबर लिखें');
      valid = false;
    }
    if (!skill) {
      setError('wSkill', 'Please select your work', 'कृपया अपना काम चुनें');
      valid = false;
    }
    if (!area) {
      setError('wArea', 'Please enter your city or area', 'कृपया अपना शहर या इलाका लिखें');
      valid = false;
    }

    if (!valid) return;

    submitBtn.disabled = true;

    try {
      const res = await fetch(API_BASE_URL + '/api/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, skill, experience, area })
      });

      if (!res.ok) throw new Error('Server error');

      form.style.display = 'none';
      successBox.classList.add('open');
    } catch (err) {
      const lang = getCurrentLang();
      alert(
        lang === 'hi'
          ? 'कुछ गलत हो गया। कृपया फिर से कोशिश करें या हमें कॉल करें।'
          : 'Something went wrong. Please try again or call us.'
      );
    } finally {
      submitBtn.disabled = false;
    }
  });

  if (joinAnotherBtn) {
    joinAnotherBtn.addEventListener('click', () => {
      form.reset();
      clearErrors();
      successBox.classList.remove('open');
      form.style.display = 'flex';
    });
  }
})();