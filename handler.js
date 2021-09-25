'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./src/database/db');
const UserController = require('./src/controllers/UserController');

const userController = new UserController();

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  connectToDatabase()
    .then(async () => {
      await userController.create(JSON.parse(event.body))
        .then(user => callback(null, {
          statusCode: 200,
          body: JSON.stringify(user)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the user.'
        }));
    });  
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async () => {
      const id = event.pathParameters.id
      await userController.findOne(id)
        .then(user => callback(null, {
          statusCode: 200,
          body: JSON.stringify(user)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the user.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async () => {            
      await userController.findAll()
        .then(users => callback(null, {
          statusCode: 200,
          body: JSON.stringify(users)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the user.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async () => {
      const id = event.pathParameters.id;
      const dados = event.body;

      await userController.update(id, JSON.parse(dados), { new: true })
        .then(user => callback(null, {
          statusCode: 200,
          body: JSON.stringify(user)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the user.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async () => {
      const id = event.pathParameters.id;
      await userController.delete(id)
        .then(user => callback(null, {
          statusCode: 200,
          body: JSON.stringify(user)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the user.'
        }));
    });
};