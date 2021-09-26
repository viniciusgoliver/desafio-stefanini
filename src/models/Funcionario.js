/*
IMPLEMENTS BY: Vinícius G. Oliveira
DATE: 09/2021
*/

/* Incluindo a Lib do mongoose pra manipularmos as instancias do mongoDB */  
const mongoose = require('mongoose');

/* Criando o Schema responsavel por guardar os registros dentro do mongoDB e ao final exportando pra utilização */  
const FuncionarioSchema = new mongoose.Schema({
  idade: Number,
  nome: String,
  cargo: String
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);