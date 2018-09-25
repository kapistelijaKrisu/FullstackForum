const config = require('./api_config')
const { Pool } = require('pg');

const conString = config.db

const pool = new Pool({
  connectionString: conString,
  ssl: true,
});

module.exports = {
    pool
  }