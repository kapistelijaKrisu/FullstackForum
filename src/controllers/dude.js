const router = require('express').Router()
const addDude = require('../services/dude/addDude')
const exceptionLog = require('../utils/exceptionLog')

router.post('/', async (request, response) => {
    try {
        return addDude(request, response)
    } catch (exception) {
        return exceptionLog(exception, response);
    }
})
module.exports = router