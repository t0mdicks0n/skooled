var express = require('express');
var router = express.Router();
var pg = require('../../psql-database');
var bodyParser = require('body-parser');
var services = require('../../services');

var ensureAuthorized = services.ensureAuth;

router.use(express.static(__dirname + '/../../react-client/dist'));
router.use(bodyParser.json());

router.get('/userdata', ensureAuthorized, (req, res) => {
	var user = {};
	user.email = req.headers['username'];
  pg.selectUser(user, (error, data) => {
  	if (error) {
  		console.log('Error retrieving data on user ', req.headers['username']);
  		res.sendStatus(500);
  	} else {
  		res.send(data);
  	}
  })
});

module.exports = router;