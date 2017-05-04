var dbConfig = require('./config');
var knex = require('knex')(dbConfig);
var schema = require('./schema.js')(knex);
var bookshelf = require('bookshelf')(knex);
// module.exports = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
   tableName: 'users'
});

var Student = bookshelf.Model.extend({
   tableName: 'users',
   function () {
      return this.belongsTo(User, 'category_id');
    },
});

// console.log(User.)

// new User({id: 1}).fetch().then(function(user) {
//   console.log(JSON.stringify(user)); // user with `id` of 1
// })

// User.collection().fetch().then(function(users) {
//    console.log(JSON.stringify(users)); // collection of users
// })