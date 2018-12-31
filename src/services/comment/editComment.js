const listErrors = require('./listErrors')
const { findByCommentId, editComment } = require('../../model/comment')

const edit = async (request, response) => {
    const requestEditComment = request.body;
    if (requestEditComment === undefined) {
        return response.status(400).json({ error: ['No body found'] });
    }
    const currentComment = await findByCommentId(requestEditComment.comment_id)
    const editingContent = setEditableValuesByRoles(currentComment, requestEditComment, request.securityContext)
    const errors = await listErrors(currentComment, editingContent);
    if (errors.length === 0) {
        return response.json(await (editComment(currentComment)));
    }

    return response.status(400).json({ error: errors });
};


const setEditableValuesByRoles = (currentComment, requestEditComment, securityContext) => {
    let editingContent = false;
    if (!!securityContext.hasModRigths) {
        setEditableValuesByMod(currentComment, requestEditComment)
    }
    if (securityContext.dude_id === currentComment.creator_id) {
        editingContent = setEditableValuesByCreator(currentComment, requestEditComment)
    }
    return editingContent;
}

const setEditableValuesByMod = (currentComment, requestEditComment) => {
    if (requestEditComment.deleted !== undefined) {
        currentComment.deleted = requestEditComment.deleted;
    }
}

const setEditableValuesByCreator = (currentComment, requestEditComment) => {
    let editingContent = false;
    if (requestEditComment.content !== undefined) {
        editingContent = true;
        if (currentComment.deleted !== true) {
            currentComment.content = requestEditComment.content.trim();
        }
    }
    return editingContent;
}

module.exports = edit;