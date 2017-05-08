var express = require('express');
var bodyParser = require('body-parser');
var pg = require('../psql-database');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

// app.post('/admin', function (req, res) {
//   pg.insertUser(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       console.log('values received for admin page:', data);
//     }
//   });
// });

// app.post('/admin', function(req, res) {
//   console.log(req.body);
//   res.send('Hello');
// });

// Insert demo-user
pg.insertUser({
   email: '123abc@example.com',
    password: '123',
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '18001234567',
    role: 'admin',
    salt: '123SADF908',
});

app.post('/login', (req, res) => {
  // console.log('req.body', req.body);
  // console.log('body', typeof req.body.username);

  let retrievedUser;
  pg.selectUser({email: req.body.username}, (error, data) => {
    if (error) {
      res.sendStatus(500);
      res.send(JSON.stringify(data));
    } else {
      // console.log('data from db', data.attributes);
      // console.log('client password', req.body.password);
      // console.log('db password', data);
      // Compare username & password from client with data from db.
      if (req.body.password === data.attributes.password) {
        // let responseData = {
        //   username: req.body.username,
        //   password: req.body.password,
        //   found: true
        // };
        console.log('Reached inside if statement');
        res.json({isLoggedIn: true});
      } else {
        res.json({isLoggedIn: false});
      }
      // retrievedUser = data;
      // res.json(data);
    }
  });
});


app.post('/admin/teacher', (req, res) => {
  console.log('req.body', req.body);
  pg.insertUser({req.body}, (error, data) => {
    if (error) {
      console.log('Error inserting new teacher info to db.', error);
      res.sendStatus(500);
    } else {
      console.log('Inserted new teacher info to db.', data);
      res.sendStatus(200);
    }
  })
});


app.get('/admin/parent', (req, res) => {
  // This gets the students in array from the db to send back to the client.
  // Client then renders this in the drop down options to link parent to a student.
  pg.selectAllStudents((error, data) => {
    if (error) {
      console.error('Error retrieving all students from db', error);
      res.sendStatus(500);
    } else {
      console.log('Retrieved all students from db', data);
      res.json(data);
    }
  });
});


app.post('/admin/parent', (req, res) => {
  console.log(req.body);
  pg.insertUser({req.body}, (error, data) => {
    if (error) {
      console.error('Error inserting new parent info to db.', error);
      res.sendStatus(500);
    } else {
      console.log('Inserted new parent info to db.', data);
      res.sendStatus(200);
    }
  });
});

app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on enviornment port or 5000!');
});