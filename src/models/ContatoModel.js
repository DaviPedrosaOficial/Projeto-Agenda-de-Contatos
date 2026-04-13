const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String},
  sobrenome: { type: String },
  telefone: { type: String },
  email: { type: String },
  listaId: { type: String, required: true }
}, { timestamps: true }); // Adiciona campos createdAt e updatedAt automaticamente, que serão usados para a filtragem de nossos contatos

module.exports = mongoose.model('Contato', ContatoSchema);