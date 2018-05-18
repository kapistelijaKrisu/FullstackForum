const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const dbInit = require('./utils/dbInit')
const testRouter = require('./controllers/testcontroller')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)

app.use('/api/', testRouter)

app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port  ${config.port}`)
})

module.exports = {
  app, server
}