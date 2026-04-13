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

// Criar lista
exports.create = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  if (!req.body.descricao || !req.body.descricao.trim()) {
    req.body.descricao = '';
  }

  await Lista.create({
    nome: req.body.nome,
    descricao: req.body.descricao,
    userId: req.session.user._id
  });

  res.redirect('/myAgenda');
};

// Editar descrição da lista
exports.updateDescricao = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const descricao = req.body.descricao || '';

  await Lista.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.session.user._id
    },
    {
      descricao
    }
  );

  res.redirect('/listas/' + req.params.id);
};

// Mostrar lista
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

  res.render('includes/listaDetalhe', {
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

// Criar contato
exports.createContato = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const errors = {};

  if (!req.body.nome){
    errors.nome = 'O nome é obrigatório.';
  };

  if (!req.body.telefone && !req.body.email){
    errors.contato = 'Informe pelo menos um telefone ou um email.';
  };

  if (Object.keys(errors).length > 0) {
    req.flash('errors', errors);
    req.flash('formData', req.body);
    return res.redirect('/listas/' + req.params.id);
  }

  await Contato.create({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    telefone: req.body.telefone,
    email: req.body.email,
    listaId: req.params.id
  });

  res.redirect('/listas/' + req.params.id);
};

// Deletar contato
exports.deleteContato = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const contato = await Contato.findById(req.params.id);

  if (!contato) return res.redirect('/myAgenda');

  const listaId = contato.listaId;

  await Contato.deleteOne({ _id: req.params.id });

  res.redirect('/listas/' + listaId);
};