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