const router = require('express').Router()
const getSecurityContext = require('../utils/auth')
const addCategory = require('../services/category/addCategory')
const findAllCategories = require('../services/category/findAll')
const exceptionLog = require('../utils/exceptionLog');

router.get('/', async (request, response) => {
    try {
        return response.json(await findAllCategories());
    } catch (exception) {
        return exceptionLog(exception, response);
    }
})

router.post('/', async (request, response) => {
    try {
        const securityContext = getSecurityContext(request.token);
        return securityContext.hasModRigths
            ? response.json(await addCategory(request.body, response, securityContext.dudeId))
            : response.status(401).json({ error: 'unauthorized' })

    } catch (exception) {
        return exceptionLog(exception, response);
    }
})
module.exports = router