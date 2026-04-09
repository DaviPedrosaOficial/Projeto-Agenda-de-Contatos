const validator = require('validator');         // Importa a biblioteca validator, que é usada para validar e sanitizar dados, como verificar se um email é válido ou se uma string é vazia
const bcryptjs = require('bcryptjs');           // Importa a biblioteca bcryptjs, que é usada para hash de senhas, permitindo armazenar senhas de forma segura no banco de dados
const mongoose = require('mongoose');           // Importa a biblioteca mongoose, que é usada para interagir com o banco de dados MongoDB, permitindo criar esquemas e modelos para os dados da aplicação

const RegisterSchema = new mongoose.Schema({    // Define o esquema do modelo de Register, que é a estrutura dos dados que serão armazenados no banco de dados para os usuários registrados
    nome: { type: String, required: true},
    email: { type: String, required: true, unique: true}, 
    password: { type: String, required: true}
});

const RegisterModel = mongoose.model('Register', RegisterSchema); // Cria o modelo de Register usando o esquema definido anteriormente, que é a representação do modelo de dados no banco de dados, e o nome do modelo é 'Register'

class Register {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){
        this.validate();
        if(this.errors.length > 0) return;                                          // Verifica se existem erros de validação, se existirem, ele retorna sem fazer nada, impedindo que o registro seja processado

        const userExists = await RegisterModel.findOne({ email: this.body.email }); // Verifica se já existe um usuário com o mesmo email no banco de dados usando o modelo RegisterModel, e armazena o resultado na variável userExists
    
        if(userExists) {
            this.errors.push('E-mail já cadastrado');                               // Se já existir um usuário com o mesmo email, ele adiciona uma mensagem de erro ao array de erros
            return;                                                                 // E retorna sem fazer nada, impedindo que o registro seja processado
        }

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync(10);                                      // Gera um salt para o hash da senha usando a função genSaltSync da biblioteca bcryptjs, com um fator de custo de 10, o que significa que o processo de hash será mais lento e mais seguro
        this.body.password = bcryptjs.hashSync(this.body.password, salt);           // Hash a senha usando a função hashSync da biblioteca bcryptjs, passando a senha do formulário (this.body.password) e o salt gerado anteriormente, e atribui o resultado de volta à propriedade password do body, garantindo que a senha seja armazenada de forma segura no banco de dados

        this.user = await RegisterModel.create(this.body);                      // Se não houver erros, ele cria um novo usuário no banco de dados usando o modelo RegisterModel e os dados do formulário de registro (this.body), e armazena o resultado na propriedade user da classe Register
    }

    validate(){
        this.cleanUp();             // Chama o método cleanUp para limpar os dados do formulário, garantindo que eles sejam strings e criando um novo objeto com os campos nome, email e password
        
        if (this.body.nome.length === 0) this.errors.push('O nome é obrigatório'); // Verifica se o campo nome está vazio, se estiver, ele adiciona uma mensagem de erro ao array de erros
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
            nome: this.body.nome,
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = {
    RegisterModel,
    Register
};