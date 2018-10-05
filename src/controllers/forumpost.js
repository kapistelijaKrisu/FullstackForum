const router = require('express').Router()
const exceptionLog = require('../utils/exceptionLog')
const getForumPostById = require('../services/forumpost/getForumPostById')
const getForumpostsByCategoryId = require('../services/forumpost/getForumpostsByCategoryId')
const getForumpostsByDudeId = require('../services/forumpost/getForumpostsByDudeId')
const addForumPostWithInitialComment = require('../services/forumpost/addForumPostWithInitialComment')

router.get('/:forumpost_id', async (request, response) => {
    try {
        return await getForumPostById(request, response)
    } catch (exception) {
        exceptionLog(exception, response)
    }
})

router.get('/category/:category_id', async (request, response) => {
    try {
        return await getForumpostsByCategoryId(request, response);
    } catch (exception) {
        exceptionLog(exception, response);
    }
})
router.get('/dude/:dude_id', async (request, response) => {
    try {
        return await getForumpostsByDudeId(request, response)
    } catch (exception) {
        exceptionLog(exception, response)
    }
})

router.post('/', async (request, response) => {
    try {
        if (!request.securityContext) {
            return response.status(401).json({ error: 'login please before posting' });
        }
        return await addForumPostWithInitialComment(request, response);
    } catch (exception) {
        exceptionLog(exception, response)
    }
})
module.exports = router