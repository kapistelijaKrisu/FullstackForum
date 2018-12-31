const listErrors = require('./listErrors')
const {findByCommentId, editComment} = require('../../model/comment')

const edit = async (request, response) => {
    const requestEditComment = request.body;
    if (requestEditComment === undefined) {
        return response.status(400).json({ error: ['No body found'] });
    }
    const currentComment = await findByCommentId(requestEditComment.comment_id)
    if (currentComment.deleted !== true) {
    setEditableValuesByRoles(currentComment, requestEditComment, request.securityContext)
    const errors = await listErrors(currentComment);
    if (errors.length === 0) {
        return response.json(await (editComment(currentComment)));
    }
} else {
    return response.status(400).json({ error: ['This is deleted'] });
}
    return response.status(400).json({ error: errors });
};


const setEditableValuesByRoles = (currentPost, requestEditForumpost, securityContext) => {
    if (!!securityContext.hasModRigths) {
        setEditableValuesByMod(currentPost, requestEditForumpost)
    }
    if (securityContext.dude_id === currentPost.creator_id) {
        setEditableValuesByCreator(currentPost, requestEditForumpost)
    }
}

const setEditableValuesByMod = (currentPost, requestEditForumpost) => {
    if (requestEditForumpost.deleted !== undefined) {
        currentPost.deleted = requestEditForumpost.deleted;
    }
}

const setEditableValuesByCreator = (currentPost, requestEditForumpost) => {
    if (requestEditForumpost.content) {
        currentPost.content = requestEditForumpost.content.trim();
    }
}


module.exports = edit;