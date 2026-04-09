const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  listaId: String
});

module.exports = mongoose.model('Contato', ContatoSchema);