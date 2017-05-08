'use strict';

const
  mongoose = require('mongoose')

mongoose.Promise = global.Promise

function _checkMongo(connectionString) {
  return new Promise((resolve, reject) => {
    let connection = mongoose.createConnection(connectionString)
    connection.on('connected', () => {
      connection.close()
      resolve({ isOk: true })
    })
    connection.on('error', error => {
      reject(error)
    })
  }).catch(error => ({ isOk: false, error}))
}

module.exports = {
  check: _checkMongo
}