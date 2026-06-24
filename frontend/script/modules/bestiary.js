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
  mapinguari: {
    name: 'MAPINGUARI',
    biome: 'Amazônia',
    desc: 'Gigante peludo com olho no ventre e boca no meio do tronco. Sua gritaria paralisa de medo. Guardião das fronteiras da floresta, pune com ferocidade quem profana a mata.',
  },
  iara: {
    name: 'IARA',
    biome: 'Rios da Amazônia',
    desc: 'Mãe das Águas. Sereia de cabelos verdes e pele cor de cobre. Seu canto hipnótico arrasta os homens para o fundo dos rios. Nenhum pescador que a viu voltou para contar.',
  },
  boto: {
    name: 'BOTO-COR-DE-ROSA',
    biome: 'Rios da Amazônia',
    desc: 'Encantado das águas. Nas noites de festa ribeirinha, toma a forma de um homem elegante de terno branco e chapéu, sempre escondendo o orifício no topo da cabeça. Sedutor e ardiloso, encanta os incautos e os leva para o fundo do rio.',
  },
  'mula-sem-cabeca': {
    name: 'MULA SEM CABEÇA',
    biome: 'Estradas Coloniais',
    desc: 'Mulher amaldiçoada por profanar o sagrado, condenada a galopar como uma mula com fogo no lugar da cabeça. Da quinta-feira à meia-noite, suas patas em brasa ecoam pelos caminhos, e quem cruza seu trajeto arde com sua maldição.',
  },
};

const TOTAL_MONSTERS = Object.keys(MONSTER_DATA).length;

export function initBestiary() {
  document.querySelectorAll('.monster-card').forEach(card => {
    const btn = card.querySelector('.monster-card__inner');
    btn?.addEventListener('click', () => revealMonster(card));
    btn?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        revealMonster(card);
      }
    });
  });

  // Restore previously discovered monsters from persisted state
  state.discoveredMonsters.forEach(id => {
    const card = document.querySelector(`.monster-card[data-monster="${id}"]`);
    if (card && card.classList.contains('locked')) restoreMonster(card, id);
  });

  updateCodexCount();
}

function restoreMonster(card, id) {
  const data = MONSTER_DATA[id];
  if (!data) return;
  card.classList.remove('locked');
  card.classList.add('revealed');
  const nameEl  = card.querySelector('.monster-name');
  const biomeEl = card.querySelector('.monster-biome');
  const descEl  = card.querySelector('.monster-desc');
  if (nameEl)  nameEl.textContent  = data.name;
  if (biomeEl) biomeEl.textContent = data.biome;
  if (descEl)  descEl.textContent  = data.desc;
  const btn = card.querySelector('.monster-card__inner');
  if (btn) btn.setAttribute('aria-label', `${data.name} — ${data.biome} — entrada no Codex revelada`);
}

function revealMonster(card) {
  const id = card.dataset.monster;
  const data = MONSTER_DATA[id];
  if (!data || !card.classList.contains('locked')) return;

  card.classList.remove('locked');
  card.classList.add('revealed');
  discoverMonster(id);

  const nameEl  = card.querySelector('.monster-name');
  const biomeEl = card.querySelector('.monster-biome');
  const descEl  = card.querySelector('.monster-desc');
  if (nameEl)  nameEl.textContent  = data.name;
  if (biomeEl) biomeEl.textContent = data.biome;
  if (descEl)  descEl.textContent  = data.desc;

  const btn = card.querySelector('.monster-card__inner');
  if (btn) btn.setAttribute('aria-label', `${data.name} — ${data.biome} — entrada no Codex revelada`);

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
  if (fill) fill.style.width = `${(count / TOTAL_MONSTERS) * 100}%`;
}
