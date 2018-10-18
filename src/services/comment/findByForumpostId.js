const { findByforumpost_id } = require('../../model/comment')
const exceptionLog = require('../../utils/exceptionLog')

getByforumpost_id = async (forumpost_id) => {
    try {
        return await findByforumpost_id(forumpost_id);
    } catch (exception) {
        return exceptionLog(exception, response, 404, 'Forumposts not found');
    }
};

module.exports = getByforumpost_id;