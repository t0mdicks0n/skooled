const bookshelf = require('../bookshelf.js');

const Document = bookshelf.Model.extend({
  tableName: 'documents',
  users: () => {
    return this.belongsToMany(User);
  }
})

module.exports = bookshelf.model('Document', Document);