var bcrypt = require('bcryptjs');
var auth = require('./auth.js');
var email = require('./email.js');

module.exports = {

  //////////////////////////////////////////////
  // HASH PASSWORD FUNCTIONS
  //////////////////////////////////////////////
  // No need to store the salt because the hash includes it at the beginning
  // Salt is added at beginning to hash like $2a$10$CVKM/Y5YTdSih615f70aUe
  // Hash would be $2a$10$CVKM/Y5YTdSih615f70aUeqiAJ0EV0PyohI8700T6GwlBjYQpQgBy
  //////////////////////////////////////////////
  createHashPassword : (plainTextPassword, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(plainTextPassword, salt).then((hash) => {
        // console.log('Store hash as password:', hash);
        callback(null, hash);
      }).catch((err) => {
        callback(err, null);
      });
    });
  },

  checkHashPassword : (plainTextPassword, hash, callback) => {
    bcrypt.compare(plainTextPassword, hash).then((value) => {
      // console.log(value === true);
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
    // var data = {
    //   from: 'test@example.com',
    //   to: 'test@gmail.com',
    //   subject: 'Hello from Mailgun',
    //   html: 'Here we go again...'
    // };
    auth.sendEmail(data);
  },

  //////////////////////////////////////////////
  // STRIPE PAYMENT FUNCTIONS
  //////////////////////////////////////////////

};



