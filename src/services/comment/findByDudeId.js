const { findByDudeId } = require('../model/comment')
const exceptionLog = require('../../utils/exceptionLog')


//outdated refactor to request/response and include deleted if time to improve user page
getByDudetId = async (dude_id) => {
    throw new Error('TO BE IMPLEMENTED');
    try {
        return await findByDudeId(dude_id);
    } catch (exception) {
        return exceptionLog(exception, response, 404, 'Dude not found');
    }
};

module.exports = getBydude_id;