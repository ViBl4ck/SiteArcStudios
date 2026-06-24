# SiteArcStudios — Anahí

Landing page do jogo **Anahí**, desenvolvida por **Ipê Arc Studios**.  
Anahí é um Metroidvania/RPG em pixel art ambientado no folclore brasileiro, com protagonista Tupi e cenário na Mata Atlântica e Caatinga do Brasil colonial do séc. XVII.

---

## Objetivo do Projeto

Apresentar o jogo Anahí ao público, permitir cadastro de interessados no acesso antecipado e exibir o Monstruário interativo com entidades do folclore brasileiro.

---

## Tecnologias Utilizadas

- **HTML5 semântico** com atributos de acessibilidade (ARIA)
- **CSS3** com BEM, custom properties (`var(--token)`) e design responsivo
- **JavaScript vanilla** com ES Modules (sem frameworks, sem build step)
- Deploy via **GitHub Pages** — branch `main`, raiz `/`

Fontes externas (CDN):
- `Press Start 2P` — títulos pixel art
- `Rajdhani` — corpo do texto

---

## Estrutura de Diretórios

```
SiteArcStudios/
├── index.html                  # Redireciona para frontend/index.html
├── README.md
├── CLAUDE.md
├── frontend/
│   ├── index.html              # Página principal (single-page)
│   ├── styles/
│   │   └── style.css           # CSS completo (BEM, variáveis, responsivo)
│   ├── script/
│   │   ├── main.js             # Entry point — importa e inicializa módulos
│   │   └── modules/
│   │       ├── state.js        # Estado global com persistência (localStorage)
│   │       ├── nav.js          # Navbar, scroll, barra de jornada
│   │       ├── classes.js      # Seleção de classe (Guerreiro/Arqueiro/Curandeiro)
│   │       ├── auth.js         # Cadastro, login e dashboard do jogador
│   │       ├── bestiary.js     # Monstruário — dados e reveal das entidades
│   │       ├── shop.js         # Loja — produtos e interações
│   │       ├── reveal.js       # Animação de entrada das seções no scroll
│   │       ├── glitch.js       # Efeito glitch na seção Projetos Futuros
│   │       └── toast.js        # Notificações toast
│   └── assets/
│       └── images/             # Imagens do site (WebP otimizado)
└── backend/
    └── README.md               # Reservado para API futura
```

---

## Como Executar Localmente

ES Modules exigem servidor HTTP — não funcionam via `file://`.

**Opção 1 — VS Code Live Server / Live Preview**
1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito em [frontend/index.html](frontend/index.html).
3. Escolha "Open with Live Server" ou "Show Preview".

**Opção 2 — Python**
```bash
python -m http.server 8000
```
Acesse `http://localhost:8000/frontend/`.

**Opção 3 — Raiz com redirecionamento**
Abra [index.html](index.html) via servidor — ele redireciona automaticamente para `frontend/index.html`.

---

## Funcionalidades Implementadas

| Funcionalidade | Módulo |
|---|---|
| Navbar responsiva com menu hamburguer | `nav.js` |
| Barra de progresso da jornada (scroll) | `nav.js` |
| Seleção de classe com tema dinâmico (CSS var) | `classes.js` |
| Cadastro simulado com validação de campos | `auth.js` |
| Login simulado por e-mail (persiste entre reloads) | `auth.js` |
| Dashboard do jogador com progresso e Codex | `auth.js` |
| Monstruário com 7 entidades desbloqueáveis | `bestiary.js` |
| Loja com 3 produtos placeholder | `shop.js` |
| Galeria de sprites (3 cards de prévia) | `index.html` |
| Animação de reveal das seções no scroll | `reveal.js` |
| Efeito glitch na seção Projetos Futuros | `glitch.js` |
| Notificações toast por tipo (sucesso/erro/unlock) | `toast.js` |

**Entidades do Monstruário:** Cuca, Saci-Pererê, Curupira, Boitatá, Corpo Seco, Mapinguari, Iara.

---

## Funcionalidades Pendentes

- **Integração de imagens reais** — substituir placeholders por WebP da equipe.
- **Paisagens extras** — 4 biomas adicionais (veredas, araucárias, igapó) como cards ou fundos.
- **Trailer** — embed YouTube/Vimeo quando disponível.
- **Back-end real** — autenticação, banco de dados e API (pasta `backend/` reservada).

---

## Deploy via GitHub Pages

O site é publicado automaticamente pelo GitHub Pages a partir da branch `main`, raiz `/`.

- **URL pública:** https://vibl4ck.github.io/SiteArcStudios/
- **Repositório:** https://github.com/ViBl4ck/SiteArcStudios
- A raiz serve `index.html`, que redireciona para `frontend/index.html`.
- Nenhum build step necessário — HTML/CSS/JS puro.

Para publicar alterações: `git push origin main`.

---

## Equipe

- Vítor Camargo
- Luís Eduardo Carvalho Ferreira
- Rodrigo Seabra
- Raphael Savini
- João Pedro de Melo Naves

---

&copy; 2026 Ipê Arc Studios · Anahí (Projeto 3F) · Fauna e folclore retratados com respeito às fontes originais.
