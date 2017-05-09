var User = require('./models/user.js');
var Student = require('./models/student.js');

module.exports = {
  // ADMIN PAGE: ADD USER
  insertUser : (user, callback) => {
    User.forge({
      email: user.email,
      password: user.password,
      first_name: user.firstName,
      last_name: user.lastName,
      phone_number: user.phone,
      role: user.role
      // email: '123abc@example.com',
      // password: '123',
      // first_name: 'John',
      // last_name: 'Doe',
      // phone_number: '18001234567',
      // role: 'admin'
    }).save().then(function(user) {
      callback(null, user);
    }).catch(function(err) {
      callback(err, null);
    })
  },

  // LOGIN PAGE: GET USER BY EMAIL
  selectUser : (user, callback) => {
    User.forge({email: user.email})
    .fetch({require: true})
    .then(function (user) {
      // console.log('user info:', user);
      callback(null, user);
    })
    .catch(function (err) {
      // console.log('message:', err.message);
      callback(err, null);
    })
  },

  // ADMIN PAGE: ADD STUDENT
  insertStudent : (user, student, callback) => {
    Student.forge({
      first_name: student.firstName,
      last_name: student.lastName
    }).save().then(function(student) {
      callback(null, student);
    }).catch(function(err) {
      callback(err, null);
    });
  },

  // ADMIN PAGE: GET ALL STUDENTS
  selectAllStudents : (user, callback) => {
    Student.collection().fetch()
    .then(function(students) {
      callback(null, students);
    }).catch(function(err) {
      callback(err, null);
    });
  }

};

/*
USE DATABASE COMMAND BELOW TO CLEAR ALL TABLES...
DROP TABLE IF EXISTS users, students, users_students CASCADE;
*/


/*
// ADMIN PAGE: DELETE USER BY EMAIL
User.forge({email: 'abc123@example.com'})
.fetch({require: true})
.then(function (category) {
  category.destroy()
  .then(function () {
    console.log('Category successfully deleted');
  })
  .catch(function (err) {
    console.log('message:', err.message);
  });
})
.catch(function (err) {
  console.log('message:', err.message);
});
// ADMIN PAGE: ADD STUDENT
Student.forge({
  first_name: 'Jimmy',
  last_name: 'John'
}).save().then(function(newRow) {
  console.log(newRow.id); // Returns ID of new row
}).catch(function(err) {
  console.log(err);
});
// ADMIN PAGE: GET ALL USERS
User.collection().fetch().then(function(users) {
   console.log(JSON.stringify(users)); // collection of users
});
// ADMIN PAGE: GET ALL STUDENTS
Student.collection().fetch().then(function(users) {
   console.log(JSON.stringify(users)); // collection of users
});
// ADMIN PAGE: DELETE USER BY ID
User.forge({id: 1}).fetch().then(function (item) {
  return item.destroy().then(function () {
      console.log('destroyed!');
    });
});
// ADMIN PAGE: DELETE STUDENT BY ID
Student.forge({id: 1}).fetch().then(function (item) {
  return item.destroy().then(function () {
      console.log('destroyed!');
    });
});
*/