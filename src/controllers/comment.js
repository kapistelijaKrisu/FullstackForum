const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { secret } = require('../config/api_config')
const { findByForumpostId, findByDudeId, insertComment } = require('../model/comment')
const { findForumpost } = require('../model/forumpost')
const { isInLength } = require('../utils/validation')

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
    try {
        const token = request.token
        const decodedToken = jwt.verify(token, secret)

        if (!token || !decodedToken.dudeid) {
            return response.status(401).json({ error: 'login first please' })
        }
        let body = request.body
        body.content = body.content.trim()
        
        if (!isInLength(1, 1023, true, body.content)) {
            return response.status(400).json({ error: 'content should be 1-1023 character long' })
        }
        if (!body.forumpostid) {
            return response.status(400).json({ error: 'choose the post u r commenting please' })
        }
        if (!await findForumpost(body.forumpostid)) {
            return response.status(400).json({ error: 'this post does not exist' })
        }

        let comment = body
        comment.creatorid = decodedToken.dudeid
        let baked = await insertComment(comment)
        baked.creatorname = decodedToken.username
        response.json(baked)
    } catch (exception) {
        console.log(exception)
        return response.status(500).json({ error: 'uh oh server shat' })
    }

})
module.exports = router