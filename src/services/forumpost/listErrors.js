const CONSTANTS = require('../../utils/constants')
const { isInLength } = require('../../utils/validation')
const { findById } = require('../../model/category')

const listErrors = async (forumpost, isNewPost) => {
    let errors = [];
    if (!forumpost.category_id) {
        errors.push('Choose a category for this post please');
    } else if (!await findById(forumpost.category_id)) {
        errors.push('This category does not exist');
    }
    if (!forumpost.title) {
        errors.push('Title is missing');
    } else if (!isInLength(CONSTANTS.FORUMPOST.VALIDATATION.TITLE_LENGTH_MIN, CONSTANTS.FORUMPOST.VALIDATATION.TITLE_LENGTH_MAX, true, forumpost.title)) {
        errors.push('Title should ' + CONSTANTS.FORUMPOST.VALIDATATION.TITLE_LENGTH_MIN + '-' + CONSTANTS.FORUMPOST.VALIDATATION.TITLE_LENGTH_MAX + ' characters long');
    }
    if (isNewPost &&!isInLength(CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MIN, CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MAX, true, forumpost.content.trim())) {
        errors.push('Content should be ' + CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MIN + '-' + CONSTANTS.COMMENT.VALIDATATION.CONTENT_LENGTH_MAX +' character long')
    }
    return errors;
}

module.exports = listErrors;


