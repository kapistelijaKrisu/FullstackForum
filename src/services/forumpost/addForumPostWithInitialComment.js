const formatComment = require('../comment/formatComment')
const formatForumpost = require('./formatForumpost')
const listErrors = require('./listErrors')
const { insertComment } = require('../../model/comment')
const { insertForumpost } = require('../../model/forumpost')

const addForumPostWithInitialComment = async (request, response) => {
    const forumpost = formatForumpost(request);
    const errors = await listErrors(forumpost);
    if (errors.length === 0) {
        console.log('wut1')
        const savedForumpost = await insertForumpost(forumpost)
        console.log('wut2')
        request.body.forumpost_id = savedForumpost.forumpost_id;
        const comment = formatComment(request);
        console.log('wut3')
        await insertComment(comment)
console.log('wut4')
        return response.json(savedForumpost)
    }
    console.log(errors)
    return response.status(400).json({ error: errors });
}

module.exports = addForumPostWithInitialComment;