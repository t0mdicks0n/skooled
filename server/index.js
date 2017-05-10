var express = require('express');
var bodyParser = require('body-parser');
var pg = require('../psql-database');
var services = require('../services');
var home = require('./routers/admin');
var admin = require('./routers/admin');
var doc = require('./routers/document');


var ensureAuthorized = services.ensureAuth;
var createToken = services.createToken;

var app = express();

app.use('/home', admin);
app.use('/admin', admin);
app.use('/doc', admin);
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

// Shows how secured paths works and get executed when the user enters the website the first time
app.get('/checkOnClientLoad', ensureAuthorized, function(req, res) {
  res.json({userid: req.decoded.id});
});

// Insert demo-user
pg.insertUser({
  email: '123abc@example.com',
  password: '123',
  firstName: 'John',
  lastName: 'Doe',
  phone: '18001234567',
  role: 'teacher'
}, (error, data) => {
  if (error) {
    console.error('Error inserting fake user.', error);
  } else {
    console.log('Inserted fake user ok.', data);
  }
});

app.post('/login', (req, res) => {
  let retrievedUser;
  pg.selectUser({email: req.body.username}, (error, data) => {
    if (error) {
      res.sendStatus(500);
      res.send(JSON.stringify(data));
    } else {
      services.checkHashPassword(req.body.password, data.attributes.password, (err, match) => {
        if (err) console.log('password issue:', err);
        if (match) {
          var payload = {id: data.attributes.id};
          var token = createToken(payload);
          res.json({isLoggedIn: true, jwtToken: token });
        } else {
          res.json({isLoggedIn: false});
        }
      });
    }
  });
});


app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on enviornment port or 5000!');
});