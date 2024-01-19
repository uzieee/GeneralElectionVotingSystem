// gevs-backend/src/create_users_table.js
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('firstName');
      table.string('lastName');
      table.string('email').unique();
      table.string('password'); // In production, this should be a hashed password
      table.string('dateOfBirth');
      table.string('constituency');
      table.string('uvc');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  