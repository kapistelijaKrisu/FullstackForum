const formatComment = require('./formatComment')
const listErrors = require('./listErrors')
const {insertComment} = require('../../model/comment')

const addComment = async (request, response) => {
    let comment = await formatComment(request)
    const errors = await listErrors(comment)
    return errors.length === 0
        ? response.json(await insertComment(comment))
        : response.status(400).json({ error: errors })
};

module.exports = addComment