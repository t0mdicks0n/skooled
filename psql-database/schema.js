module.exports = function (knex) {
  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('email', 80);
        table.string('password', 80);
        table.string('first_name', 80);
        table.string('last_name', 80);
        table.string('phone_number', 10);
        table.string('role', 20);
        table.string('salt', 80);
      });
    }
  }).then(() => { console.log('users table set') } );

  knex.schema.hasTable('user_students').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('user_students', (table) => {
        table.increments('id');
        table.integer('id_users');
        table.integer('id_students');
      });
    }
  }).then(() => { console.log('users_students table set') } );

  knex.schema.hasTable('students').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('students', (table) => {
        table.increments('id');
        table.string('first_name', 80);
        table.string('last_name', 80);
      });
    }
  }).then(() => { console.log('students table set') } );
};