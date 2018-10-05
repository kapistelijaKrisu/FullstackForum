const {findForumpost} = require('../../model/forumpost')
const exceptionLog = require('../../utils/exceptionLog')

getForumPostById = async (request, response) => {
    try {
        response.json(await findForumpost(request.params.forumpost_id));
    } catch (exception){
        return exceptionLog(exception, response, 404, 'Forumpost not found')
    }
};

module.exports = getForumPostById;