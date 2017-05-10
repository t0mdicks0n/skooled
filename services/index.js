var config = require('./config/config.js');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");

// Passport JSON Web Token (JWT) variables
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = config.PASSPORT_JWT_SECRETORKEY;


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
    var token = req.headers['authorization'];
    jwt.verify(token, jwtOptions.secretOrKey, function(err, decoded) {
      if (err) {
        res.sendStatus(403);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  },

  createToken : (payload) => {
    return jwt.sign(payload, jwtOptions.secretOrKey);
  }


  //////////////////////////////////////////////
  // EMAIL FUNCTIONS
  //////////////////////////////////////////////


  //////////////////////////////////////////////
  // STRIPE PAYMENT FUNCTIONS
  //////////////////////////////////////////////

};



