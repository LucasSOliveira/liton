# LitOn - Sistema de Aluguel de Livros Online

LitOn é um sistema de aluguel de livros online.

## Arquitetura

A aplicação foi construída seguindo uma arquitetura modular que separa as responsabilidades em:

- **Frontend (liton-frontend):**
  - **Vue 3 + Vite;**
  - **Pinia;**
  - **Tailwind CSS e shadcn-vue;**
  - **i18n** (Inglês, Português, Espanhol).

- **Backend (liton-backend):**
  - **NestJS;**
  - **JWT & AuthModule: cookies HTTP-only.**
  - **Integração com Open Library para Busca e armazenamento dinâmico de livros.**

- **Containerização:**
  - **Docker Compose:** Orquestração dos containers para frontend, backend e banco de dados.

---

## Stack Tecnológica

- **Frontend:** Vue 3, Vite, Pinia, Tailwind CSS, shadcn-vue, i18n.
- **Backend:** NestJS, TypeScript, TypeORM, PostgreSQL, JWT.
- **DevOps:** Docker, Docker Compose.

## Como Rodar o Projeto

### Usando Docker Compose

1. Certifique-se de que o Docker e o Docker Compose estão instalados na sua máquina.
2. Na raiz do projeto (onde o arquivo `docker-compose.yml` está localizado), execute o comando:

   ```bash
   docker-compose up --build
   ```

   O Docker Compose irá iniciar os containers para o backend, frontend e o banco de dados.
   Após a inicialização:
   - O backend estará acessível em http://localhost:3000.
   - O frontend estará acessível em http://localhost:5000.

### Executando Individualmente

Recomenda-se o uso do Node.js 23 para garantir compatibilidade.

#### Backend

1. Navegue até a pasta do backend:

   ```bash
   cd liton-backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

4. Para rodar o backend em modo de desenvolvimento, execute:

   ```bash
   npm run start:dev
   ```

   O backend será servido em http://localhost:3000.

#### Frontend

1. Navegue até a pasta do frontend:

   ```bash
   cd liton-frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Para iniciar o projeto em modo de desenvolvimento, execute:

   ```bash
   npm run dev
   ```

   O frontend será servido em http://localhost:5000.

Com essas instruções, você poderá rodar o projeto tanto com o Docker Compose quanto individualmente.
