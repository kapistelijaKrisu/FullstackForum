
let port = null
let dbport = null

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  if (process.env.NODE_ENV === 'test') {
    port = process.env.TEST_PORT
    dbPort = process.env.DEV_DB
  } else {
    port = process.env.DEV_PORT
    dbPort = process.env.DEV_DB
  }
} else {
  port = process.env.PORT
  dbPort = process.env.DATABASE_URL
}

//sql tähä



module.exports = {
  port,
  dbPort
}