const CONSTANTS = require('../../utils/constants')
const { isInLength } = require('../../utils/validation')
const { findForumpost } = require('../../model/forumpost')

const listErrors = async (comment) => {
    console.log(comment)
    let errors = [];
    await checkValues(errors, comment);
    !comment.forumpost_id ?
    errors.push('Choose the post u r commenting please') :
    await checkForumpost(errors, comment);
    return errors;
}

const checkValues = (errors, comment) => {
    if (!isInLength(CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MIN, CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MAX, true, comment.content.trim())) {
        errors.push('Content should be ' + CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MIN + '-' + CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MAX +' character long')
    }
}

const checkForumpost = async (errors, comment) => {
    const owningForumpost = await findForumpost(comment.forumpost_id)
    if (!owningForumpost) {
        errors.push('This post does not exist')
    } else if (!!owningForumpost.disabled) {
        errors.push('This post is locked!')
    }
}

module.exports = listErrors;


