const { findByforumpost_id } = require('../../model/comment')
const exceptionLog = require('../../utils/exceptionLog')

getByforumpost_id = async (request, response) => {
    try {
        const isUserMod = request.securityContext.hasModRigths;
        return await findByforumpost_id(request.params.forumpost_id, isMod);
    } catch (exception) {
        return exceptionLog(exception, response, 404, 'Forumposts not found');
    }
};

module.exports = getByforumpost_id;