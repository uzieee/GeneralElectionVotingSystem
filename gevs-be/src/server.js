// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const userRoutes = require('./routes/userRoutes'); // Update this line

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Set up Knex for SQLite
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
  useNullAsDefault: true,
});

app.use('/api/users', userRoutes(db));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
