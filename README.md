# SiteArcStudios

SiteArcStudios é a base do projeto do jogo Anahí, com o front-end separado da futura camada de back-end.
O site principal fica em [frontend/index.html](frontend/index.html) e a raiz do repositório apenas redireciona para ele.

## Visão Geral

O sistema atual funciona como uma landing page interativa do projeto.
Ele apresenta a proposta do jogo, mostra o monstruário, permite selecionar classes, simula cadastro e login, e exibe um dashboard com progresso e Codex.

### O que já existe

- Página inicial com navegação e hero.
- Seções de apresentação do jogo, biomas, classes e monstruário.
- Cadastro e login simulados no front-end.
- Dashboard com progresso da jornada e codex pessoal.
- Seção de projetos futuros com efeito glitch.
- Pasta dedicada para imagens do site em [frontend/assets/images/](frontend/assets/images/).
- Base de back-end separada em [backend/](backend/), com [backend/.env](backend/.env).

### O que ainda é base de estrutura

- O back-end ainda não tem rotas, banco ou autenticação real.
- Os dados atuais são mantidos só em memória no navegador, sem persistência.
- As imagens do site ainda podem ser substituídas pelos arquivos finais da equipe.

## Estrutura do Projeto

- [frontend/](frontend/) - interface do site.
- [frontend/index.html](frontend/index.html) - entrada principal do front-end.
- [frontend/script/](frontend/script/) - JavaScript do site.
- [frontend/styles/](frontend/styles/) - estilos do projeto.
- [frontend/assets/images/](frontend/assets/images/) - imagens, sprites, banners e prints.
- [backend/](backend/) - base para a API futura.
- [backend/.env](backend/.env) - variáveis locais do ambiente.

## Como Executar

### Opção 1 - Live Server

1. Abra o projeto no VS Code.
2. Clique com o botão direito em [frontend/index.html](frontend/index.html).
3. Escolha "Open with Live Server".

### Opção 2 - Abrir pelo navegador com servidor local

1. Inicie qualquer servidor HTTP local na pasta do projeto.
2. Abra [frontend/index.html](frontend/index.html) no navegador.

### Opção 3 - A partir da raiz

1. Abra [index.html](index.html).
2. O arquivo raiz redireciona automaticamente para o front-end.

## Como Usar o Sistema

### Navegação

Use o menu superior para ir até as seções principais do site:

- Início
- O Jogo
- Monstruário
- Trailer
- Cadastro
- Dashboard
- Projetos Futuros

### Seleção de classe

Você pode escolher entre Guerreiro, Arqueiro e Curandeiro na área do hero ou nos cards de classe.
A classe selecionada altera o destaque visual do site e atualiza o indicador superior.

### Cadastro do jogador

Na seção de cadastro, preencha os campos de nome, e-mail, telefone opcional e data de nascimento.
O formulário valida os dados e simula a criação do perfil.

### Login simulado

No dashboard, use o e-mail cadastrado para simular o retorno da jornada.
Se o e-mail existir na memória da sessão, o painel do jogador é liberado.

### Monstruário

Clique nas entidades bloqueadas para revelar a entrada do Codex Cultural.
Cada descoberta atualiza a contagem geral e o progresso pessoal do dashboard.

## Back-end

A pasta [backend/](backend/) já está separada para a API futura.
O arquivo [backend/.env](backend/.env) deve guardar apenas variáveis locais, como porta e URLs de desenvolvimento.

Exemplo de uso atual:

- `PORT=3000`
- `NODE_ENV=development`
- `FRONTEND_URL=http://localhost:5500`

## Prints do Sistema

Adicione aqui imagens do projeto quando quiser documentar o andamento.

### Tela inicial

Espaço para print da home.

### Cadastro e dashboard

Espaço para print do formulário e do painel do jogador.

### Registro do Monstruário

Espaço para print das entradas reveladas do Codex.

### Fluxo geral

Espaço para print da navegação entre as seções.

## Observações Importantes

- O sistema do front-end usa estado em memória; ao recarregar a página, os dados simulados são reiniciados.
- O projeto foi pensado para ser expandido depois com uma API real no back-end.
- O arquivo [backend/.env](backend/.env) não deve ser versionado publicamente.
