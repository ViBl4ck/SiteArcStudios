const REVEAL_SELECTORS = [
  '.section-header', '.feature-block', '.biome-card', '.class-card',
  '.monster-card', '.codex-promo', '.pitch-block', '.player-card',
  '.game-owned-card', '.codex-widget', '.glitch-content', '.terminal-block',
].join(', ');

export function initReveal() {
  const targets = document.querySelectorAll(REVEAL_SELECTORS);
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
