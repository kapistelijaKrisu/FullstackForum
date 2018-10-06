let port = null
let db = 'lalala'

if (process.env.NODE_ENV === 'production') {
  const dotenv = require('dotenv').config({ path: __dirname + '/.env' })
  if (dotenv.error) {
    throw dotenv.error
  }
  // console.log(dotenv.parsed) in case u need this logged

  if (process.env.NODE_ENV === 'test') {
    port = process.env.TEST_PORT
    db = process.env.DEV_DB
  } else {
    port = process.env.DEV_PORT
    db = process.env.DEV_DB
  }
} else {
  port = process.env.PORT
  db = process.env.DATABASE_URL

}
const mod = process.env.SECRET_MOD
const secret = process.env.SECRET

module.exports = {
  port,
  secret,
  mod,
  db
}
