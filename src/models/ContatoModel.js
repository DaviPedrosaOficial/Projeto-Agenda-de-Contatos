const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String},
  sobrenome: { type: String },
  telefone: { type: String },
  email: { type: String },
  listaId: { type: String, required: true }
});

module.exports = mongoose.model('Contato', ContatoSchema);