const { insertCategory } = require('../../model/category')
const listErrors = require('./listErrors')
const formatCategory = require('./formatCategory')

const addCategory = async (request, response) => {
    const category = formatCategory(request.body, request.securityContext.dude_id);
    const errors = await listErrors(category);
    return errors.length === 0
        ? response.json(await insertCategory(category))
        : response.status(400).json({ error: errors })
};

module.exports = addCategory