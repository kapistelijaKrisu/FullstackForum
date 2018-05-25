const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {secret} = require('../utils/config')
const { findByCategoryId, findByDudeId, insertForumpost } = require('../sqlqueries/forumpost')
const { findByID, findAll } = require('../sqlqueries/category')

router.get('/category/:categoryid', async (request, response) => {
    try {
        const forumposts = await findByCategoryId(request.params.categoryid)
        response.json(forumposts)
    } catch (exception) {
        return response.status(400).json({ error: 'url incorrect' })
    }
})
router.get('/dude/:dudeid', async (request, response) => {
    try {
        const forumposts = await findByDudeId(request.params.dudeid)
        response.json(forumposts)
    } catch (exception) {
        return response.status(400).json({ error: 'url incorrect' })
    }
})

router.post('/', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, secret)

    if (!token || !decodedToken.roleid) {
        return response.status(401).json({ error: 'login please before posting' })
    }
    const body = request.body
    if (!body.categoryid) {
        return response.status(400).json({ error: 'choose a category for this post please' })
    }
    if (!await findByID(body.categoryid)) {
        return response.status(400).json({ error: 'this category does not exist' })
    }
    if (body.title.length < 3) {
        return response.status(400).json({ error: 'title should be at least 3 characters long' })
    }
    if (body.content.length < 3) {
        return response.status(400).json({ error: 'content should be at least 3 characters long' })
    }

    try {
        let forumpost = body
        forumpost.creatorid = decodedToken.dudeid
        const baked = await insertForumpost(forumpost)
        response.json(baked)
    } catch (exception) {
        console.log(exception)
        return response.status(500).json({ error: 'uh oh server shat' })
    }

})
module.exports = router