const router = require('express').Router()
const exceptionLog = require('../utils/exceptionLog')
const findCommentsByforumpostId = require('../services/comment/findByForumpostId')
const addCommentToForumpost = require('../services/comment/addComment')

router.get('/forumpost/:forumpost_id', async (request, response) => {
    try {
        response.json(await findCommentsByforumpostId(request.params.forumpost_id))
    } catch (exception) {
        return exceptionLog(exception, response);
    }
})
router.get('/dude/:dude_id', async (request, response) => {
    try {
        response.json(await findCommentsByDudeId(request.params.dude_id))
    } catch (exception) {
        return exceptionLog(exception, response);
    }
})

router.post('/', async (request, response) => {
    try {
        return request.securityContext
            ? await addCommentToForumpost(request, response)
            : response.status(401).json({ error: 'unauthorized' })
        
    } catch (exception) {
        return exceptionLog(exception, response);
    }

})
module.exports = router