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
- **[MySQL](https://www.mysql.com/)** - Banco de dados relacional objeto-relacional de código aberto.
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

📖 Documentação Interativa com Swagger

A documentação completa e interativa da API, com todos os endpoints, detalhes de payloads, parâmetros e respostas, foi gerada com Swagger.

Para acessá-la, basta ter o servidor rodando e clicar no link abaixo:

➡️ http://localhost:3001/api-docs

Lá você pode visualizar e até mesmo testar cada endpoint diretamente pelo seu navegador.

🚀 **Como Executar o Projeto**

Siga os passos abaixo para ter a API rodando em seu ambiente de desenvolvimento.

### **Pré-requisitos**

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução.

### **Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/nazare4lmeida/drip-store-backend.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd drip-store-backend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    *   Crie uma cópia do arquivo de exemplo `.env.example` e renomeie para `.env`.
    ```bash
    # No Windows (PowerShell)
    copy .env.example .env

    # No Mac/Linux
    cp .env.example .env
    ```
    *   O arquivo `.env` já vem pré-configurado para funcionar com o ambiente Docker abaixo.

### **Execução**

1.  **Inicie o Banco de Dados com Docker:**
    *   Com o Docker Desktop rodando, execute o comando abaixo para iniciar o contêiner do banco de dados MySQL em segundo plano.
    ```bash
    docker-compose up -d
    ```

2.  **Inicie o Servidor da API:**
    *   Este comando iniciará o servidor em modo de desenvolvimento com o Nodemon.
    `
    ```bash
    npm run dev
    ```

✨ Pronto! A API estará disponível em `http://localhost:3001` e conectada ao banco de dados.

---

🧪 **Testando a API**

### **Com Jest**
Para rodar a suíte de testes automatizados, garanta que o contêiner do Docker esteja rodando e execute:
```bash
npm test
```

**Com Postman**

Uma coleção completa do Postman com exemplos de requisições para todos os principais endpoints está disponível no projeto.

Importe a Coleção:
Abra o Postman e importe o arquivo DripStoreAPI.postman_collection.json que está na raiz deste repositório.

Fluxo de Teste:
Primeiro, execute a requisição POST /usuario para criar uma conta.
Depois, execute a requisição POST /usuario/token com os dados do usuário criado para obter um token de autenticação.

As requisições protegidas já estão configuradas para usar o token automaticamente.


**Feito com ♥ by Nazaré, Jacque e Adriana.**
