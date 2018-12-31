const listErrors = require('./listErrors')
const { editForumpost, findPureForumpost } = require('../../model/forumpost')

//nullify data depending on user right
const edit = async (request, response) => {
    const requestEditForumpost = request.body;
    if (requestEditForumpost === undefined) {
        return response.status(400).json({ error: ['No body found'] });
    }
    const isNewPost = false;
    const currentForumpost = await findPureForumpost(requestEditForumpost.forumpost_id)
    setEditableValuesByRoles(currentForumpost, requestEditForumpost, request.securityContext)
    const errors = await listErrors(currentForumpost, isNewPost);
    if (errors.length === 0) {
        await editForumpost(currentForumpost);
        return response.json(currentForumpost);
    }
    return response.status(400).json({ error: errors });
}

const setEditableValuesByRoles = (currentPost, requestEditForumpost, securityContext) => {
    if (!!securityContext.hasModRigths) {
        setEditableValuesByMod(currentPost, requestEditForumpost)
    }
    if (securityContext.dude_id === currentPost.creator_id) {
        setEditableValuesByCreator(currentPost, requestEditForumpost)
    }
}

const setEditableValuesByMod = (currentPost, requestEditForumpost) => {
    if (requestEditForumpost.category_id !== undefined) {
        currentPost.category_id = requestEditForumpost.category_id;
    }
    if (requestEditForumpost.disabled !== undefined) {
        currentPost.disabled = requestEditForumpost.disabled;
    }
}

const setEditableValuesByCreator = (currentPost, requestEditForumpost) => {
    if (requestEditForumpost.title) {
        currentPost.title = requestEditForumpost.title;
    }
}

module.exports = edit;