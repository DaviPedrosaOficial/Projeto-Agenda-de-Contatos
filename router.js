const express = require('express');
const router = express.Router();
const controllerMainPage = require('./src/controllers/controllerMainPage'); // Importa o arquivo controllerMainPage.js, que é onde estão definidas as funções que serão executadas quando as rotas forem acessadas, como a função mainPage que renderiza a página inicial (index.ejs)
const controllerLogin = require('./src/controllers/controllerLogin');       // Importa o arquivo controllerLogin.js, que é onde estão definidas as funções que serão executadas quando as rotas de login forem acessadas, como a função index que renderiza a página de login (login.ejs)
const controllerRegister = require('./src/controllers/controllerRegister'); // Importa o arquivo controllerRegister.js, que é onde estão definidas as funções que serão executadas quando as rotas de registro forem acessadas, como a função index que renderiza a página de registro (register.ejs)

//Rota da Home
router.get('/', controllerMainPage.index);                               // Define a rota '/' para o método GET, que é a rota principal da aplicação, e quando essa rota for acessada, a função mainPage do controllerMainPage será executada, renderizando a página inicial (index.ejs)

//Rota de Login
router.get('/login', controllerLogin.index);                               // Define a rota '/login' para o método GET, que é a rota de login da aplicação, e quando essa rota for acessada, a função index do controllerLogin será executada, renderizando a página de login (login.ejs)

//Rota de Registro
router.get('/register', controllerRegister.index);                         // Define a rota '/register' para o método GET, que é a rota de registro da aplicação, e quando essa rota for acessada, a função index do controllerRegister será executada, renderizando a página de registro (register.ejs)

module.exports = router;                                                    // Exporta o router, que contem as rotas definadas nesse arquivo