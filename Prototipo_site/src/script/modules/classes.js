import { state, setClass } from './state.js';
import { showToast } from './toast.js';

const CLASS_DATA = {
  guerreiro: { icon: '⚔', name: 'Guerreiro',  label: 'Guerreiro' },
  arqueiro:  { icon: '🏹', name: 'Arqueiro',   label: 'Arqueiro' },
  curandeiro:{ icon: '🌿', name: 'Curandeiro', label: 'Curandeiro' },
};

const MESSAGES = {
  guerreiro:  'Urucum da raiva. Combate iniciado.',
  arqueiro:   'Arco tensionado. Alvo na mira.',
  curandeiro: 'Raízes da sabedoria. Cura ativada.',
};

export function initClasses() {
  // All class buttons across the page
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-class]');
    if (!btn) return;
    // Skip if it's a card container rather than an explicit class-select trigger
    const isCard = btn.classList.contains('class-card') && !e.target.closest('.btn--class, .class-btn');
    if (isCard) return;

    const cls = btn.dataset.class;
    if (!cls || !CLASS_DATA[cls]) return;
    selectClass(cls);
  });

  // Keyboard activation for class-cards
  document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectClass(card.dataset.class);
      }
    });
  });

  // Sync form radio with class state
  document.querySelectorAll('input[name="reg-class"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) selectClass(radio.value, { silent: true });
    });
  });
}

export function selectClass(cls, { silent = false } = {}) {
  if (!CLASS_DATA[cls]) return;
  setClass(cls);

  // Update html data-class (drives CSS --accent transition)
  document.documentElement.dataset.class = cls;

  // Update all class-btn active states
  document.querySelectorAll('.class-btn').forEach(btn => {
    const active = btn.dataset.class === cls;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  // Update class-card selected state
  document.querySelectorAll('.class-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.class === cls);
  });

  // Sync form radio
  const radio = document.querySelector(`input[name="reg-class"][value="${cls}"]`);
  if (radio) radio.checked = true;

  // Update nav class indicator
  const indicator = document.getElementById('class-indicator-icon');
  const indicatorName = document.getElementById('class-indicator-name');
  if (indicator) indicator.textContent = CLASS_DATA[cls].icon;
  if (indicatorName) indicatorName.textContent = CLASS_DATA[cls].name;

  // Update dashboard player avatar/class tag
  const avatar = document.getElementById('player-avatar');
  const classTag = document.getElementById('player-display-class');
  if (avatar) avatar.textContent = CLASS_DATA[cls].icon;
  if (classTag) classTag.textContent = cls.charAt(0).toUpperCase() + cls.slice(1);

  if (!silent) {
    showToast(`CLASSE: ${CLASS_DATA[cls].name.toUpperCase()}`, MESSAGES[cls], 'system');
  }
}
