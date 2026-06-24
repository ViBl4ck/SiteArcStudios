import { state, setJourneyProgress } from './state.js';

const navbar   = document.getElementById('navbar');
const toggle   = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const journeyFill  = document.getElementById('journey-fill');
const journeyWrap  = document.getElementById('journey-wrap');

const SECTIONS = ['inicio','o-jogo','monstruario','trailer','cadastro','dashboard','projetos-futuros'];

export function initNav() {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open', !expanded);
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80 - 5;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      toggle.focus();
    }
  });

  document.addEventListener('click', e => {
    if (!navLinks.classList.contains('open')) return;
    if (navbar.contains(e.target)) return;
    toggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  });
}

function onScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.round((scrollY / docHeight) * 100) : 0;
  setJourneyProgress(pct);
  journeyFill.style.width = `${pct}%`;
  journeyWrap.setAttribute('aria-valuenow', String(pct));

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

