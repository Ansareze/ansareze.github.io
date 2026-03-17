// ─── DARK MODE (not needed for dark-first but keep toggle) ───
// This site is dark-first, no light mode toggle needed

// ─── HAMBURGER MENU ───
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navUl.classList.toggle('open');
  });
  navUl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navUl.classList.remove('open');
    });
  });
}

// ─── SCROLL PROGRESS BAR ───
const progressBar = document.querySelector('.scroll-progress');
function updateProgress() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (progressBar && scrollHeight > 0) progressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
}

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
function updateActiveNav() {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 200;
    if (window.scrollY >= top) current = s.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// Combined scroll handler
window.addEventListener('scroll', () => {
  updateProgress();
  updateActiveNav();
}, { passive: true });

// ─── SCROLL REVEAL (IntersectionObserver) ───
const srElements = document.querySelectorAll('.sr');
const observerSR = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerSR.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
srElements.forEach(el => observerSR.observe(el));

// ─── TYPING EFFECT ───
const typedEl = document.querySelector('.typed-text');
if (typedEl) {
  const words = ['NLP', 'Time Series', 'Forecasting', 'Deep Learning', 'Machine Learning', 'Data Visualization'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  function typeLoop() {
    const current = words[wordIndex];
    typedEl.textContent = current.substring(0, charIndex);
    if (!isDeleting) {
      charIndex++;
      if (charIndex > current.length) { isDeleting = true; setTimeout(typeLoop, 2000); return; }
    } else {
      charIndex--;
      if (charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
    }
    setTimeout(typeLoop, isDeleting ? 40 : 90);
  }
  typeLoop();
}

// ─── SMOOTH ANCHOR SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
