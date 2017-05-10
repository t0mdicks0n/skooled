const bookshelf = require('../bookshelf.js');

const UserDocument = bookshelf.Model.extend({
  tableName: 'users_documents'
});

module.exports = bookshelf.model('UserDocument', UserDocument);