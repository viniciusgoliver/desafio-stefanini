'use strict';

// Incluindo Bibliotecas Excensiais para o Funcionamento
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./src/database/db');

// Instanciando o controller
const FuncionarioController = require('./src/controllers/FuncionarioController');
const funcionarioController = new FuncionarioController();

// Function responsável por Criar novo registro
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
   
  connectToDatabase()
    .then(async () => {
      // Instancia Controller, chamando método create
      await funcionarioController.create(JSON.parse(event.body))
        .then(funcionario => callback(null, {
          statusCode: 200,
          body: JSON.stringify(funcionario)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the funcionario.'
        }));
    });  
};

// Function responsável por Retornar registro baseado no ID
module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async () => {
      const id = event.pathParameters.id

      // Instancia Controller, chamando método findOne
      await funcionarioController.findOne(id)
        .then(funcionario => callback(null, {
          statusCode: 200,
          body: JSON.stringify(funcionario)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the funcionario.'
        }));
    });
};

// Function responsável por Retornar todos os registros
module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async () => {            
       // Instancia Controller, chamando método findAll
      await funcionarioController.findAll()
        .then(funcionarios => callback(null, {
          statusCode: 200,
          body: JSON.stringify(funcionarios)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the funcionario.'
        }))
    });
};

// Function responsável por Atualizar um determinado registro
module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async () => {
      const id = event.pathParameters.id;
      const dados = event.body;

      // Instancia Controller, chamando método update
      await funcionarioController.update(id, JSON.parse(dados), { new: true })
        .then(funcionario => callback(null, {
          statusCode: 200,
          body: JSON.stringify(funcionario)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the funcionario.'
        }));
    });
};

// Function responsável por Excluir um determinado registro
module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async () => {
      const id = event.pathParameters.id;

      // Instancia Controller, chamando método delete
      await funcionarioController.delete(id)
        .then(funcionario => callback(null, {
          statusCode: 200,
          body: JSON.stringify(funcionario)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the funcionario.'
        }));
    });
};