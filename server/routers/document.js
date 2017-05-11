const express = require('express');
const router = express.Router();
const pg = require('../../psql-database');
const bodyParser = require('body-parser');
const services = require('../../services');

const ensureAuthorized = services.ensureAuth;

router.use(express.static(__dirname + '/../../react-client/dist'));
router.use(bodyParser.json());

router.post('/create', ensureAuthorized, (req, res) => {
  // Teacher creates a document for an activity.
  // Check which user_id is currently authorised/logged in.
  console.log('req.body inside POST /doc/create', req.body, 'req.decoded', req.decoded);

  // Get all student_id from db users_students table connected to currrent id_user.
  let id_user = req.decoded.id;
  pg.retrieveSelectedUsersStudents(id_user, (error, data) => {
    if (error) {
      console.error('Error retrieving entries from users_students join table given id of logged in user.');
      // res.sendStatus(404);
    } else {
      console.log('Retrieved entries from users_students join table given id of logged in user.', data.models);
      // For each student, create new instance of doc in db, INCLUDING FOR TEACHER'S ID.
      // id  title  body  permissioned  user_id
      data.models.forEach(model => {
        let doc = {
          title: req.body.title,
          body: req.body.body,
          studentId: model.attributes.id_student
        };
        console.log('doc to insert', doc);
        console.log('pg', pg);
        pg.insertDocument(doc, (error, response) => {
          if (error) {
            console.error('Error inserting doc for a specfic student.');
            // res.sendStatus(404);   
          } else {
            console.log('Success inserting doc for a specific student');
            // res.sendStatus(200);
          }
        });
      });
    }
  });
});

router.get('/user', (req, res) => {
  // Teachers and parents fetch the list of documents applicable to them based on their id.

  // Check which user_id is currently authorised/logged in.

  // Get documents from documents table where user_id === current user_id.

  // Send back to client.

});

router.post('/user', (req, res) => {
  // Parent updates the permission status of the document to the db.
});

module.exports = router;