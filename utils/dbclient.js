const config = require('./config')
const { Client } = require('pg');

const conString = config.db

const dbClient = new Client({
  connectionString: conString,
  ssl: true,
});

dbClient.connect();
console.log('in db file')

dbClient.query('SELECT * FROM Test;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  dbClient.end();
});

module.exports = {
    dbClient
  }