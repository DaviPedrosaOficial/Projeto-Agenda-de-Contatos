const express = require('express');
const router = express.Router();
const controllerMainPage = require('./src/controllers/controllerMainPage'); // Importa o arquivo controllerMainPage.js, que é onde estão definidas as funções que serão executadas quando as rotas forem acessadas, como a função mainPage que renderiza a página inicial (index.ejs)

router.get('/', controllerMainPage.mainPage);                               // Define a rota '/' para o método GET, que é a rota principal da aplicação, e quando essa rota for acessada, a função mainPage do controllerMainPage será executada, renderizando a página inicial (index.ejs)

module.exports = router;                                                    // Exporta o router, que contem as rotas definadas nesse arquivo