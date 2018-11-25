const { findByDudeId } = require('../../model/forumpost')
const exceptionLog = require('../../utils/exceptionLog')

getForumpostsByDudeId = async (request, response) => {
    try {
        response.json(await findByDudeId(request.params.dude_id, request.query.limit, request.query.offset));
    } catch (exception) {
        return exceptionLog(exception, response, 404, 'Dude not found');
    }
}

module.exports = getForumpostsByDudeId;