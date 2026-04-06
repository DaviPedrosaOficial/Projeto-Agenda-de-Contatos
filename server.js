require('dotenv').config();                                                 // Importa o módulo dotenv e carrega as variáveis de ambiente do arquivo .env, sem ele não será possível acessar as variáveis de ambiente definidas no arquivo .env, como a string de conexão com o banco de dados MongoDB

const express = require('express');                                         // Importa o módulo Express, que é um framework para criar servidores web em Node.js, sem ele não será possível criar o servidor e definir as rotas da aplicação
const app = express();                                                      // Cria uma instância do Express, que será a representação de nossa aplicação

const mongoose = require('mongoose');                                       // Importa o módulo Mongoose, que é um ODM (Object Data Modeling) para MongoDB, sem ele não será possível conectar ao banco de dados MongoDB e definir os modelos de dados da aplicação
mongoose.connect(process.env.CONNECTIONSTRING)                                          // Conecta ao banco de dados MongoDB utilizando a string de conexão, sem ela não será possível conectar ao banco de dados MongoDB e realizar operações de leitura e escrita no banco de dados
    .then(() => {
        app.emit('pronto');                                                 // Emite um evento 'pronto' quando a conexão com o banco de dados MongoDB for estabelecida com sucesso, sem ele não será possível iniciar o servidor e acessar a aplicação através do navegador, como http://localhost:3000
    })                        
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));    // Se ocorrer um erro durante a conexão, exibe uma mensagem de erro no console indicando que houve um problema ao conectar ao banco de dados MongoDB

    const routes = require('./router');                                         // Importa o arquivo router.js, que é onde estão definidas as rotas da aplicação
const path = require('path');                                               // Importa o módulo Path, que é um módulo nativo do Node.js para lidar com caminhos de arquivos e diretórios

app.use(express.urlencoded({ extended: true }));                            // Para interpretar os dados do formulário, sem ele não será permitido acessar os dados do formulário através de req.body
app.use(express.static(path.resolve(__dirname, 'public')));                 // Utilizado para demonstrar onde estão os arquivos estáticos (CSS, JS, imagens) de nossa aplicação
app.use(routes);                                                            // Utilizado para dizer para o Express utilizar as rotas definidas no arquivo router.js, sem ele não será possível acessar as rotas definidas no arquivo router.js, como a rota '/' que renderiza a página inicial (index.ejs)

app.set('view engine', 'ejs');                                              // Define qual a engine que utilizaremos para renderizar as views (arquivos .ejs)
app.set('views', path.resolve(__dirname, 'src', 'views'));                  // Define o diretório onde estão as views (arquivos .ejs)

app.on('pronto', () => {                                                     // Escuta o evento 'pronto' que é emitido quando a conexão com o banco de dados MongoDB for estabelecida com sucesso, sem ele não será possível iniciar o servidor e acessar a aplicação através do navegador, como http://localhost:3000
    app.listen(3000, () => {                                                 // Inicia o servidor na porta 3000
        console.log('Acessar http://localhost:3000');
        console.log('Server rodando na porta 3000');
    });
});