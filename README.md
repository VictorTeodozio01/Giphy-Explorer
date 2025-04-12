# Giphy Explorer

Uma aplicação web moderna para explorar e gerenciar GIFs da plataforma GIPHY, construída com Quasar 2 e Vue 3.

## Tecnologias Utilizadas

- Quasar 2
- Vue 3 (Composition API com script setup)
- Vue Router
- Pinia
- Axios
- LocalStorage (via plugin do Quasar)
- Tailwind CSS

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Uma chave de API do GIPHY (obtenha em https://developers.giphy.com)

## Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd quasar-project
```

2. Instale as dependências:

```bash
npm install
```

3. Configure a chave da API do GIPHY:
   - Abra o arquivo `.env`
   - Substitua `VITE_GIPHY_API_KEY=sua_chave_api_aqui` pela sua chave de API do GIPHY

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:9000`

## Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/spa`

## Funcionalidades

- Visualização de GIFs em tendência
- Pesquisa de GIFs por termos
- Exploração por categorias
- Gerenciamento de favoritos (com persistência local)
- Interface responsiva e moderna
