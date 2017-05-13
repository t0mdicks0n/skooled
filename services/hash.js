var bcrypt = require('bcryptjs');
var Promise = require('bluebird');

module.exports = {
  createHashPassword : (plainTextPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plainTextPassword, 10, (err, hash) => {
        if (err) { return reject(err); };
        resolve(hash);
      });
    });
  },

  checkHashPassword : (plainTextPassword, databaseHashPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainTextPassword, databaseHashPassword, (err, match) => {
        if (err) {return reject(err); };
        resolve(match);
      });
    });
  },


};