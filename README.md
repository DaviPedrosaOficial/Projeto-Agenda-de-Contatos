# 📇 Agenda de Contatos

Uma aplicação web completa para gerenciamento de contatos, permitindo organizar pessoas em listas personalizadas com descrições, filtros e controle de acesso por usuário.

---

## 🚀 Visão Geral

A **Agenda de Contatos** é um sistema web desenvolvido com Node.js que permite ao usuário:

- Criar contas e autenticar-se
- Organizar contatos em listas
- Adicionar descrições para cada lista
- Gerenciar contatos com telefone e/ou email
- Ordenar contatos dinamicamente
- Visualizar e editar informações de forma intuitiva

---

## ✨ Funcionalidades

### 🔐 Autenticação

- Cadastro de usuário
- Login seguro com senha criptografada
- Sessão persistente
- Proteção de rotas

### 📂 Listas

- Criação de múltiplas listas
- Edição de descrição
- Exclusão de listas
- Organização por contexto (ex: Amigos, Trabalho)

### 📇 Contatos

- Nome obrigatório
- Sobrenome opcional
- Telefone ou Email obrigatório
- Exclusão de contatos
- Exibição organizada

### 🔍 Filtros e Ordenação

- Ordem alfabética (A-Z)
- Mais recentes
- Mais antigos
- Persistência do filtro selecionado

### 🎨 Interface

- Layout moderno com Bootstrap
- Modais interativos
- Feedback visual de erros
- Hierarquia visual clara

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia      | Função                  |
| --------------- | ----------------------- |
| Node.js         | Ambiente de execução    |
| Express         | Framework web           |
| MongoDB         | Banco de dados          |
| Mongoose        | ODM                     |
| EJS             | Template engine         |
| Bootstrap 5     | Interface               |
| bcryptjs        | Criptografia de senha   |
| express-session | Controle de sessão      |
| connect-mongo   | Armazenamento de sessão |
| connect-flash   | Mensagens temporárias   |
| csurf           | Proteção CSRF           |
| helmet          | Segurança HTTP          |
| dotenv          | Variáveis de ambiente   |

---

## ⚙️ Instalação

### 1. Clone o projeto

git clone <NOSSO_REPOSITORIO>

#### Em seu terminal:

- cd <ONDE_SALVOU_O_PROJETO>
- npm install (para instalar as dependencias do mesmo)

### 🔧 Configuração do ambiente (.env)

Crie um arquivo chamado `.env` na raiz do projeto.

Esse arquivo é essencial porque contém configurações sensíveis que não são enviadas para o GitHub, serão elas:

### 🧠 Explicação das variáveis

**CONNECTIONSTRING**

- Responsável por conectar sua aplicação ao banco MongoDB
- `agenda` é o nome do banco (ele será criado automaticamente)

**SECRET**

- Chave usada para proteger sessões de usuários
- Pode ser qualquer string, mas deve ser segura

### ▶️ Executando o projeto

npm start (em seu terminal)

Acesse no navegador:
http://localhost:3000

## 🗄️ Configuração do Banco de Dados

Você pode usar o MongoDB de duas formas: localmente ou na nuvem (Atlas).

### 🖥️ MongoDB Local (mais simples)

1. Baixe o MongoDB:
   https://www.mongodb.com/try/download/community

2. Instale normalmente

3. Inicie o banco com o comando:

mongod

Pronto! O banco será criado automaticamente quando você rodar o projeto.

### ☁️ MongoDB Atlas (nuvem)

1. Acesse:
   https://www.mongodb.com/atlas

2. Crie uma conta

3. Crie um cluster gratuito

4. Clique em:

Connect → Drivers

Copie a string de conexão, que será parecida com isso:

mongodb+srv://usuario:senha@cluster.mongodb.net/agenda

Agora substitua no seu `.env`:

CONNECTIONSTRING=sua_string_do_atlas (a string apresentada no atlas, parecida com a de exemplo acima, e lembre-se de trocar a senha como o próprio atlas ensina)

## ▶️ Como Usar o Sistema

1. Acesse `/register` e crie sua conta
2. Faça login em `/login`
3. Crie uma nova lista
4. Adicione contatos
5. Utilize o filtro para ordenar
6. Edite descrições quando necessário

## 🔐 Segurança

- Proteção CSRF (utiliza tokens para validar formulários)
- Uso de Helmet para headers seguros
- Senhas criptografadas com bcrypt
- Sessões protegidas com express-session

## 🏗️ Estrutura do Projeto

Este projeto foi desenvolvido seguindo o padrão arquitetural **MVC (Model-View-Controller)**, que tem como objetivo separar responsabilidades e facilitar a manutenção e escalabilidade da aplicação.

### 🧠 Model (Modelo)

Responsável pela estrutura e manipulação dos dados.

- Define os schemas do MongoDB utilizando o Mongoose
- Contém regras básicas de validação
- Representa entidades como usuários, listas e contatos

---

### 🎮 Controller (Controlador)

Responsável pela lógica da aplicação.

- Recebe requisições do usuário
- Processa regras de negócio
- Interage com os Models
- Envia os dados para as Views

---

### 🎨 View (Visão)

Responsável pela interface com o usuário.

- Utiliza EJS para renderização dinâmica
- Exibe dados vindos dos controllers
- Contém componentes reutilizáveis (partials)

---

### 🔄 Fluxo da aplicação

O funcionamento do sistema segue o seguinte fluxo:

1. O usuário faz uma requisição (ex: acessar uma lista)
2. A rota direciona para o controller correspondente
3. O controller busca ou manipula dados no model
4. Os dados são enviados para a view
5. A view renderiza a interface para o usuário

---

### 🧩 Outras camadas importantes

Além do MVC, o projeto também conta com:

- **Middlewares**: responsáveis por autenticação, segurança e tratamento de requisições
- **Assets (public)**: arquivos estáticos como CSS e JavaScript
- **Configurações**: variáveis de ambiente e conexão com o banco de dados

---

Essa organização torna o projeto mais limpo, modular e fácil de evoluir ao longo do tempo.

## 💡 Melhorias Futuras

- Busca por nome
- Paginação
- Uso de AJAX (sem recarregar página)
- Melhor responsividade

## 👨‍💻 Autor

Davi Pedrosa

## 📄 Licença

MIT

### 🏠 Página inicial

![Home](./public/assets/img/main.png)

### 📝 Cadastro

![Cadastro](./public/assets/img/cadastro.png)

### 🔐 Login

![Login](./public/assets/img/login.png)

### 📂 Listas

![Listas](./public/assets/img/MyAgenda.png)

### ➕ Nova lista

![Nova Lista](./public/assets/img/NovaListaDeContatos.png)

### 📇 Contatos

![Contatos](./public/assets/img/DentroListaDeContato.png)

### ➕ Novo contato

![Novo Contato](./public/assets/img/NovoContato.png)
