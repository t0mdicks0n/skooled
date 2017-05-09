// module.exports.up = function (knex, Promise) {
module.exports = function (knex, Promise) {

  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('email', 80).unique();
        table.string('password', 60);
        table.string('first_name', 80);
        table.string('last_name', 80);
        table.string('phone_number', 20);
        table.string('role', 20);
      });
    }
  })

  knex.schema.hasTable('students').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('students', (table) => {
      table.increments('id');
      table.string('first_name', 80);
      table.string('last_name', 80);
      });
    }
  });

  knex.schema.hasTable('users_students').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users_students', (table) => {
      table.increments('id');
      table.integer('id_user').references('users.id');
      table.integer('id_student').references('students.id');
    }).catch((error) => {
      console.log('database error:', error);
      });
    }
  });

};

// module.exports.down = function (knex, Promise) {
//   knex.schema.raw('DROP TABLE IF EXISTS users, students, users_students CASCADE');
// };