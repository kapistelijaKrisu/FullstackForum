const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { findByCategoryId, findByDudeId, insertForumpost } = require('../sqlqueries/forumpost')

router.get('/category/:categoryid', async (request, response) => {
    const forumposts = await findByCategoryId(request.params.categoryid)
    response.json(categories)
})
router.get('/dude/:dudeid', async (request, response) => {
    const forumposts = await findByDudeId(request.params.dudeid)
    response.json(categories)
})

router.post('/', async (request, response) => {
   /* const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'unauthorized' })
    }
    const body = request.body
    if (body.name.length < 3) {
        return response.status(400).json({ error: 'name should be at least 3 cahracters long' })
    }
    if (body.description.length < 3) {
        return response.status(400).json({ error: 'description should be at least 3 cahracters long' })
    }

    try {
        let category = body
        category.creatorid = decodedToken.id
        const baked = await insertCategory(category)
        response.json(baked)
    } catch (exception) {*/
        return response.status(500).json({ error: 'uh oh server shat' })
   // }

})
module.exports = router