const testRouter = require('express').Router()

testRouter.get('/', async (request, response) => {

    response.json('Helllo world!')
})

module.exports = testRouter