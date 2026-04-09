const { Register } = require('../models/RegisterModel'); // Importa o modelo de Register, que é responsável por lidar com a lógica de registro de usuários no banco de dados

exports.index = (req, res) => {
    res.render('includes/register');
}

exports.register = async (req, res) => {

    try {
        const register = new Register(req.body);   // Cria uma nova instância do modelo de Register, passando os dados do formulário de registro (req.body) para o construtor da classe Register
        await register.register();                      // Chama o método register da instância de Register, que é responsável por validar os dados e criar um novo usuário no banco de dados

        if(register.errors.length > 0){                 // Verifica se existem erros de validação, se existirem, ele renderiza a página de registro novamente, passando os erros para serem exibidos na página
            req.flash('errors', register.errors);       // Usa o método flash para armazenar os erros na sessão, para que eles possam ser exibidos na página de registro
            req.session.save(function(){                // Salva a sessão para garantir que os dados de flash sejam armazenados antes de redirecionar, e depois redireciona para a página de registro
                res.redirect('/register');
                return;
            });
            return;
        }

        req.flash('success', 'Usuário registrado com sucesso'); // Se o registro for bem-sucedido, ele usa o método flash para armazenar uma mensagem de sucesso na sessão, para que ela possa ser exibida na página de registro
        req.session.save(function(){                            // Salva a sessão para garantir que os dados de flash sejam armazenados antes de redirecionar, e depois redireciona para a página de registro
            res.redirect('/login');
            return;
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
    }
}