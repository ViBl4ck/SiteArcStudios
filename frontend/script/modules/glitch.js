// Glitch section: "Projetos Futuros"
// CSS handles the main animations; this adds a random noise layer

export function initGlitch() {
  const section = document.getElementById('projetos-futuros');
  if (!section) return;

  setInterval(() => {
    if (!isVisible(section)) return;
    triggerJsGlitch(section);
  }, 3000 + Math.random() * 4000);
}

function triggerJsGlitch(section) {
  const title = section.querySelector('.glitch-title');
  if (!title) return;

  title.style.transition = 'none';
  title.style.transform = `translate(${randInt(-4, 4)}px, ${randInt(-2, 2)}px)`;
  title.style.filter = `hue-rotate(${randInt(60, 180)}deg) saturate(2)`;

  setTimeout(() => {
    title.style.transform = '';
    title.style.filter = '';
    title.style.transition = '';
  }, 80 + Math.random() * 120);
}

function isVisible(el) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
