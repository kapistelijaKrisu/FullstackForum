const CONSTANTS = require('../../utils/constants')
const { isInLength } = require('../../utils/validation')
const { findByName } = require('../../model/category')

const listErrors = async (category) => {
    let errors = [];
    if (!isInLength(CONSTANTS.CATEGORY.VALIDATATION.NAME_LENGTH_MIN, CONSTANTS.CATEGORY.VALIDATATION.NAME_LENGTH_MAX, true, category.name)) {
        errors.push('name should be ' + CONSTANTS.CATEGORY.VALIDATATION.NAME_LENGTH_MIN + '-' + CONSTANTS.CATEGORY.VALIDATATION.NAME_LENGTH_MAX + 'characters long')
    }
    if (!isInLength(CONSTANTS.CATEGORY.VALIDATATION.DESCRIPTION_LENGTH_MIN, CONSTANTS.CATEGORY.VALIDATATION.DESCRIPTION_LENGTH_MAX, true, category.description)) {
        errors.push('description should be ' + CONSTANTS.CATEGORY.VALIDATATION.DESCRIPTION_LENGTH_MIN + '-' + CONSTANTS.CATEGORY.VALIDATATION.DESCRIPTION_LENGTH_MAX + 'characters long')
    }
    if (await findByName(category.name)) {
        errors.push('Category of this name already exists')
    }
    return errors;
}

module.exports = listErrors;
