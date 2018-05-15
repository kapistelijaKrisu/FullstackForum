
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = null
//sql tähä
if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
} else {
  port = process.env.DEV_PORT
}


module.exports = {
  port
}