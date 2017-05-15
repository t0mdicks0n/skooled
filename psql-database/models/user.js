var bookshelf = require('../bookshelf.js');

var User = bookshelf.Model.extend({
  tableName: 'users',
  students: () => {
    return this.belongsToMany(Student);
  }
});

module.exports = bookshelf.model('User', User);