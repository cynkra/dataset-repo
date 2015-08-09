import database from '../config/config.database';

const db = require('knex')({
  client: database.client,
  connection: {
    host:     database.host,
    user:     database.user,
    password: database.password,
    database: database.database
  },
  pool: {
    min: 0,
    max: 100
  }
});

export default db;
