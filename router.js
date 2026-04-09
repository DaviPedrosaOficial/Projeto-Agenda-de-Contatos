const express = require('express');
const router = express.Router();
const controllerMainPage = require('./src/controllers/controllerMainPage'); // Importa o arquivo controllerMainPage.js, que é onde estão definidas as funções que serão executadas quando as rotas forem acessadas, como a função mainPage que renderiza a página inicial (index.ejs)
const controllerLogin = require('./src/controllers/controllerLogin');       // Importa o arquivo controllerLogin.js, que é onde estão definidas as funções que serão executadas quando as rotas de login forem acessadas, como a função index que renderiza a página de login (login.ejs)
const controllerRegister = require('./src/controllers/controllerRegister'); // Importa o arquivo controllerRegister.js, que é onde estão definidas as funções que serão executadas quando as rotas de registro forem acessadas, como a função index que renderiza a página de registro (register.ejs)
const controllerMyAgenda = require('./src/controllers/controllerMyAgenda'); // Importa o arquivo controllerMyAgenda.js, que é onde estão definidas as funções que serão executadas quando as rotas do My Agenda forem acessadas, como a função index que renderiza a página do My Agenda (myAgenda.ejs) com as informações do usuário

//Rota da Home
router.get('/', controllerMainPage.index);                               // Define a rota '/' para o método GET, que é a rota principal da aplicação, e quando essa rota for acessada, a função mainPage do controllerMainPage será executada, renderizando a página inicial (index.ejs)

//Rota de Login
router.get('/login', controllerLogin.index);                               // Define a rota '/login' para o método GET, que é a rota de login da aplicação, e quando essa rota for acessada, a função index do controllerLogin será executada, renderizando a página de login (login.ejs)
router.post('/login', controllerLogin.login);                               // Define a rota '/login' para o método POST, que é a rota de login da aplicação, e quando essa rota for acessada, a função login do controllerLogin será executada, processando os dados enviados pelo formulário de login e verificando as credenciais do usuário no banco de dados

//Rota de Registro
router.get('/register', controllerRegister.index);                         // Define a rota '/register' para o método GET, que é a rota de registro da aplicação, e quando essa rota for acessada, a função index do controllerRegister será executada, renderizando a página de registro (register.ejs)
router.post('/register', controllerRegister.register);                     // Define a rota '/register' para o método POST, que é a rota de registro da aplicação, e quando essa rota for acessada, a função register do controllerRegister será executada, processando os dados enviados pelo formulário de registro e criando um novo usuário no banco de dados    

//Rota do My Agenda
router.get('/myAgenda', controllerMyAgenda.index);                     // Define a rota '/myAgenda' para o método GET, que é a rota do My Agenda da aplicação, e quando essa rota for acessada, a função index do controllerMyAgenda será executada, verificando se o usuário está autenticado e renderizando a página do My Agenda (myAgenda.ejs) com as informações do usuário

//Rota de Logout
router.get('/logout', (req, res) => {                                      // Define a rota '/logout' para o método GET, que é a rota de logout da aplicação, e quando essa rota for acessada, a função anônima definida aqui será executada, destruindo a sessão do usuário e redirecionando para a página de login
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;                                                    // Exporta o router, que contem as rotas definadas nesse arquivo