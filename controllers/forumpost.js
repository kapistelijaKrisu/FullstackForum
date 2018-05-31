const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { secret } = require('../utils/config')
const { findByCategoryId, findByDudeId, insertForumpost, findForumpost } = require('../sqlqueries/forumpost')
const { findByID, findAll } = require('../sqlqueries/category')
const { insertComment } = require('../sqlqueries/comment')
const { isInLength } = require('../utils/validation')

router.get('/:forumpostid', async (request, response) => {
    try {
        const forumpost = await findForumpost(request.params.forumpostid)
        response.json(forumpost)

    } catch (exception) {
        console.log(exception)
        response.status(404).json({ error: 'not found' })
    }
})

router.get('/category/:categoryid', async (request, response) => {
    try {
        const forumposts = await findByCategoryId(request.params.categoryid)
        response.json(forumposts)
    } catch (exception) {
        console.log(exception)
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
    try {
        const token = request.token
        const decodedToken = jwt.verify(token, secret)

        if (!token || !decodedToken.roleid) {
            return response.status(401).json({ error: 'login please before posting' })
        }
        let body = request.body
        body.content = body.content.trim()
        body.title = body.title.trim()
        if (!body.categoryid) {
            return response.status(400).json({ error: 'choose a category for this post please' })
        }
        if (!await findByID(body.categoryid)) {
            return response.status(400).json({ error: 'this category does not exist' })
        }
        if (!isInLength(2, 31, true, body.title)) {
            return response.status(400).json({ error: 'title should 2-31 characters long' })
        }
        if (!isInLength(2, 1023, true, body.content)) {
            return response.status(400).json({ error: 'content should be 2-1023 characters long' })
        }


        let forumpost = body
        forumpost.creatorid = decodedToken.dudeid
        const baked = await insertForumpost(forumpost)

        let comment = {}
        comment.content = body.content
        comment.creatorid = decodedToken.dudeid
        comment.forumpostid = baked.forumpostid
        await insertComment(comment)

        response.json(baked)
    } catch (exception) {
        console.log(exception)
        return response.status(500).json({ error: 'uh oh server shat' })
    }

})
module.exports = router