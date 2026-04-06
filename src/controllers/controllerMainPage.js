const HomeModel = require('../models/HomeModel');

HomeModel.create({
    titulo: 'Título de teste',
    descricao: 'Descrição de teste'
})
    .then((dados) => console.log(dados))
    .catch((err) => console.error(err));

exports.mainPage = (req, res) => {
    res.render('index');
}