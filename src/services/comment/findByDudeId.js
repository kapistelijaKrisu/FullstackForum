const { findByDudeId } = require('../model/comment')
const exceptionLog = require('../../utils/exceptionLog')

getByDudetId = async (dude_id) => {
    try {
        return await findByDudeId(dude_id);
    } catch (exception) {
        return exceptionLog(exception, response, 404, 'Dude not found');
    }
};

module.exports = getBydude_id;