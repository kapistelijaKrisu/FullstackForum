
let port = null
let db = null

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
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

const secret =  process.env.SECRET

module.exports = {
  port,
  db,
  secret
}