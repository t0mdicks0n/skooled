var User = require('./models/user.js');
var Student = require('./models/student.js');

User.forge({
  email: 'test@example.com',
  password: '123',
  first_name: 'John',
  last_name: 'Doe',
  phone_number: '18001234567',
  role: 'admin',
  salt: '123SADF908',
}).save().then(function(newRow) {
  console.log(newRow.id); // Returns ID of new row
}).catch(function(err) {
  console.log(err);
});

Student.forge({
  first_name: 'Jimmy',
  last_name: 'John'
}).save().then(function(newRow) {
  console.log(newRow.id); // Returns ID of new row
}).catch(function(err) {
  console.log(err);
});


// User.collection().fetch().then(function(users) {
//    console.log(JSON.stringify(users)); // collection of users
// });


// User.forge({id: 1}).fetch().then(function (item) {
//   return item.destroy().then(function () {
//       console.log('destroyed!');
//     });
// });

// Student.forge({id: 1}).fetch().then(function (item) {
//   return item.destroy().then(function () {
//       console.log('destroyed!');
//     });
// });