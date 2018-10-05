const dudequeries = require('../../model/dude')
const CONSTANTS = require('../../utils/constants')
const { isInLength } = require('../../utils/validation')

const listErrors = async (body) => {
    const errors = [];
    if (!isInLength(CONSTANTS.DUDE.VALIDATATION.PASSWORD_LENGTH_MIN, CONSTANTS.DUDE.VALIDATATION.PASSWORD_LENGTH_MAX, false, body.password)) {
        errors.push('Password has to be ' + CONSTANTS.DUDE.VALIDATATION.PASSWORD_LENGTH_MIN + '-' + CONSTANTS.DUDE.VALIDATATION.PASSWORD_LENGTH_MAX + ' characters long!');
    }
    if (!isInLength(3, 31, false, body.username)) {
        errors.push('Username has to be ' + CONSTANTS.DUDE.VALIDATATION.USERNAME_LENGTH_MIN + '-' + CONSTANTS.DUDE.VALIDATATION.USERNAME_LENGTH_MAX + ' characters long!');
    }

    const dude = await dudequeries.findByNick(body.username)
    if (dude) {
        console.log(dude)
        errors.push('Username must be unique');
    }
    return errors;
}

module.exports = listErrors;