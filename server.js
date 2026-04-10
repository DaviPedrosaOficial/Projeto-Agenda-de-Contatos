require('dotenv').config();                                                 // Importa o módulo dotenv e carrega as variáveis de ambiente do arquivo .env, sem ele não será possível acessar as variáveis de ambiente definidas no arquivo .env, como a string de conexão com o banco de dados MongoDB

const express = require('express');                                         // Importa o módulo Express, que é um framework para criar servidores web em Node.js, sem ele não será possível criar o servidor e definir as rotas da aplicação
const app = express();                                                      // Cria uma instância do Express, que será a representação de nossa aplicação
const mongoose = require('mongoose');                                       // Importa o módulo Mongoose, que é um ODM (Object Data Modeling) para MongoDB, sem ele não será possível conectar ao banco de dados MongoDB e definir os modelos de dados da aplicação
const { checkCsrfError, csrfMiddleware, notFound, globalVariables } = require('./src/middlewares/middleware');     // Importa a função checkCsrfError do arquivo middleware.js, que é um middleware para verificar erros relacionados ao token CSRF, sem ele não será possível proteger a aplicação contra ataques de CSRF e fornecer feedback adequado aos usuários quando ocorrerem erros relacionados ao token CSRF



mongoose.connect(process.env.CONNECTIONSTRING)                              // Conecta ao banco de dados MongoDB utilizando a string de conexão, sem ela não será possível conectar ao banco de dados MongoDB e realizar operações de leitura e escrita no banco de dados
    .then(() => {
        app.emit('pronto');                                                 // Emite um evento 'pronto' quando a conexão com o banco de dados MongoDB for estabelecida com sucesso, sem ele não será possível iniciar o servidor e acessar a aplicação através do navegador, como http://localhost:3000
    })                        
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));    // Se ocorrer um erro durante a conexão, exibe uma mensagem de erro no console indicando que houve um problema ao conectar ao banco de dados MongoDB

const session = require('express-session');                                 // Importa o módulo express-session, que é um middleware para gerenciar sessões em aplicações Express, sem ele não será possível gerenciar as sessões dos usuários, como manter o usuário logado após fazer login
const MongoStore = require('connect-mongo').default;                        // Importa o módulo connect-mongo, que é um middleware para armazenar as sessões em um banco de dados MongoDB, sem ele não será possível armazenar as sessões dos usuários no banco de dados MongoDB, o que é importante para manter as sessões ativas mesmo após reiniciar o servidor
const flash = require('connect-flash');                                     // Importa o módulo connect-flash, que é um middleware para exibir mensagens de flash (mensagens temporárias) para os usuários, sem ele não será possível exibir mensagens de sucesso ou erro para os usuários após realizar ações como login, cadastro, etc.
const helmet = require('helmet');                                           // Importa o módulo Helmet, que é um middleware para ajudar a proteger a aplicação contra algumas vulnerabilidades de segurança comuns, sem ele a aplicação pode estar mais vulnerável a ataques como Cross-Site Scripting (XSS), Clickjacking, etc.
const csrf = require('csurf');                                              // Importa o módulo csurf, que é um middleware para proteger a aplicação contra ataques de falsificação de solicitação entre sites (CSRF), sem ele a aplicação pode estar vulnerável a ataques de CSRF, onde um atacante pode enganar um usuário autenticado para realizar ações indesejadas em nome do usuário
const routes = require('./router');                                         // Importa o arquivo router.js, que é onde estão definidas as rotas da aplicação
const path = require('path');                                               // Importa o módulo Path, que é um módulo nativo do Node.js para lidar com caminhos de arquivos e diretórios


app.use(express.urlencoded({ extended: true }));                            // Para interpretar os dados do formulário, sem ele não será permitido acessar os dados do formulário através de req.body
app.use(express.static(path.resolve(__dirname, 'public')));                 // Utilizado para demonstrar onde estão os arquivos estáticos (CSS, JS, imagens) de nossa aplicação
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://cdn.jsdelivr.net"
        ],
        styleSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "'unsafe-inline'"
        ],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https://cdn.jsdelivr.net"]                     // Alterações tiveram que ser feitas para que o Bootstrap funcione corretamente, sem essas alterações o Bootstrap não funcionaria corretamente, como os estilos não seriam aplicados e os scripts do Bootstrap não seriam carregados, o que resultaria em uma aparência desconfigurada e funcionalidades quebradas na aplicação
      }
    }
  }));                                                          // Utilizado para dizer para o Express utilizar o middleware Helmet, sem ele a aplicação pode estar mais vulnerável a ataques como Cross-Site Scripting (XSS), Clickjacking, etc.

const sessionOptions = session({                                            // Define as opções de configuração para o middleware de sessões, sem ele não será possível configurar o comportamento das sessões, como a chave secreta, o armazenamento, o tempo de expiração, etc.
    secret: process.env.SECRET,                                             // Define a chave secreta para assinar o ID da sessão, sem ela não será possível criar sessões seguras e proteger contra ataques de falsificação de solicitação entre sites (CSRF)
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),   // Define o armazenamento das sessões no banco de dados MongoDB, sem ele não será possível armazenar as sessões dos usuários no banco de dados MongoDB, o que é importante para manter as sessões ativas mesmo após reiniciar o servidor
    resave: false,                                                          // Define que a sessão não será salva novamente se não for modificada, sem ele as sessões seriam salvas a cada requisição, mesmo que não tenham sido modificadas, o que pode causar um aumento desnecessário no número de sessões armazenadas no banco de dados MongoDB
    saveUninitialized: false,                                               // Define que a sessão não será salva se não tiver sido inicializada, sem ele as sessões seriam salvas mesmo que não tenham sido inicializadas, o que pode causar um aumento desnecessário no número de sessões armazenadas no banco de dados MongoDB
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,                                        // Define o tempo de expiração do cookie da sessão para 1 dia (em milissegundos), sem ele as sessões seriam expiradas imediatamente após serem criadas, o que não é desejável para manter os usuários logados por um período de tempo razoável
        httpOnly: true                                                      // Define que o cookie da sessão só pode ser acessado pelo servidor e não pelo JavaScript do lado do cliente, sem ele os cookies da sessão poderiam ser acessados por scripts maliciosos no lado do cliente, o que pode representar um risco de segurança
    }
});

app.use(sessionOptions);                                                    // Utilizado para dizer para o Express utilizar o middleware de sessões com as opções de configuração definidas, sem ele não será possível gerenciar as sessões dos usuários, como manter o usuário logado após fazer login
app.use(csrf());                                                            // Utilizado para dizer para o Express utilizar o middleware csurf, sem ele a aplicação pode estar vulnerável a ataques de CSRF, onde um atacante pode enganar um usuário autenticado para realizar ações indesejadas em nome do usuário


app.use(flash());                                                           // Utilizado para dizer para o Express utilizar o middleware connect-flash, sem ele não será possível exibir mensagens de flash (mensagens temporárias) para os usuários, como mensagens de sucesso ou erro após realizar ações como login, cadastro, etc.
app.use(csrfMiddleware);                                                    // Utilizado para dizer para o Express utilizar o middleware CSRF, sem ele a aplicação pode estar vulnerável a ataques de CSRF
app.use(globalVariables);                                                   // Utilizado para dizer para o Express utilizar o middleware globalVariables, que é um middleware para definir variáveis globais acessíveis em todas as views (arquivos .ejs), sem ele não seria possível acessar as variáveis de erros e sucesso nas views, o que é importante para exibir mensagens de erro ou sucesso para os usuários após realizar ações como login, cadastro, etc.  

app.use(routes);                                                            // Utilizado para dizer para o Express utilizar as rotas definidas no arquivo router.js, sem ele não será possível acessar as rotas definidas no arquivo router.js, como a rota '/' que renderiza a página inicial (index.ejs)
app.use(checkCsrfError);                                                    // Utilizado para dizer para o Express utilizar o middleware para verificar erros relacionados ao token CSRF, sem ele não será possível proteger a aplicação contra ataques de CSRF e fornecer feedback adequado aos usuários quando ocorrerem erros relacionados ao token CSRF
app.use(notFound);                                                          // Utilizado para dizer para o Express utilizar o middleware notFound, que é um middleware para lidar com rotas não encontradas (404), sem ele as requisições para rotas que não existem não seriam tratadas adequadamente, o que pode resultar em erros ou comportamentos inesperados para os usuários


app.set('view engine', 'ejs');                                              // Define qual a engine que utilizaremos para renderizar as views (arquivos .ejs)
app.set('views', path.resolve(__dirname, 'src', 'views'));                  // Define o diretório onde estão as views (arquivos .ejs)


app.on('pronto', () => {                                                     // Escuta o evento 'pronto' que é emitido quando a conexão com o banco de dados MongoDB for estabelecida com sucesso, sem ele não será possível iniciar o servidor e acessar a aplicação através do navegador, como http://localhost:3000
    app.listen(3000, () => {                                                 // Inicia o servidor na porta 3000
        console.log('Acessar http://localhost:3000');
        console.log('Server rodando na porta 3000');
    });
});