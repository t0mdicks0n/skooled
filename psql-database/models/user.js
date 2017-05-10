var bookshelf = require('../bookshelf.js');

var User = bookshelf.Model.extend({
  tableName: 'users',
  students: () => {
    return this.belongsToMany(Student);
  },
  // Preda: added this to create join table but not sure if this is necessary at this point in time.
  documents: () => {
    return this.belongsToMany(Document);
  }
});

module.exports = bookshelf.model('User', User);