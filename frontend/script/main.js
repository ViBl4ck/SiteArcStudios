// Anahí — Ipê Arc Studios
// Main entry point (ES Module — requires HTTP server, e.g. VS Code Live Server)

import { initLayout }          from './modules/layout.js';
import { initNav }             from './modules/nav.js';
import { initClasses, selectClass } from './modules/classes.js';
import { initBestiary }        from './modules/bestiary.js';
import { initAuth }            from './modules/auth.js';
import { initShop }            from './modules/shop.js';
import { initGlitch }          from './modules/glitch.js';
import { initReveal }          from './modules/reveal.js';
import { state }               from './modules/state.js';

document.addEventListener('DOMContentLoaded', () => {
  initLayout();   // injeta header + footer ANTES de tudo
  initNav();
  initClasses();
  initBestiary();
  initAuth();
  initShop();
  initGlitch();
  initReveal();

  // Restore persisted class on load
  selectClass(state.currentClass, { silent: true });
});
