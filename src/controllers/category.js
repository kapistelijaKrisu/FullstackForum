const router = require('express').Router()
const getSecurityContext = require('../utils/auth')
const addCategory = require('../services/category/addCategory')
const findAllCategories = require('../services/category/findAll')

router.get('/', async (request, response) => {
    return response.json(await findAllCategories());
})

router.post('/', async (request, response) => {
    try {
        const securityContext = getSecurityContext(request.token);
        return securityContext.hasModRigths
        ? response.json(await addCategory(request.body, response, securityContext.dudeId))
        : response.status(401).json({ error: 'unauthorized' })
    
    } catch (exception) {
        console.log(exception)
        return response.status(500).json({ error: 'uh oh server shat' })
    }
})
module.exports = router