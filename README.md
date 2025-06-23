<h1 align="center">
  Drip Store API
</h1>

<p align="center">
  API RESTful desenvolvida para ser o backend da aplicação de e-commerce Drip Store.
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>   |   
  <a href="#-funcionalidades">Funcionalidades</a>   |   
  <a href="#-endpoints">Endpoints</a>   |   
  <a href="#-como-executar">Como executar</a>   |   
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

## ✨ Tecnologias

Esse projeto foi desenvolvido com um conjunto de tecnologias robustas e modernas para o ecossistema Node.js:

- **[Node.js](https://nodejs.org/en/)** - Ambiente de execução JavaScript no servidor.
- **[Express.js](https://expressjs.com/pt-br/)** - Framework minimalista para construção de APIs.
- **[Sequelize](https://sequelize.org/)** - ORM (Object-Relational Mapper) para Node.js, compatível com PostgreSQL, MySQL, etc.
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional objeto-relacional de código aberto.
- **[Docker](https://www.docker.com/)** - Plataforma para desenvolver, enviar e executar aplicações em contêineres.
- **[JSON Web Tokens (JWT)](https://jwt.io/)** - Padrão para criação de tokens de acesso para autenticação.
- **[Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)** - Biblioteca para hashing de senhas.
- **[Jest](https://jestjs.io/)** & **[Supertest](https://github.com/visionmedia/supertest)** - Para testes automatizados da API.
- **[CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)** - Para permitir o acesso de diferentes origens (front-end).

## 💻 Projeto

A Drip Store API fornece todos os endpoints necessários para uma aplicação de e-commerce completa. Ela gerencia usuários, produtos, categorias, autenticação e a lógica de negócio por trás da loja, garantindo segurança e persistência dos dados.

## 🔥 Funcionalidades

- ✅ **CRUD completo de Usuários**, com armazenamento seguro de senhas.
- ✅ **Sistema de Autenticação** baseado em JWT, com endpoint de login para geração de token.
- ✅ **Middleware de proteção de rotas** que exigem que o usuário esteja logado.
- ✅ **CRUD completo de Categorias** de produtos.
- ✅ **CRUD completo de Produtos**, incluindo o gerenciamento de suas associações com categorias, imagens e opções.
- ✅ **Endpoint de busca avançada** para produtos, com filtros por nome, descrição, faixa de preço, categorias e opções.
- ✅ **Estrutura de Serviços** para separar a lógica de negócio dos controllers.
- ✅ **Ambiente de desenvolvimento dockerizado** com PostgreSQL para fácil configuração.

## Endpoints Principais

A API está prefixada com `/v1`.

| Método | Endpoint                | Descrição                                | Requer Auth |
| :----- | :---------------------- | :--------------------------------------- | :---------: |
| `POST` | `/usuario`              | Cria um novo usuário.                    |     Não     |
| `POST` | `/usuario/token`        | Realiza o login e retorna um token JWT.  |     Não     |
| `GET`  | `/usuario/:id`          | Busca um usuário pelo ID.                |     Não     |
| `PUT`  | `/usuario/:id`          | Atualiza um usuário.                     |     Sim     |
| `POST` | `/categoria`            | Cria uma nova categoria.                 |     Sim     |
| `GET`  | `/categoria/pesquisa`   | Busca categorias com filtros.            |     Não     |
| `POST` | `/produto`              | Cria um novo produto com associações.    |     Sim     |
| `GET`  | `/produto/pesquisa`     | Busca produtos com filtros avançados.    |     Não     |
| `GET`  | `/produto/:id`          | Busca um produto pelo ID.                |     Não     |

*(Esta é uma lista resumida. Consulte o código em `src/routes` para todos os endpoints)*

## 🚀 Como executar

Siga os passos abaixo para rodar o projeto em seu ambiente de desenvolvimento.

**Pré-requisitos:**
- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução.

```bash
# 1. Clone este repositório
$ git clone https://github.com/nazare4lmeida/drip-store-backend.git

# 2. Acesse a pasta do projeto
$ cd drip-store-backend

# 3. Crie o arquivo .env a partir do exemplo
# (No Windows, use "copy" em vez de "cp")
$ cp .env.example .env

# 4. Instale as dependências do projeto
$ npm install

# 5. Inicie o contêiner do PostgreSQL com Docker
# (Este comando só precisa ser rodado uma vez para criar o contêiner)
$ docker run --name drip-store-db -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -e POSTGRES_DB=drip_store_db -p 5432:5432 -d postgres

# 6. Rode o servidor de desenvolvimento da API
$ npm run dev

# A API estará disponível em http://localhost:3001

Para rodar os testes:
# Garanta que o contêiner do Docker esteja rodando e execute:
$ npm test

Feito com ♥ by Nazaré, Jacque e Adriana.