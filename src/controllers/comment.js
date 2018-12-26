const router = require('express').Router()
const exceptionLog = require('../utils/exceptionLog')
const findCommentsByforumpostId = require('../services/comment/findByForumpostId')
const addCommentToForumpost = require('../services/comment/addComment')
const editComment = require('../services/comment/editComment')

router.get('/forumpost/:forumpost_id', async (request, response) => {
    try {
        response.json(await findCommentsByforumpostId(request, response))
    } catch (exception) {
        return exceptionLog(exception, response);
    }
})
/*
//outdated refactor to request/response and include deleted if time to improve user page
router.get('/dude/:dude_id', async (request, response) => {
    try {
        response.json(await findCommentsByDudeId(request.params.dude_id))
    } catch (exception) {
        return exceptionLog(exception, response);
    }
})
*/
router.post('/', async (request, response) => {
    try {
        return request.securityContext
            ? await addCommentToForumpost(request, response)
            : response.status(401).json({ error: 'unauthorized' })
        
    } catch (exception) {
        return exceptionLog(exception, response);
    }

})

router.put('/', async (request, response) => {
    try {
        return request.securityContext
            ? await editComment(request, response)
            : response.status(401).json({ error: 'unauthorized' })
        
    } catch (exception) {
        return exceptionLog(exception, response);
    }

})

module.exports = router