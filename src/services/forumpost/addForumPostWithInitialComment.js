const formatComment = require('../comment/formatComment')
const formatForumpost = require('./formatForumpost')
const listErrors = require('./listErrors')
const listErrorsOfComment = require('../comment/listErrors')
const { insertComment } = require('../../model/comment')
const { insertForumpost } = require('../../model/forumpost')

const addForumPostWithInitialComment = async (request, response) => {
    const forumpost = formatForumpost(request);
    const errors = await listErrors(forumpost);
    errors.push(await listErrorsOfComment(listErrorsOfComment))
    if (errors.length === 0) {
        const savedForumpost = await insertForumpost(forumpost)
        savedForumpost.creatorname = request.securityContext.username;
        request.body.forumpost_id = savedForumpost.forumpost_id;
        const comment = formatComment(request);
        await insertComment(comment)
        return response.json(savedForumpost)
    }
    return response.status(400).json({ error: errors });
}

module.exports = addForumPostWithInitialComment;