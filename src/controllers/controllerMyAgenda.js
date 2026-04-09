const Lista = require('../models/ListaModel');
const Contato = require('../models/ContatoModel');

// Página principal
exports.index = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const listas = await Lista.find({
    userId: req.session.user._id
  });

  res.render('includes/myAgenda', {
    user: req.session.user,
    listas
  });
};

// Criaando lista
exports.create = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  await Lista.create({
    nome: req.body.nome,
    userId: req.session.user._id
  });

  res.redirect('/myAgenda');
};

// Mostrar lista (clicou nela)
exports.show = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const lista = await Lista.findOne({
    _id: req.params.id,
    userId: req.session.user._id
  });

  if (!lista) return res.redirect('/myAgenda');

  const contatos = await Contato.find({
    listaId: lista._id
  });

  res.render('listaDetalhe', {
    lista,
    contatos
  });
};

// Deletar lista
exports.delete = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  await Lista.deleteOne({
    _id: req.params.id,
    userId: req.session.user._id
  });

  res.redirect('/myAgenda');
};