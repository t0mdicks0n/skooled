const express = require('express');
const router = express.Router();
const pg = require('../../psql-database');
const bodyParser = require('body-parser');
const services = require('../../services');

const ensureAuthorized = services.ensureAuth;

router.use(express.static(__dirname + '/../../react-client/dist'));
router.use(bodyParser.json());

router.post('/create', (req, res) => {
  // Teacher creates a document for an activity.
  console.log('req.body inside POST /doc/create req.body');

});

router.get('/user', (req, res) => {
  // Teachers and parents fetch the list of documents applicable to them based on their id.
});

router.post('/user', (req, res) => {
  // Parent updates the permission status of the document to the db.
});

module.exports = router;