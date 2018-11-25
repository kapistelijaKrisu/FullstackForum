const {getForumpostCountByCategory, getForumpostCountByDude} = require('../../model/forumpost')
const exceptionLog = require('../../utils/exceptionLog')

//refine here in case secret posts will be done
getForumPostCount = async (request, response) => {
    try {
        if (request.params.byParent === 'category') {
            response.json(await getForumpostCountByCategory(request.params.parent_id));
        } else if (request.params.parentType === 'creator') {
            response.json(await getForumpostCountByDude(request.params.parent_id));

        }
    } catch (exception){
        return exceptionLog(exception, response, 404, 'Forumpost not found')
    }
};

module.exports = getForumPostCount;