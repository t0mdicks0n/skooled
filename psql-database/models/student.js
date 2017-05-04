var bookshelf = require('../bookshelf.js');

var Student = bookshelf.Model.extend({
  tableName: 'students',
  users: () => {
    return this.belongsToMany(User);
  }
});

module.exports = bookshelf.model('Student', Student);