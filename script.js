const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');
const themeToggle = document.querySelector('.theme-toggle');
const year = document.querySelector('#year');
const revealElements = document.querySelectorAll('.reveal');
const backToTop = document.querySelector('#backToTop');

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.textContent = '☀️';
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => observer.observe(element));

if (backToTop) {
  backToTop.addEventListener('click', (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
