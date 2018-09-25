const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { secret } = require('../config/api_config')
const { findAll, insertCategory, findByName } = require('../model/category')
const { getModId } = require('../model/role')
const { isInLength } = require('../utils/validation')

router.get('/', async (request, response) => {
    const categories = await findAll()
    response.json(categories)
})

router.post('/', async (request, response) => {
    try {
        const token = request.token
        const decodedToken = jwt.verify(token, secret)

        if (!token || decodedToken.roleid !== getModId()) {
            return response.status(401).json({ error: 'unauthorized' })
        }
        let body = request.body
        body.name = body.name.trim()
        body.description = body.description.trim()
        if (!isInLength(2, 31, true, body.name)) {
            return response.status(400).json({ error: 'name should be 2-31 characters long' })
        }
        if (!isInLength(2, 31, true, body.description)) {
            return response.status(400).json({ error: 'description should be 2-31characters long' })
        }
        if (await findByName(body.name)) {
            return response.status(400).json({ error: 'Category of this name already exists' })
        }

        let category = body
        category.creatorid = decodedToken.dudeid
        const baked = await insertCategory(category)
        response.json(baked)
    } catch (exception) {
        console.log(exception)
        return response.status(500).json({ error: 'uh oh server shat' })
    }

})
module.exports = router