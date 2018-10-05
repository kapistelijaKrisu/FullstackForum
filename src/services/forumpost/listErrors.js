const CONSTANTS = require('../../utils/constants')
const { isInLength } = require('../../utils/validation')
const { findByID } = require('../../model/category')

const listErrors = async (forumpost) => {
    let errors = [];

    if (!forumpost.category_id) {
        errors.push('Choose a category for this post please');
    } else if (!await findByID(forumpost.category_id)) {
        errors.push('This category does not exist');
    }
    if (!isInLength(CONSTANTS.FORUMPOST.VALIDATATION.TITLE_LENGTH_MIN, CONSTANTS.FORUMPOST.VALIDATATION.TITLE_LENGTH_MAX, true, forumpost.title)) {
        errors.push('Title should ' + CONSTANTS.FORUMPOST.VALIDATATION.TITLE_LENGTH_MIN + '-' + CONSTANTS.FORUMPOST.VALIDATATION.TITLE_LENGTH_MAX + ' characters long');
    }
    if (!isInLength(CONSTANTS.FORUMPOST.VALIDATATION.CONTENT_LENGTH_MIN, CONSTANTS.FORUMPOST.VALIDATATION.CONTENT_LENGTH_MAX, true, forumpost.content)) {
        errors.push('Content should be ' + CONSTANTS.FORUMPOST.VALIDATATION.CONTENT_LENGTH_MIN + '-' + CONSTANTS.FORUMPOST.VALIDATATION.CONTENT_LENGTH_MAX + ' characters long');
    }
    return errors;
}

module.exports = listErrors;


