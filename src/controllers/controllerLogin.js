const Login = require('../models/LoginModel'); // Importa o modelo de Login, que é responsável por lidar com a lógica de autenticação e registro de usuários no banco de dados

exports.index = (req, res) => {
    res.render('includes/login'); // Renderiza a página de login (login.ejs) quando a rota de login for acessada
}

exports.login = async (req, res) => {
    
    try {
        const login = new Login(req.body);   // Cria uma nova instância do modelo de Login, passando os dados do formulário de login (req.body) para o construtor da classe Login
        await login.login();                // Chama o método login da instância de Login, que é responsável por validar os dados e autenticar o usuário no banco de dados

        if(login.errors.length > 0){         // Verifica se existem erros de validação ou autenticação, se existirem, ele renderiza a página de login novamente, passando os erros para serem exibidos na página
            req.flash('errors', login.errors); // Usa o método flash para armazenar os erros na sessão, para que eles possam ser exibidos na página de login
            req.session.save(function(){      // Salva a sessão para garantir que os dados de flash sejam armazenados antes de redirecionar, e depois redireciona para a página de login
                res.redirect('/login');
                return;
            });
            return;
        }

        req.session.user = login.user;      // Se o login for bem-sucedido, ele armazena os dados do usuário autenticado na sessão, para que eles possam ser acessados em outras partes da aplicação
        req.session.save(function(){        // Salva a sessão para garantir que os dados do usuário sejam armazenados antes de redirecionar, e depois redireciona para a página inicial ou dashboard da aplicação
            res.redirect('/');
            return;
        });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.render ('404');
    }
}