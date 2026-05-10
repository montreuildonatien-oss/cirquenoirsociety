document.getElementById('year').textContent = new Date().getFullYear();

// Reveal
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Modal
const modal = document.getElementById('tableModal');
const openBtn = document.getElementById('openTableModal');
const closeOverlay = document.getElementById('closeTableModal');
const closeX = document.getElementById('xTableModal');

function openModal(){ modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeModal(){ modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
openBtn?.addEventListener('click', openModal);
closeOverlay?.addEventListener('click', closeModal);
closeX?.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Forms via mailto (front only)
const DEST_EMAIL = 'hello@cirquenoirsociety.com';
function mailto(subject, body){
  window.location.href = `mailto:${encodeURIComponent(DEST_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const guestlistForm = document.getElementById('guestlistForm');
const formStatus = document.getElementById('formStatus');

guestlistForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(guestlistForm);
  formStatus.textContent = 'Prêt — ouverture de ton client mail…';
  const body = `GUESTLIST APPLICATION

Nom: ${data.get('name')}
Email: ${data.get('email')}
Instagram: ${data.get('instagram')}
Nb: ${data.get('groupSize')}

Message:
${data.get('message') || '-'}
`;
  mailto('CNS — Guestlist Application', body);
  guestlistForm.reset();
});

const tableForm = document.getElementById('tableForm');
const tableStatus = document.getElementById('tableStatus');

tableForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(tableForm);
  tableStatus.textContent = 'Prêt — ouverture de ton client mail…';
  const body = `TABLE ENQUIRY

Nom: ${data.get('name')}
Email: ${data.get('email')}
Nb: ${data.get('groupSize')}
Budget: ${data.get('budget') || '-'}
Arrivée: ${data.get('arrival') || '-'}
`;
  mailto('CNS — Table Enquiry', body);
  tableForm.reset();
  setTimeout(closeModal, 300);
});

// --- PIMENT #2 : mouse -> CSS vars (spotlight) ---
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});

// --- PIMENT #3 : scrollspy simple ---
const navLinks = Array.from(document.querySelectorAll('.nav a'));
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = '#' + entry.target.id;
    navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
  });
}, { threshold: 0.55 });

sections.forEach(sec => spy.observe(sec));
``
// ===== button light follow mouse =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
  });
});