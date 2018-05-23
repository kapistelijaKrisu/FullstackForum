const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { findAll, insertCategory, findByName } = require('../sqlqueries/category')
const { getModId } = require('../sqlqueries/role')

router.get('/', async (request, response) => {
    const categories = await findAll()
    response.json(categories)
})

router.post('/', async (request, response) => {
    try {
        const token = request.token
        console.log(request.body)
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || decodedToken.roleid !== getModId()) {
            return response.status(401).json({ error: 'unauthorized' })
        }
        const body = request.body
        if (body.name.length < 3) {
            return response.status(400).json({ error: 'name should be at least 3 cahracters long' })
        }
        if (body.description.length < 3) {
            return response.status(400).json({ error: 'description should be at least 3 cahracters long' })
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