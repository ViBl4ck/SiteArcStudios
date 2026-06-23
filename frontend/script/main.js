// Anahí — Ipê Arc Studios
// Main entry point (ES Module — requires HTTP server, e.g. VS Code Live Server)

import { initNav }      from './modules/nav.js';
import { initClasses, selectClass } from './modules/classes.js';
import { initBestiary } from './modules/bestiary.js';
import { initAuth }     from './modules/auth.js';
import { initGlitch }   from './modules/glitch.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initClasses();
  initBestiary();
  initAuth();
  initGlitch();
  initReveal();

  // Set default class
  selectClass('guerreiro', { silent: true });
});

// IntersectionObserver — reveal sections on scroll
function initReveal() {
  const targets = document.querySelectorAll(
    '.section-header, .feature-block, .biome-card, .class-card, .monster-card, .codex-promo, .pitch-block, .player-card, .game-owned-card, .codex-widget, .glitch-content, .terminal-block'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}
