var hash = require('./hash.js');
var auth = require('./auth.js');
var email = require('./email.js');


module.exports = {

  //////////////////////////////////////////////
  // HASH PASSWORD FUNCTIONS
  //////////////////////////////////////////////
  createHashPassword : (plainTextPassword) => {
    return hash.createHashPassword(plainTextPassword);
  },
  checkHashPassword : (plainTextPassword, databaseHashPassword) => {
    return hash.checkHashPassword(plainTextPassword, databaseHashPassword);
  },

  //////////////////////////////////////////////
  // PASSPORT JSON WEB TOKEN FUNCTIONS
  //////////////////////////////////////////////
  ensureAuth : (req, res, next) => {
    auth.ensureAuth(req, res, next);
  },

  createToken : (payload) => {
    return auth.createToken(payload);
  },

  //////////////////////////////////////////////
  // EMAIL FUNCTIONS
  //////////////////////////////////////////////
  sendEmail : (data) => {
    email.sendEmail(data);
  },

  //////////////////////////////////////////////
  // STRIPE PAYMENT FUNCTIONS
  //////////////////////////////////////////////

};



