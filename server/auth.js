var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

module.exports.ensureAuth = function (req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, jwtOptions.secretOrKey, function(err, decoded) {
    if (err) {
      res.sendStatus(403);
    } else {
      req.decoded = decoded;
      next();
    }
  });
};

module.exports.createToken = function(payload) {
	return jwt.sign(payload, jwtOptions.secretOrKey);
};