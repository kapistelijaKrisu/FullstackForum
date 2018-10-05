const CONSTANTS = require('../../utils/constants')
const { isInLength } = require('../../utils/validation')
const { findByforumpost_id } = require('../../model/comment')

const listErrors = async (comment) => {
    let errors = [];
    if (!isInLength(CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MIN, CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MAX, true, comment.content.trim())) {
        errors.push('Content should be ' + CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MIN + '-' + CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MAX +' character long')
    }
    if (!comment.forumpost_id) {
        errors.push('Choose the post u r commenting please')
    } else if (!await findByforumpost_id(comment.forumpost_id)) {
        errors.push('This post does not exist')
    }
    return errors;
}

module.exports = listErrors;


