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

app.get('/login', function (req, res) {
  pg.selectUser({email: '123abc@example.com'}, function(err, data) {
    if(err) {
      res.sendStatus(500);
      res.send(JSON.stringify(data));
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});