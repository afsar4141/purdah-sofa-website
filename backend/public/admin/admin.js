/**
 * admin.js
 * -----------------------------------------------------------------------
 * Powers the dashboard.html page: checks login, loads bookings/contacts
 * from the API, renders tables, and handles status changes + deletes.
 * -----------------------------------------------------------------------
 */

const API_BASE = window.location.origin;

const BOOKING_STATUSES = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];
const CONTACT_STATUSES = ['New', 'Replied', 'Closed'];
const WORKER_STATUSES = ['New', 'Contacted', 'Approved', 'Rejected'];

let bookingsData = [];
let contactsData = [];
let workersData = [];

// ---------------------------------------------------------------------
// Auth check — redirect to login if not authenticated
// ---------------------------------------------------------------------
async function checkAuth() {
  try {
    const res = await fetch(API_BASE + '/api/admin/session', { credentials: 'include' });
    const data = await res.json();
    if (!data.loggedIn) {
      window.location.href = 'login.html';
      return;
    }
    document.getElementById('adminUsername').textContent = data.username;
  } catch (err) {
    window.location.href = 'login.html';
  }
}

// ---------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------
document.getElementById('logoutBtn').addEventListener('click', async () => {
  await fetch(API_BASE + '/api/admin/logout', { method: 'POST', credentials: 'include' });
  window.location.href = 'login.html';
});

// ---------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------
function formatDate(isoString) {
  if (!isoString) return '—';
  const d = new Date(isoString);
  if (isNaN(d)) return isoString;
  return d.toLocaleString(undefined, {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildStatusSelect(id, currentStatus, statusList, type) {
  const options = statusList.map(s =>
    `<option value="${s}" ${s === currentStatus ? 'selected' : ''}>${s}</option>`
  ).join('');
  return `<select class="status-select status-${currentStatus}" data-id="${id}" data-type="${type}">${options}</select>`;
}

// ---------------------------------------------------------------------
// Load bookings
// ---------------------------------------------------------------------
async function loadBookings() {
  const loadingEl = document.getElementById('bookingsLoading');
  const emptyEl = document.getElementById('bookingsEmpty');
  const tbody = document.getElementById('bookingsTableBody');

  loadingEl.style.display = 'block';
  emptyEl.style.display = 'none';
  tbody.innerHTML = '';

  try {
    const res = await fetch(API_BASE + '/api/bookings', { credentials: 'include' });
    if (res.status === 401) { window.location.href = 'login.html'; return; }
    bookingsData = await res.json();

    loadingEl.style.display = 'none';
    document.getElementById('tabCountBookings').textContent = bookingsData.length;
    document.getElementById('statTotalBookings').textContent = bookingsData.length;
    document.getElementById('statNewBookings').textContent =
      bookingsData.filter(b => b.status === 'New').length;

    if (bookingsData.length === 0) {
      emptyEl.style.display = 'block';
      return;
    }

    tbody.innerHTML = bookingsData.map(b => `
      <tr data-row-id="${b.id}">
        <td>${escapeHtml(b.name)}</td>
        <td><a href="tel:${escapeHtml(b.phone)}">${escapeHtml(b.phone)}</a></td>
        <td>${escapeHtml(b.service)}</td>
        <td class="wrap-text">${escapeHtml(b.address)}</td>
        <td class="muted">${b.preferred_date ? escapeHtml(b.preferred_date) : '—'}</td>
        <td class="wrap-text muted">${b.message ? escapeHtml(b.message) : '—'}</td>
        <td class="muted">${formatDate(b.created_at)}</td>
        <td>${buildStatusSelect(b.id, b.status, BOOKING_STATUSES, 'bookings')}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn delete-btn" data-delete-id="${b.id}" data-delete-type="bookings" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    loadingEl.textContent = 'Could not load bookings. Is the backend running?';
  }
}

// ---------------------------------------------------------------------
// Load contacts
// ---------------------------------------------------------------------
async function loadContacts() {
  const loadingEl = document.getElementById('contactsLoading');
  const emptyEl = document.getElementById('contactsEmpty');
  const tbody = document.getElementById('contactsTableBody');

  loadingEl.style.display = 'block';
  emptyEl.style.display = 'none';
  tbody.innerHTML = '';

  try {
    const res = await fetch(API_BASE + '/api/contacts', { credentials: 'include' });
    if (res.status === 401) { window.location.href = 'login.html'; return; }
    contactsData = await res.json();

    loadingEl.style.display = 'none';
    document.getElementById('tabCountContacts').textContent = contactsData.length;
    document.getElementById('statTotalContacts').textContent = contactsData.length;
    document.getElementById('statNewContacts').textContent =
      contactsData.filter(c => c.status === 'New').length;

    if (contactsData.length === 0) {
      emptyEl.style.display = 'block';
      return;
    }

    tbody.innerHTML = contactsData.map(c => `
      <tr data-row-id="${c.id}">
        <td>${escapeHtml(c.name)}</td>
        <td><a href="tel:${escapeHtml(c.phone)}">${escapeHtml(c.phone)}</a></td>
        <td class="wrap-text">${escapeHtml(c.message)}</td>
        <td class="muted">${formatDate(c.created_at)}</td>
        <td>${buildStatusSelect(c.id, c.status, CONTACT_STATUSES, 'contacts')}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn delete-btn" data-delete-id="${c.id}" data-delete-type="contacts" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    loadingEl.textContent = 'Could not load messages. Is the backend running?';
  }
}

// ---------------------------------------------------------------------
// Load worker registrations
// ---------------------------------------------------------------------
async function loadWorkers() {
  const loadingEl = document.getElementById('workersLoading');
  const emptyEl = document.getElementById('workersEmpty');
  const tbody = document.getElementById('workersTableBody');

  loadingEl.style.display = 'block';
  emptyEl.style.display = 'none';
  tbody.innerHTML = '';

  try {
    const res = await fetch(API_BASE + '/api/workers', { credentials: 'include' });
    if (res.status === 401) { window.location.href = 'login.html'; return; }
    workersData = await res.json();

    loadingEl.style.display = 'none';
    document.getElementById('tabCountWorkers').textContent = workersData.length;
    document.getElementById('statNewWorkers').textContent =
      workersData.filter(w => w.status === 'New').length;

    if (workersData.length === 0) {
      emptyEl.style.display = 'block';
      return;
    }

    tbody.innerHTML = workersData.map(w => `
      <tr data-row-id="${w.id}">
        <td>${escapeHtml(w.name)}</td>
        <td><a href="tel:${escapeHtml(w.phone)}">${escapeHtml(w.phone)}</a></td>
        <td>${escapeHtml(w.skill)}</td>
        <td class="muted">${w.experience ? escapeHtml(w.experience) : '—'}</td>
        <td class="wrap-text">${escapeHtml(w.area)}</td>
        <td class="muted">${formatDate(w.created_at)}</td>
        <td>${buildStatusSelect(w.id, w.status, WORKER_STATUSES, 'workers')}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn delete-btn" data-delete-id="${w.id}" data-delete-type="workers" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    loadingEl.textContent = 'Could not load worker registrations. Is the backend running?';
  }
}

// ---------------------------------------------------------------------
// Status change + delete (event delegation, works for both tables)
// ---------------------------------------------------------------------
document.addEventListener('change', async (e) => {
  if (!e.target.classList.contains('status-select')) return;

  const id = e.target.dataset.id;
  const type = e.target.dataset.type; // "bookings" or "contacts"
  const newStatus = e.target.value;

  try {
    const res = await fetch(`${API_BASE}/api/${type}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('Update failed');

    // Update the select's color class to match new status
    e.target.className = 'status-select status-' + newStatus;

    if (type === 'bookings') {
      bookingsData = bookingsData.map(b => b.id === id ? { ...b, status: newStatus } : b);
      document.getElementById('statNewBookings').textContent =
        bookingsData.filter(b => b.status === 'New').length;
    } else if (type === 'contacts') {
      contactsData = contactsData.map(c => c.id === id ? { ...c, status: newStatus } : c);
      document.getElementById('statNewContacts').textContent =
        contactsData.filter(c => c.status === 'New').length;
    } else if (type === 'workers') {
      workersData = workersData.map(w => w.id === id ? { ...w, status: newStatus } : w);
      document.getElementById('statNewWorkers').textContent =
        workersData.filter(w => w.status === 'New').length;
    }
  } catch (err) {
    alert('Could not update status. Please try again.');
  }
});

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.delete-btn');
  if (!btn) return;

  const id = btn.dataset.deleteId;
  const type = btn.dataset.deleteType;

  const confirmed = confirm('Delete this entry permanently? This cannot be undone.');
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_BASE}/api/${type}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Delete failed');

    if (type === 'bookings') {
      await loadBookings();
    } else if (type === 'contacts') {
      await loadContacts();
    } else if (type === 'workers') {
      await loadWorkers();
    }
  } catch (err) {
    alert('Could not delete this entry. Please try again.');
  }
});

// ---------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------
(async function init() {
  await checkAuth();
  await loadBookings();
  await loadContacts();
  await loadWorkers();
})();