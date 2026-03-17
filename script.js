// ─── DARK MODE TOGGLE ───
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const icon = toggleBtn.querySelector('i');

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  icon.classList.toggle('fa-moon', theme !== 'dark');
  icon.classList.toggle('fa-sun', theme === 'dark');
  localStorage.setItem('theme', theme);
}
toggleBtn.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});
(function() {
  setTheme(localStorage.getItem('theme') || 'light');
})();

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
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (progressBar) progressBar.style.width = (scrollTop / scrollHeight * 100) + '%';
});

// ─── NAV SCROLLED STATE ───
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
sections.forEach(s => observerNav.observe(s));

// ─── SCROLL REVEAL ───
const srElements = document.querySelectorAll('.sr');
const observerSR = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerSR.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
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
      if (charIndex > current.length) { isDeleting = true; setTimeout(typeLoop, 1800); return; }
    } else {
      charIndex--;
      if (charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
    }
    setTimeout(typeLoop, isDeleting ? 50 : 100);
  }
  typeLoop();
}

// ─── HERO PARTICLES (Canvas) ───
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resizeCanvas() {
    const hero = canvas.parentElement;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -10) this.reset(), this.y = canvas.height + 10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      const isDark = html.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark
        ? `rgba(129,140,248,${this.opacity})`
        : `rgba(99,102,241,${this.opacity})`;
      ctx.fill();
    }
  }

  const count = window.innerWidth < 600 ? 30 : 60;
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}
