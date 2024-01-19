// gevs-backend/src/migrate.js
const knex = require('knex');
const config = require('../knexfile');

const db = knex(config);

async function migrate() {
  try {
    await db.migrate.latest();
    console.log('Migration successful');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await db.destroy();
  }
}

migrate();
