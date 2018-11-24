const { findByCategoryId } = require('../../model/forumpost')
const exceptionLog = require('../../utils/exceptionLog')

getForumpostsByCategoryId = async (request, response) => {
    try {
        response.json(await findByCategoryId(request.params.category_id, request.query.limit, request.query.offset));
    } catch (exception) {
        return exceptionLog(exception, response, 404, 'Category not found')
    }
}

module.exports = getForumpostsByCategoryId;