// Layout compartilhado — injeta o header (navbar) e o footer em todas as páginas.
// FONTE ÚNICA DE VERDADE do menu: para adicionar/remover/renomear um item,
// edite SOMENTE o array NAV_ITEMS abaixo.

const NAV_ITEMS = [
  { href: 'index.html',            page: 'inicio',           label: 'Início' },
  { href: 'o-jogo.html',           page: 'o-jogo',           label: 'O Jogo' },
  { href: 'monstruario.html',      page: 'monstruario',      label: 'Monstruário' },
  { href: 'trailer.html',          page: 'trailer',          label: 'Trailer' },
  { href: 'cadastro.html',         page: 'cadastro',         label: 'Cadastro', cta: true },
  { href: 'dashboard.html',        page: 'dashboard',        label: 'Dashboard' },
  { href: 'loja.html',             page: 'loja',             label: 'Loja' },
  { href: 'projetos-futuros.html', page: 'projetos-futuros', label: 'Proj. Futuros' },
];

const GITHUB_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>';

export function initLayout() {
  const active = document.body.dataset.page || '';
  injectHeader(active);
  injectFooter();
}

function injectHeader(active) {
  const mount = document.getElementById('site-header');
  if (!mount) return;

  const links = NAV_ITEMS.map(i => {
    const cls = ['nav-link'];
    if (i.cta) cls.push('nav-link--cta');
    if (i.page === active) cls.push('active');
    const current = i.page === active ? ' aria-current="page"' : '';
    return `<li><a href="${i.href}" class="${cls.join(' ')}"${current}>${i.label}</a></li>`;
  }).join('');

  mount.innerHTML = `
  <header id="navbar" role="banner">
    <nav class="nav-inner" aria-label="Navegação principal">
      <a href="index.html" class="nav-logo" aria-label="Início — Anahí, Ipê Arc Studios">
        <span class="nav-logo__title">ANAHÍ</span>
        <span class="nav-logo__studio">Ipê Arc Studios</span>
      </a>

      <div id="class-indicator" class="class-indicator" aria-label="Classe selecionada">
        <span id="class-indicator-icon" aria-hidden="true">⚔</span>
        <span id="class-indicator-name">Guerreiro</span>
      </div>

      <button id="nav-toggle" class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Abrir menu de navegação">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>

      <ul id="nav-links" class="nav-links" role="list">
        ${links}
      </ul>
    </nav>
  </header>`;
}

function injectFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;

  const footLinks = NAV_ITEMS
    .map(i => `<li><a href="${i.href}">${i.label.replace('Proj.', 'Projetos')}</a></li>`)
    .join('');

  mount.innerHTML = `
  <footer class="site-footer" role="contentinfo">
    <div class="footer-inner">
      <div class="footer-brand">
        <p class="footer-logo">IPÊ ARC STUDIOS</p>
        <p class="footer-tagline">ANAHÍ — Projeto 3F</p>
        <p class="footer-tagline-sub">Fauna, flora e folclore brasileiros.</p>
        <a href="https://github.com/ViBl4ck/Projeto-Integrador-1" class="footer-github-link" aria-label="Repositório do projeto no GitHub" target="_blank" rel="noopener noreferrer">${GITHUB_ICON}GitHub</a>
      </div>
      <nav class="footer-nav" aria-label="Links de navegação do rodapé">
        <p class="footer-nav__title">NAVEGAÇÃO</p>
        <ul role="list">${footLinks}</ul>
      </nav>
      <div class="footer-credits">
        <p class="footer-credits__title">EQUIPE</p>
        <ul class="footer-credits__list" role="list">
          <li>Vítor Camargo</li>
          <li>Luís Eduardo Carvalho Ferreira</li>
          <li>Rodrigo Seabra</li>
          <li>Raphael Savini</li>
          <li>João Pedro de Melo Naves</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Ipê Arc Studios · Anahí (Projeto 3F) · Todos os direitos reservados</p>
      <p>Jogo em desenvolvimento. Fauna e folclore retratados com respeito às fontes originais.</p>
    </div>
  </footer>`;
}
