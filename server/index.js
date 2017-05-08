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

pg.insertUser();


app.post('/login', function (req, res) {
  console.log('req.body', req.body);
  // console.log('body', typeof req.body.username);

  let retrievedUser;
  pg.selectUser({email: req.body.username}, function(err, data) {
    if(err) {
      // res.sendStatus(500);
      // res.send(JSON.stringify(data));
    } else {
      console.log('data from db', data.attributes);
      console.log('client password', req.body.password);
      console.log('db password', data);
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

  // Compare username & password from client with data from db.


});

app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on enviornment port or 5000!');
});