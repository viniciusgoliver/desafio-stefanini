const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const DATABASE = process.env.DB_DATABASE;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    return Promise.resolve();
  }

  return mongoose.connect(`mongodb+srv://${USER}:${PASS}@${HOST}/${DATABASE}?retryWrites=true&w=majority`)
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
};