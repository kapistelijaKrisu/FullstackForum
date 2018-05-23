const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {secret} = require('../utils/config')
const { findByForumpostId, findByDudeId, insertComment } = require('../sqlqueries/comment')
const { findByID } = require('../sqlqueries/forumpost')

router.get('/forumpost/:forumpostid', async (request, response) => {
    try {
        const comments = await findByForumpostId(request.params.forumpostid)
        response.json(comments)
    } catch (exception) {
        return response.status(400).json({ error: 'url incorrect' })
    }
})
router.get('/dude/:dudeid', async (request, response) => {
    try {
        const comments = await findByDudeId(request.params.dudeid)
        response.json(comments)
    } catch (exception) {
        return response.status(400).json({ error: 'url incorrect' })
    }
})

router.post('/', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, secret)

    if (!token || !decodedToken.dudeid) {
        return response.status(401).json({ error: 'login first please' })
    }
    const body = request.body
    if (body.content.length < 1) {
        return response.status(400).json({ error: 'content should be at least 1 character long' })
    }
    if (!body.forumpostid) {
        return response.status(400).json({ error: 'choose the post u r commenting please' })
    }
    if (!await findByID(body.forumpostid)) {
        return response.status(400).json({ error: 'this post does not exist' })
    }


    try {
        let comment = body
        comment.creatorid = decodedToken.dudeid
        const baked = await insertComment(comment)
        response.json(baked)
    } catch (exception) {
        console.log(exception)
        return response.status(500).json({ error: 'uh oh server shat' })
    }

})
module.exports = router