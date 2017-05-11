var bcrypt = require('bcryptjs');
var auth = require('./auth.js');
var email = require('./email.js');


module.exports = {

  //////////////////////////////////////////////
  // HASH PASSWORD FUNCTIONS
  //////////////////////////////////////////////
  createHashPassword : (plainTextPassword, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(plainTextPassword, salt).then((hash) => {
        callback(null, hash);
      }).catch((err) => {
        callback(err, null);
      });
    });
  },

  checkHashPassword : (plainTextPassword, hash, callback) => {
    bcrypt.compare(plainTextPassword, hash).then((value) => {
      callback(null, value);
    }).catch((err) => {
      callback(err, null);
    });
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



