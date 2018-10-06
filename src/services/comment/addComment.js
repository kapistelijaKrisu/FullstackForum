const formatComment = require('./formatComment')
const listErrors = require('./listErrors')
const {insertComment} = require('../../model/comment')

const addComment = async (request, response) => {
    let comment = await formatComment(request)
    const errors = await listErrors(comment)
    return errors.length === 0
        ? response.json(await attachCreatorName(await insertComment(comment, securityContext)))
        : response.status(400).json({ error: errors });
};

const attachCreatorName = async (comment, securityContext) => {
    comment.creatorname = securityContext.username;
    return comment;
}

module.exports = addComment