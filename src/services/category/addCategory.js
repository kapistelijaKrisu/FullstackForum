const { insertCategory } = require('../../model/category')
const listErrors = require('./listErrors')
const formatCategory = require('./formatCategory')

const addCategory = async (requestBody, response, dudeId) => {
    const category = formatCategory(requestBody, dudeId);
    const errors = await listErrors(category);

    return errors.length === 0
        ? response.json(await insertCategory(category))
        : response.status(400).json({ error: errors })
};

module.exports = addCategory