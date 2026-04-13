const mongoose = require('mongoose');

const ListaSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  userId: String
});

module.exports = mongoose.model('Lista', ListaSchema);