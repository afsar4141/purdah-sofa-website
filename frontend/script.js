/* =========================================================================
   IMAGE GALLERY DATA
   -------------------------------------------------------------------------
   Add your photos here as they're uploaded. Each category is a plain array
   of image URLs/paths. Nothing else in the code needs to change — the
   gallery, thumbnails and lightbox all read from this object automatically.

   Example once you upload files:
     purdah: [
       "images/purdah/purdah-1.jpg",
       "images/purdah/purdah-2.jpg"
     ],
     sofa: [
       "images/sofa/sofa-1.jpg",
       "images/sofa/sofa-2.jpg"
     ],

   Until real photos are added, each category is empty on purpose so the
   modal shows the "no photos yet" state instead of fake placeholders.
========================================================================= */
const galleryData = {
  purdah: [
    "images/purdah/purdah-01.jpg",
    "images/purdah/purdah-02.jpg",
    "images/purdah/purdah-03.jpg",
    "images/purdah/purdah-04.jpg",
    "images/purdah/purdah-05.jpg",
    "images/purdah/purdah-06.jpg",
    "images/purdah/purdah-7.jpg",
    "images/purdah/purdah-8.jpg",
    "images/purdah/purdah-9.jpg",
    "images/purdah/purdah-11.jpg",
    "images/purdah/purdah-12.jpg",
    "images/purdah/purdah-13.jpg",
    "images/purdah/purdah-14.jpg",
    "images/purdah/purdah-15.jpg",
    "images/purdah/purdah-16.jpg"
  ],
  sofa: [
    "images/sofa/Screenshot_2026-02-17-22-26-04-41_680d03679600f7af0b4c700c6b270fe7~2.jpg",
    "images/sofa/Screenshot_2026-02-17-22-26-30-99_680d03679600f7af0b4c700c6b270fe7~2.jpg",
    "images/sofa/sofa3.jpg",
    "images/sofa/sofa4.jpg",
    "images/sofa/sofa5.jpg",
    "images/sofa/sofa6.jpg",
    "images/sofa/sofa7.jpg",
    "images/sofa/sofa8.jpg",
    "images/sofa/sofa9.jpg",
    "images/sofa/sofa11.jpg",
    "images/sofa/sofa12.jpg",
    "images/sofa/sofa13.jpg",
    "images/sofa/sofa14.jpg",
    "images/sofa/sofa15.jpg",
    "images/sofa/sofa16.jpg",
    "images/sofa/sofa17.jpg",
  ],
  carpentry: [
    "images/furniture/furniture1.jpg",
    "images/furniture/furniture2.jpg",
    "images/furniture/furniture3.jpg",
    "images/furniture/furniture4.jpg",
    "images/furniture/furniture5.jpg",
    "images/furniture/furniture6.jpg",
    "images/furniture/furniture7.jpg",
    "images/furniture/furniture8.jpg",
    "images/furniture/furniture9.jpg",
    "images/furniture/furniture11.jpg",
    "images/furniture/furniture12.jpg",
    "images/furniture/furniture13.jpg",
    "images/furniture/furniture14.jpg",
    "images/furniture/furniture15.jpg",
    "images/furniture/furniture16.jpg",
    "images/furniture/furniture17.jpg",
    "images/furniture/furniture18.jpg",
    "images/furniture/furniture19.jpg",
    "images/furniture/furniture21.jpg",
    "images/furniture/furniture22.jpg",
  
  ],
  furniture: [
    "images/home_furnishing/home_furnishing_1.jpg",
    "images/home_furnishing/home_furnishing_2.jpg",
    "images/home_furnishing/home_furnishing_3.jpg",
    "images/home_furnishing/home_furnishing_4.jpg",
    "images/home_furnishing/home_furnishing_5.jpg",
    "images/home_furnishing/home_furnishing_6.jpg",
    "images/home_furnishing/home_furnishing_7.jpg",
    "images/home_furnishing/home_furnishing_8.jpg",
    "images/home_furnishing/home_furnishing_9.jpg",
    "images/home_furnishing/home_furnishing_10.jpg",
    "images/home_furnishing/home_furnishing_11.jpg",
    "images/home_furnishing/home_furnishing_12.jpg",
    "images/home_furnishing/home_furnishing_13.jpg",
    "images/home_furnishing/home_furnishing_14.jpg",
    "images/home_furnishing/home_furnishing_15.jpg",
    "images/home_furnishing/home_furnishing_16.jpg",
    "images/home_furnishing/home_furnishing_17.jpg",
    "images/home_furnishing/home_furnishing_18.jpg",
    "images/home_furnishing/home_furnishing_19.jpg",
    "images/home_furnishing/home_furnishing_20.jpg",
  
  ]
};

const categoryMeta = {
  purdah: {
    title: "Purdah & Curtains",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18M21 3v18M3 6h6M21 6h-6M3 6c0 6 3 9 6 9M21 6c0 6-3 9-6 9"/></svg>'
  },
  sofa: {
    title: "Sofa Services",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6M2 18h20M4 18v2M20 18v2M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>'
  },
  carpentry: {
    title: "Carpentry Work",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 12.5-8 8a2.1 2.1 0 1 1-3-3l8-8M17.5 8 21 4.5a1 1 0 0 0-1.5-1.5L16 6.5M8 8l-4 4M12 12l4-4M4.5 3 8 6.5M20 20l-2-2"/></svg>'
  },
  furniture: {
    title: "Home Furnishing",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20V10a3 3 0 0 1 6 0v10M4 20h16M12 3v3M12 3l-2 2M12 3l2 2"/></svg>'
  }
};

(function () {
  const galleryOverlay = document.getElementById('galleryOverlay');
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryEmpty = document.getElementById('galleryEmpty');
  const galleryTitle = document.getElementById('galleryTitle');
  const gallerySub = document.getElementById('gallerySub');
  const galleryHeadIcon = document.getElementById('galleryHeadIcon');
  const galleryClose = document.getElementById('galleryClose');

  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentCategory = null;
  let currentIndex = 0;

  function openGallery(category) {
    const meta = categoryMeta[category];
    const images = galleryData[category] || [];
    if (!meta) return;

    currentCategory = category;
    galleryTitle.textContent = meta.title;
    galleryHeadIcon.innerHTML = meta.icon;
    gallerySub.textContent = images.length + (images.length === 1 ? ' photo' : ' photos');

    galleryGrid.innerHTML = '';

    if (images.length === 0) {
      galleryGrid.style.display = 'none';
      galleryEmpty.style.display = 'block';
    } else {
      galleryGrid.style.display = 'grid';
      galleryEmpty.style.display = 'none';

      images.forEach((src, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'gallery-thumb';
        thumb.innerHTML =
          '<img src="' + src + '" alt="' + meta.title + ' photo ' + (index + 1) + '" loading="lazy" />' +
          '<div class="gallery-thumb-overlay"><span>View</span></div>';
        thumb.addEventListener('click', () => openLightbox(category, index));
        galleryGrid.appendChild(thumb);
      });
    }

    galleryOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery() {
    galleryOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openLightbox(category, index) {
    currentCategory = category;
    currentIndex = index;
    updateLightboxImage();
    lightboxOverlay.classList.add('open');
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('open');
  }

  function updateLightboxImage() {
    const images = galleryData[currentCategory] || [];
    if (!images.length) return;
    lightboxImg.src = images[currentIndex];
    lightboxImg.alt = categoryMeta[currentCategory].title + ' photo ' + (currentIndex + 1);
  }

  function showPrev() {
    const images = galleryData[currentCategory] || [];
    if (!images.length) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  function showNext() {
    const images = galleryData[currentCategory] || [];
    if (!images.length) return;
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  // Wire up service cards + explore links
  document.querySelectorAll('[data-category]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openGallery(el.getAttribute('data-category'));
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGallery(el.getAttribute('data-category'));
      }
    });
  });

  galleryClose.addEventListener('click', closeGallery);
  galleryOverlay.addEventListener('click', (e) => {
    if (e.target === galleryOverlay) closeGallery();
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightboxOverlay.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    } else if (galleryOverlay.classList.contains('open') && e.key === 'Escape') {
      closeGallery();
    }
  });
})();

/* =========================================================================
   BOOKING FORM — "Book Free Measurement"
   -------------------------------------------------------------------------
   The form does two things on submit:
   1. Saves the booking to the backend (so it shows up in the admin panel)
   2. Opens WhatsApp with a pre-filled message, so the business also gets
      an instant notification and the customer has a copy of what they sent

   Update WHATSAPP_NUMBER if the business number ever changes
   (country code + number, no spaces or +).

   Update API_BASE_URL to point at your backend:
   - Local testing:      "http://localhost:4000"
   - After deploying:    "https://your-backend-name.onrender.com"
========================================================================= */
const WHATSAPP_NUMBER = "919140727216";
const API_BASE_URL = "http://localhost:4000";

(function () {
  const bookingOverlay = document.getElementById('bookingOverlay');
  const bookingClose = document.getElementById('bookingClose');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');
  const bookingDoneBtn = document.getElementById('bookingDoneBtn');
  const openBookingBtn = document.getElementById('openBookingBtn');

  function openBooking() {
    bookingOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    bookingForm.style.display = 'flex';
    bookingSuccess.classList.remove('open');
  }

  function closeBooking() {
    bookingOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function clearErrors() {
    bookingForm.querySelectorAll('.booking-field').forEach(f => f.classList.remove('has-error'));
    bookingForm.querySelectorAll('.booking-error').forEach(e => e.textContent = '');
  }

  function setError(fieldId, message) {
    const field = document.getElementById(fieldId).closest('.booking-field');
    const errorEl = bookingForm.querySelector('[data-error-for="' + fieldId + '"]');
    field.classList.add('has-error');
    errorEl.textContent = message;
  }

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 10;
  }

  function validate(data) {
    let valid = true;
    if (!data.name.trim()) {
      setError('bkName', 'Please enter your name');
      valid = false;
    }
    if (!data.phone.trim()) {
      setError('bkPhone', 'Please enter your phone number');
      valid = false;
    } else if (!isValidPhone(data.phone)) {
      setError('bkPhone', 'Please enter a valid 10-digit phone number');
      valid = false;
    }
    if (!data.service) {
      setError('bkService', 'Please select a service');
      valid = false;
    }
    if (!data.address.trim()) {
      setError('bkAddress', 'Please enter your address');
      valid = false;
    }
    return valid;
  }

  function buildWhatsAppMessage(data) {
    const lines = [
      "New Booking Request - Free Measurement",
      "",
      "Name: " + data.name,
      "Phone: " + data.phone,
      "Service: " + data.service,
      "Address: " + data.address
    ];
    if (data.date) lines.push("Preferred Date: " + data.date);
    if (data.message.trim()) lines.push("Message: " + data.message.trim());
    return lines.join("\n");
  }

  if (openBookingBtn) {
    openBookingBtn.addEventListener('click', openBooking);
  }

  bookingClose.addEventListener('click', closeBooking);
  bookingOverlay.addEventListener('click', (e) => {
    if (e.target === bookingOverlay) closeBooking();
  });
  bookingDoneBtn.addEventListener('click', closeBooking);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingOverlay.classList.contains('open')) {
      closeBooking();
    }
  });

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const data = {
      name: document.getElementById('bkName').value,
      phone: document.getElementById('bkPhone').value,
      service: document.getElementById('bkService').value,
      address: document.getElementById('bkAddress').value,
      date: document.getElementById('bkDate').value,
      message: document.getElementById('bkMessage').value
    };

    if (!validate(data)) return;

    const submitBtn = bookingForm.querySelector('.booking-submit');
    submitBtn.disabled = true;

    // Save the booking to the backend so it shows up in the admin panel.
    // If the backend is unreachable (e.g. not deployed yet, or offline),
    // we still let the customer continue via WhatsApp rather than blocking them.
    try {
      await fetch(API_BASE_URL + '/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          service: data.service,
          address: data.address,
          date: data.date,
          message: data.message
        })
      });
    } catch (err) {
      console.warn('Could not reach booking backend, continuing via WhatsApp only:', err);
    }

    const message = buildWhatsAppMessage(data);
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener');

    submitBtn.disabled = false;
    bookingForm.style.display = 'none';
    bookingSuccess.classList.add('open');
    bookingForm.reset();
  });
})();

/* =========================================================================
   CONTACT FORM — "Contact Us" section
   -------------------------------------------------------------------------
   Same as the booking form: saves the message to the backend (so it shows
   up in the admin panel), then opens WhatsApp with the message pre-filled.
========================================================================= */
(function () {
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  const contactDoneBtn = document.getElementById('contactDoneBtn');
  if (!contactForm) return;

  function clearErrors() {
    contactForm.querySelectorAll('.booking-field').forEach(f => f.classList.remove('has-error'));
    contactForm.querySelectorAll('.booking-error').forEach(e => e.textContent = '');
  }

  function setError(fieldId, message) {
    const field = document.getElementById(fieldId).closest('.booking-field');
    const errorEl = contactForm.querySelector('[data-error-for="' + fieldId + '"]');
    field.classList.add('has-error');
    errorEl.textContent = message;
  }

  function isValidPhone(value) {
    return value.replace(/\D/g, '').length >= 10;
  }

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('ctName').value;
    const phone = document.getElementById('ctPhone').value;
    const message = document.getElementById('ctMessage').value;

    let valid = true;
    if (!name.trim()) { setError('ctName', 'Please enter your name'); valid = false; }
    if (!phone.trim()) {
      setError('ctPhone', 'Please enter your phone number'); valid = false;
    } else if (!isValidPhone(phone)) {
      setError('ctPhone', 'Please enter a valid 10-digit phone number'); valid = false;
    }
    if (!message.trim()) { setError('ctMessage', 'Please enter a message'); valid = false; }
    if (!valid) return;

    const submitBtn = contactForm.querySelector('.contact-submit');
    submitBtn.disabled = true;

    // Save the message to the backend so it shows up in the admin panel.
    // If the backend is unreachable, still let the customer continue via WhatsApp.
    try {
      await fetch(API_BASE_URL + '/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message: message.trim() })
      });
    } catch (err) {
      console.warn('Could not reach contact backend, continuing via WhatsApp only:', err);
    }

    const text = "New Contact Message\n\nName: " + name + "\nPhone: " + phone + "\nMessage: " + message.trim();
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener');

    submitBtn.disabled = false;
    contactForm.style.display = 'none';
    contactSuccess.classList.add('open');
    contactForm.reset();
  });

  if (contactDoneBtn) {
    contactDoneBtn.addEventListener('click', () => {
      contactSuccess.classList.remove('open');
      contactForm.style.display = 'flex';
    });
  }
})();

/* =========================================================================
   NAV — active link highlighting on scroll
   -------------------------------------------------------------------------
   Highlights the nav item for whichever section is currently in view.
========================================================================= */
(function () {
  const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  function updateActiveLink() {
    let current = sections[0];
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        current = section;
      }
    });

    navLinks.forEach(link => {
      const li = link.closest('li');
      const targetId = link.getAttribute('href').slice(1);
      li.classList.toggle('active', targetId === current.id);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();