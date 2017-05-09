var bookshelf = require('../bookshelf.js');

var UserStudent = bookshelf.Model.extend({
  tableName: 'users_students'
});

module.exports = bookshelf.model('UserStudent', UserStudent);