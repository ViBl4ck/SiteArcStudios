import { state, setJourneyProgress } from './state.js';

const navbar   = document.getElementById('navbar');
const toggle   = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const journeyFill  = document.getElementById('journey-fill');
const journeyWrap  = document.getElementById('journey-wrap');

const SECTIONS = ['inicio','o-jogo','monstruario','trailer','cadastro','dashboard','projetos-futuros'];

export function initNav() {
  // Scroll: navbar bg + journey bar + active link
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open', !expanded);
  });

  // Smooth scroll + close mobile menu on link click
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY
                     - 80 - 5; // nav + journey bar
      window.scrollTo({ top: offset, behavior: 'smooth' });
      // close mobile menu
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });

  // Keyboard: close menu on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      toggle.focus();
    }
  });

  // Click outside: close mobile menu
  document.addEventListener('click', e => {
    if (!navLinks.classList.contains('open')) return;
    if (navbar.contains(e.target)) return;
    toggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  });
}

function onScroll() {
  const scrollY = window.scrollY;

  // Navbar background
  if (scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Journey / XP bar
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0;
  setJourneyProgress(pct);
  journeyFill.style.width = `${pct}%`;
  journeyWrap.setAttribute('aria-valuenow', String(pct));

  // Active nav link
  highlightActiveSection();
}

function highlightActiveSection() {
  const threshold = 120;
  let current = '';
  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= threshold) {
      current = id;
    }
  }
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href').slice(1);
    a.classList.toggle('active', href === current);
  });
}

export function updateJourneyUI(pct) {
  const fill = document.getElementById('dashboard-journey-fill');
  const label = document.getElementById('dashboard-journey-pct');
  if (fill)  fill.style.width = `${pct}%`;
  if (label) label.textContent = `${pct}%`;
  const bar = fill?.closest('[role="progressbar"]');
  if (bar) bar.setAttribute('aria-valuenow', String(pct));
}
