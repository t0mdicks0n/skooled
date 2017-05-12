const express = require('express');
const router = express.Router();
const pg = require('../../psql-database');
const bodyParser = require('body-parser');
const services = require('../../services');
const Promise = require('bluebird');

const ensureAuthorized = services.ensureAuth;

router.use(express.static(__dirname + '/../../react-client/dist'));
router.use(bodyParser.json());

router.post('/create', ensureAuthorized, (req, res) => {
  // Teacher creates a document for an activity.
  // Check which user_id is currently authorised/logged in.
  // console.log('req.body inside POST /doc/create', req.body, 'req.decoded', req.decoded);

  // Get all student_id from db users_students table connected to currrent id_user.
  let id_user = req.decoded.id;
  pg.retrieveSelectedUsersStudents(id_user, (error, data) => {
    if (error) {
      // console.error('Error retrieving entries from users_students join table given id of logged in user.');
      res.sendStatus(404);
    } else {
      // console.log('Retrieved entries from users_students join table given id of logged in user.', data.models);
      // For each student, create new instance of doc in db, INCLUDING FOR TEACHER'S ID.
      // id  title  body  permissioned  user_id
      data.models.forEach(model => {
        let doc = {
          title: req.body.title,
          body: req.body.body,
          studentId: model.attributes.id_student
        };
        // console.log('doc to insert', doc);
        // console.log('pg', pg);
        pg.insertDocument(doc, (error, response) => {
          if (error) {
            // console.error('Error inserting doc for a specfic student.');
            res.sendStatus(404);   
          } else {
            // console.log('Success inserting doc for a specific student');
          }
        });
      });
      res.sendStatus(200);
    }
  });
});

router.get('/documents', ensureAuthorized, (req, res) => {
  // Teachers and parents fetch the list of documents applicable to them based on their id.
  // Check which user_id is currently authorised/logged in.
  // console.log('Inside GET /doc/documents req.body: ');
  let id_user = req.decoded.id;
  console.log('logged in user', req.decoded);

  // With the id_user, find all students associcated with that user.
  let documentsArrayToSendBackToClient = [];
  // Promisify retrieveSelectedUsersStudents.
  let retrieveSelectedUsersStudentsAsync = Promise.promisify(pg.retrieveSelectedUsersStudents);
  // Promisify selectApplicableDocuments.
  let selectApplicableDocumentsAsync = Promise.promisify(pg.selectApplicableDocuments);

  retrieveSelectedUsersStudentsAsync(id_user)
  .then(response => {
    // console.log('SANDWICH', response.models);
    return response.models.map(userStudentEntry => {
      return userStudentEntry.attributes.id_student;
    });
  })
  .then(studentIds => {
    // console.log('KETCHUP', studentIds);
    // For each of these student ids, fetch all documents pertaining to them.
    let results = [];

    // Recursive function to gather up all documents array for a user, iterating through the associated student ids of that user. Look at join table.
    function syncFetchDocs(studentsIdArray) {
      let studentId = studentsIdArray.pop();
      pg.selectApplicableDocuments(studentId, (error, list) => {
        results = results.concat(list.models)
        if (studentIds.length) {
          return syncFetchDocs(studentsIdArray);
        } else {
          // console.log('GRAPE', results);
          // For each object in the results array, extract the attributes.
          results = results.map(doc => {
            return doc.attributes;
          })
          // console.log('BACON', results);
          res.json(results);
        }
      });
    }
    
    return syncFetchDocs(studentIds);
  });

/*

  // With the id_user, find all students associated for that user.
  pg.retrieveSelectedUsersStudents(id_user, (error, usersStudentsEntries) => {
    if (error) {
      console.error('Error retrieving entries from users_students join table given id of logged in user.');
    } else {
      console.log('GET /documents - retrieved entries from users_students join table given id of logged in user.', usersStudentsEntries.models);
      // For each student, get documents from documents table where id_student === current id_student.
      let documentsArrayToSendBackToClient = [];

      usersStudentsEntries.models.forEach(usersStudentsEntry => {
        console.log('usersStudentsEntry', usersStudentsEntry.attributes.id_student);
      });

      let id_student = usersStudentsEntries.models[0].attributes.id_student;
      console.log('dshd', id_student);
      pg.selectApplicableDocuments(id_student, (error, docs) => {
        if (error) {
          console.error('Could not retrieve document given individual id_student.');
        } else {
          // Iterate through the list of documents.
          console.log('Retrieved documents from db given individual id', docs.models);

          const compileArray = function(doc, cb) {
            setTimeout(() => {
              documentsArrayToSendBackToClient.push(doc.attributes);
              cb();
            }, 100);
          };

          let requests = docs.models.map(doc => {
            return new Promise(resolve => {
              compileArray(doc, resolve);
            });
          });

          Promise.all(requests)
          .then(() => {
            console.log('documentsArrayToSendBackToClient', documentsArrayToSendBackToClient);
            // Send back to client.
            res.json(documentsArrayToSendBackToClient);
          })
        }
      });


      // const compileArray = function(model, cb) {
      //   setTimeout(() => {
      //     // console.log('This is the individual model iterated.', model);
      //     let id_student = model.attributes.id_student;
      //     pg.selectApplicableDocuments(id_student, (error, doc) => {
      //       if (error) {
      //         console.error('Could not retrieve document given individual id_student.');
      //       } else {
      //         console.log('Retrieved document given individual id_student.', doc.models[0].attributes);
      //         documentsArrayToSendBackToClient.push(doc.models[0].attributes);
      //         cb();
      //       }
      //     });
      //   }, 100);
      // };

      // let requests = data.models.map(model => {
      //   return new Promise(resolve => {
      //     compileArray(model, resolve);
      //   });
      // });

      // Promise.all(requests)
      // .then(() => {
      //   console.log('documentsArrayToSendBackToClient', documentsArrayToSendBackToClient);
      //   // Send back to client.
      //   res.json(documentsArrayToSendBackToClient);
      // });
    }
  });

*/
});

router.post('/user', (req, res) => {
  // Parent updates the permission status of the document to the db.
});

module.exports = router;