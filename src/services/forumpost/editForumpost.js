const listErrors = require('./listErrors')
const { editForumpost, findPureForumpost } = require('../../model/forumpost')

//nullify data depending on user right
const edit = async (request, response) => {
    const requestEditForumpost = request.body;
    const currentForumpost = await findPureForumpost(requestEditForumpost.forumpost_id)
    console.log('ent: ', currentForumpost)
    setEditableValuesByRoles(currentForumpost, requestEditForumpost, request.securityContext)
    console.log('af:', currentForumpost)
    
    const errors = await listErrors(currentForumpost);
    if (errors.length === 0) {
        return response.json(await editForumpost(currentForumpost))
    }
    return response.status(400).json({ error: errors });
}

const setEditableValuesByRoles = async (currentPost, requestEditForumpost, securityContext) => {
    if (!!securityContext.hasModRigths) {
        setEditableValuesByMod(currentPost, requestEditForumpost)
    }
    if (!!securityContext.dude_id === currentPost.creator_id) {
        setEditableValuesByCreator(currentPost, requestEditForumpost)
    }
}

const setEditableValuesByMod = async (currentPost, requestEditForumpost) => {
    if (requestEditForumpost.category_id) {
        currentPost.category_id = requestEditForumpost.category_id;
    }
    if (requestEditForumpost.disabled) {
        currentPost.disabled = requestEditForumpost.disabled;
    }
}

const setEditableValuesByCreator = async (currentPost, requestEditForumpost) => {
    if (requestEditForumpost.title) {
        currentPost.title = requestEditForumpost.title;
    }
}

module.exports = edit;