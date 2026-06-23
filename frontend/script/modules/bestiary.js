import { state, discoverMonster } from './state.js';
import { showToast } from './toast.js';

const MONSTER_DATA = {
  cuca: {
    name: 'CUCA',
    biome: 'Mata Atlântica',
    desc: 'Feiticeira ancestral que assume a forma de um jacaré-açu nas águas fundas. Sua forma real é mais antiga e aterrorizante do que as histórias de ninar sugerem.',
  },
  saci: {
    name: 'SACI-PERERÊ',
    biome: 'Mata Atlântica',
    desc: 'Espírito de uma perna só, fumando seu cachimbo de barro. Controla os ventos e se move pelo redemoinho. Guardião de fronteiras entre o mundo dos vivos e dos mortos.',
  },
  curupira: {
    name: 'CURUPIRA',
    biome: 'Mata Atlântica',
    desc: 'Protetor feroz da fauna e da flora. Seus pés virados para trás confundem caçadores. Aqueles que derrubam árvores sem necessidade nunca encontram o caminho de volta.',
  },
  boitata: {
    name: 'BOITATÁ',
    biome: 'Caatinga',
    desc: 'Cobra de fogo que protege campos e matas. Nasceu de uma grande cobra que sobreviveu ao dilúvio. Seus olhos flamejantes queimam quem profana a natureza.',
  },
  'corpo-seco': {
    name: 'CORPO SECO',
    biome: 'Caatinga',
    desc: 'Amaldiçoado em vida por crimes contra família e terra. Não pode ser aceito pela terra nem pelo céu. Vaga pela caatinga, mumificado e sedento, corrompendo tudo que toca.',
  },
};

export function initBestiary() {
  document.querySelectorAll('.monster-card').forEach(card => {
    const btn = card.querySelector('.monster-card__inner');
    btn?.addEventListener('click', () => revealMonster(card));
    // Keyboard support
    btn?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        revealMonster(card);
      }
    });
  });
}

function revealMonster(card) {
  const id = card.dataset.monster;
  const data = MONSTER_DATA[id];
  if (!data || !card.classList.contains('locked')) return;

  // Mark revealed
  card.classList.remove('locked');
  card.classList.add('revealed');
  discoverMonster(id);

  // Update card text
  const nameEl  = card.querySelector('.monster-name');
  const biomeEl = card.querySelector('.monster-biome');
  const descEl  = card.querySelector('.monster-desc');
  if (nameEl)  nameEl.textContent  = data.name;
  if (biomeEl) biomeEl.textContent = data.biome;
  if (descEl)  descEl.textContent  = data.desc;

  // Update aria-label on button
  const btn = card.querySelector('.monster-card__inner');
  if (btn) btn.setAttribute('aria-label', `${data.name} — ${data.biome} — entrada no Codex revelada`);

  // Update codex count
  updateCodexCount();

  showToast(
    'NOVA ENTRADA NO CODEX!',
    `${data.name} — ${data.biome}`,
    'unlock'
  );
}

function updateCodexCount() {
  const count = state.discoveredMonsters.size;

  const countEl = document.getElementById('codex-count');
  if (countEl) countEl.textContent = count;

  const dashCount = document.getElementById('codex-count-dashboard');
  if (dashCount) dashCount.textContent = count;

  const fill = document.getElementById('codex-dashboard-fill');
  if (fill) fill.style.width = `${(count / 5) * 100}%`;
}
