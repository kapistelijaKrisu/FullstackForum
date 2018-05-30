const http = require('http')
const express = require('express')
const path = require('path');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const dbInit = require('./utils/dbInit')
const dudeRouter = require('./controllers/dude')
const loginRouter = require('./controllers/login')
const rootRouter = require('./controllers/root')
const categoryRouter = require('./controllers/category')
const forumpostRouter = require('./controllers/forumpost')
const commentRouter = require('./controllers/comment')

app.use(cors())
app.use(bodyParser.json())
//app.use(express.static('build'))
app.use(express.static(path.join(__dirname, 'client/build')))
app.get("/build",function() {});

app.use(middleware.logger)
app.use(middleware.tokenExtractor)

app.use('/api', rootRouter)
app.use('/api/category', categoryRouter)
app.use('/api/dude', dudeRouter)
app.use('/api/login', loginRouter)
app.use('/api/forumpost', forumpostRouter)
app.use('/api/comment', commentRouter)

app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port  ${config.port}`)
})

module.exports = {
  app, server
}