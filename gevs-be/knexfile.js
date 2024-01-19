// gevs-backend/knexfile.js
module.exports = {
    client: 'sqlite3',
    connection: {
      filename: './src/database.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/migrations',
    },
  };
  