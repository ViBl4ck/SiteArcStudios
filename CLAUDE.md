# CLAUDE.md — SiteArcStudios

Arquivo de contexto pro Claude Code. Lido no início de cada sessão.
Coloque na **raiz do repositório** (mesmo nível do `index.html`).

## O que é o projeto
Landing page do estúdio **Ipê Arc Studios** para o jogo **Anahí** — um
Metroidvania/RPG em **pixel art** ambientado no **folclore brasileiro**.
Protagonista: jovem guerreira **Tupi**. Cenário: **Mata Atlântica** e
**Caatinga**, no Brasil colonial do séc. XVII.

## Stack
- **HTML5 semântico + CSS (BEM) + JavaScript vanilla com ES modules**
- Sem framework, sem build step. Servido direto via **GitHub Pages**.
- Repositório: `github.com/ViBl4ck/SiteArcStudios` — branch `main`, deploy `/ (root)`
- URL pública: https://vibl4ck.github.io/SiteArcStudios/
- Repo compartilhado entre **ViBl4ck** (dono) e **LuisEdu17y** (colaborador).
  Sempre dar `git pull` antes de começar a mexer.

## Estrutura de arquivos
```
index.html                 # página única, na raiz
styles/style.css           # CSS completo (BEM, tema via var(--token))
script/main.js             # entry point (ES module)
script/modules/            # state.js, toast.js, nav.js, classes.js,
                           # bestiary.js, auth.js, glitch.js
assets/                    # imagens .webp otimizadas
  key-art/  protagonista/  classes/  biomas/  entidades/  sprites/
```

## Convenções
- **Commits em português**, formato `tipo: descrição` (feat / fix / chore / docs).
- **CSS**: classes BEM (`bloco__elemento--modificador`); cores e medidas via
  `var(--token)` definidos no `:root`.
- **JS**: ES modules puro, sem libs externas. O login/cadastro é **simulado**
  via `localStorage` (não é backend real).
- **Imagens**: sempre WebP otimizado; caminhos relativos (`assets/...`).
- Tema visual: pixel art, paleta escura/terrosa, fonte pixel para títulos.

## Estado atual (já implementado)
- Site no ar via GitHub Pages.
- **Navbar** com menu hamburguer responsivo (`@max-width: 900px`); fecha ao
  clicar num link, no `Escape` e **ao clicar fora** do menu.
- **Imagens reais integradas**: hero (key art), seção protagonista, 3 cards de
  classe (Guerreiro / Arqueiro / Curandeiro), 2 biomas (Mata Atlântica e
  Caatinga) e a capa no dashboard.
- **Monstruário reestruturado para 7 entidades** (contador `0/7`):
  Mapinguari, Iara, Anhangá, Caipora, Boitatá, Corpo Seco, Cuca.
  As descrições culturais de cada uma estão em `script/modules/bestiary.js`
  (objeto `MONSTER_DATA`), e o reveal/desbloqueio é controlado por esse módulo.

## Próximos passos (pendentes)
- Integrar a **segunda leva de imagens** (a chegar).
- Criar uma **galeria de pixel art** usando os 3 sprite sheets em
  `assets/sprites/` (guerreiro-sheet, arqueiro-sheet, curandeiro-sheet).
- Aproveitar as **4 paisagens extras** em `assets/biomas/`
  (veredas, araucarias, igapo-1, igapo-2) como fundos de seção ou novos
  cards de bioma.
- Conferir o **link do GitHub no rodapé** (já foi placeholder
  `PLACEHOLDER_GITHUB_REPO`; deve apontar pro repo do projeto).

## Como rodar localmente
Precisa de um servidor HTTP (os ES modules não funcionam via `file://`).
No VS Code, usar a extensão **Live Preview** / **Live Server**, ou:
`python -m http.server` e abrir `http://localhost:8000`.
