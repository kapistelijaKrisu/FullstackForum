
if (process.env.NODE_ENV !== 'production') {
  console.log('not production')
  require('dotenv').config()
}

let port = null
//sql tähä
if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  dbPort = process.env.DEV_DB
} else {
  port = process.env.DEV_PORT
  dbPort = process.env.DEV_DB
}


module.exports = {
  port,
  dbPort
}