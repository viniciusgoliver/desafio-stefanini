/*
IMPLEMENTS BY: Vinícius G. Oliveira
DATE: 09/2021
*/

/* Incluindo a Lib do mongoose pra manipularmos as instancias do mongoDB */  
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

/* Constatntes de variaveis de ambiante - Credenciais do BD  */
const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const DATABASE = process.env.DB_DATABASE;

/* Método responsável por retornar a conexão com o mongoDB  */
module.exports = connectToDatabase = () => {
  if (isConnected) {
    return Promise.resolve();
  }

  /* Retorno de Execução da conexão com o mongoDB  */
  return mongoose.connect(`mongodb+srv://${USER}:${PASS}@${HOST}/${DATABASE}?retryWrites=true&w=majority`)
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
};