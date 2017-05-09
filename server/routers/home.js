var express = require('express');
var router = express.Router();
var pg = require('../../psql-database');
var bodyParser = require('body-parser');

router.use(express.static(__dirname + '/../../react-client/dist'));
router.use(bodyParser.json());

module.exports = router;