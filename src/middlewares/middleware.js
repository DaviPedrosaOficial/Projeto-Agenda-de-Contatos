exports.checkCsrfError = (err, req, res, next) => { // Middleware para verificar erros relacionados ao token CSRF, sem ele não será possível proteger a aplicação contra ataques de CSRF e fornecer feedback adequado aos usuários quando ocorrerem erros relacionados ao token CSRF
    if (err && err.code === 'EBADCSRFTOKEN') {
        return res.render('includes/errorCsrf');
    }
    next(err); 
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();     // Define a variável local 'csrfToken' com o valor do token CSRF gerado pelo middleware csurf, sem ele não seria possível acessar o token CSRF nas views (arquivos .ejs), o que é importante para incluir o token CSRF nos formulários e proteger a aplicação contra ataques de CSRF
    next();                                     // Chama a função next() para passar o controle para o próximo middleware ou rota, sem ele a execução do middleware seria interrompida e as rotas seguintes não seriam processadas, o que pode causar problemas na funcionalidade da aplicação
}

exports.notFound = (req, res) => {
    res.status(404).render('includes/404');     // Define o status da resposta como 404 (Not Found) e renderiza a view 'includes/404', sem ele as requisições para rotas que não existem não seriam tratadas adequadamente, o que pode resultar em erros ou comportamentos inesperados para os usuários
}

exports.globalVariables = (req, res, next) => {
    //Erros
    const flashErros = req.flash('errors');                             // Armazena os erros recuperados da sessão usando o método flash em uma variável local 'flashErros', sem ele não seria possível acessar os erros armazenados na sessão, o que é importante para exibir mensagens de erro para os usuários quando ocorrerem erros de validação ou outros tipos de erros
    res.locals.errors = flashErros;                                     // Define a variável local 'errors' com os erros armazenados na sessão usando o método flash, sem ele não seria possível acessar os erros nas views (arquivos .ejs), o que é importante para exibir mensagens de erro para os usuários quando ocorrerem erros de validação ou outros tipos de erros
    res.locals.errorsObj = flashErros.length > 0 ? flashErros[0] : {};  // Define a variável local 'errorsObj' com o primeiro objeto de erros armazenado na sessão usando o método flash, ou um objeto vazio se não houver erros, sem ele não seria possível acessar os erros como um objeto nas views (arquivos .ejs), o que é importante para exibir mensagens de erro de forma estruturada e facilitar a manipulação dos erros nas views
    
    //Sucessos
    res.locals.success = req.flash('success');                          // Define a variável local 'success' com as mensagens de sucesso armazenadas na sessão usando o método flash, sem ele não seria possível acessar as mensagens de sucesso nas views (arquivos .ejs), o que é importante para exibir mensagens de sucesso para os usuários quando uma ação for realizada com sucesso, como o registro de um novo usuário
    
    //Usuário
    res.locals.user = req.session.user;                                 // Define a variável local 'user' com os dados do usuário armazenados na sessão, sem ele não seria possível acessar os dados do usuário nas views (arquivos .ejs), o que é importante para exibir informações do usuário autenticado e personalizar a experiência do usuário com base em suas informações
    
    //CSRF Token (autenticidade do formulário)
    res.locals.csrfToken = req.csrfToken();                             // Define a variável local 'csrfToken' com o valor do token CSRF gerado pelo middleware csurf, sem ele não seria possível acessar o token CSRF nas views (arquivos .ejs), o que é importante para incluir o token CSRF nos formulários e proteger a aplicação contra ataques de CSRF
    next();                                                             // Chama a função next() para passar o controle para o próximo middleware ou rota, sem ele a execução do middleware seria interrompida e as rotas seguintes não seriam processadas, o que pode causar problemas na funcionalidade da aplicação
}