const validator = require('validator');             // Importa a biblioteca validator, que é usada para validar e sanitizar dados, como verificar se um email é válido ou se uma string é vazia
const bcryptjs = require('bcryptjs');               // Importa a biblioteca bcryptjs, que é usada para hash de senhas, permitindo armazenar senhas de forma segura no banco de dados
const { RegisterModel } = require('./RegisterModel');   // Importa o modelo de Register, que é responsável por lidar com a lógica de registro de usuários no banco de dados

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    async login(){
        this.validate();
        if(this.errors.length > 0) return; // Verifica se existem erros de validação, se existirem, ele retorna sem fazer nada, impedindo que o login seja processado
        
        const user = await RegisterModel.findOne({ email: this.body.email }); // Procura um usuário no banco de dados usando o modelo RegisterModel e o email do formulário de login (this.body.email), e armazena o resultado na variável user

        if(!user) {
            this.errors.push('Usuário ou senha inválidos'); // Se não encontrar um usuário correspondente, ele adiciona uma mensagem de erro ao array de erros
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, user.password)) { // Compara a senha do formulário de login (this.body.password) com a senha armazenada no banco de dados (user.password) usando a função compareSync da biblioteca bcryptjs, se não forem iguais, ele adiciona uma mensagem de erro ao array de erros
            this.errors.push('Usuário ou senha inválidos');
            return;
        }

        this.user = user; // Se o login for bem-sucedido, ele atribui o usuário encontrado no banco de dados à propriedade user da classe Login, permitindo que as informações do usuário estejam disponíveis para outras partes da aplicação, como os controllers e as views (arquivos .ejs)
    }

    validate(){
        this.cleanUp();             // Chama o método cleanUp para limpar os dados do formulário, garantindo que eles sejam strings e criando um novo objeto com os campos email e password}

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido'); // Verifica se o email é válido usando a função isEmail da biblioteca validator, se não for, ele adiciona uma mensagem de erro ao array de erros
        if (this.body.password.length < 3 || this.body.password.length > 15) this.errors.push('A senha precisa conter entre 3 e 15 caracteres'); // Verifica se a senha tem entre 3 e 15 caracteres, se não tiver, ele adiciona uma mensagem de erro ao array de erros
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){ // Verifica se o valor do campo é uma string, se não for, ele limpa o valor do campo, atribuindo uma string vazia
                this.body[key] = '';
            }
        }

        this.body = {                               // Depois de limpar os campos, ele cria um novo objeto com os campos nome, email e password, atribuindo os valores correspondentes do body, que foram limpos anteriormente
            email: this.body.email,
            password: this.body.password
        }
    }
}
module.exports = Login;