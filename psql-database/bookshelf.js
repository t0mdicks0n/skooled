var dbConfig = require('./config');
var knex = require('knex')(dbConfig);
var schema = require('./schema.js')(knex);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports = bookshelf;