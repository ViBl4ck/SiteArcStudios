import { setJourneyProgress } from './state.js';

// Navegação multipágina + menu hambúrguer (todas as larguras).
// O link ativo é definido pelo layout.js (com base em <body data-page>),
// não mais por scroll.

export function initNav() {
  const navbar      = document.getElementById('navbar');
  const toggle      = document.getElementById('nav-toggle');
  const navLinks    = document.getElementById('nav-links');
  const journeyFill = document.getElementById('journey-fill');
  const journeyWrap = document.getElementById('journey-wrap');
  if (!navbar) return;

  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('open');
  };
  const openMenu = () => {
    toggle?.setAttribute('aria-expanded', 'true');
    navLinks?.classList.add('open');
  };

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  // Fecha ao clicar num link (navegação para outra página)
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Esc fecha
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
      closeMenu();
      toggle?.focus();
    }
  });

  // Clique fora fecha
  document.addEventListener('click', e => {
    if (!navLinks?.classList.contains('open')) return;
    if (navbar.contains(e.target)) return;
    closeMenu();
  });

  // Estado "scrolled" + barra de progresso (por página)
  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
    setJourneyProgress(pct);
    if (journeyFill) journeyFill.style.width = `${pct}%`;
    if (journeyWrap) journeyWrap.setAttribute('aria-valuenow', String(pct));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
