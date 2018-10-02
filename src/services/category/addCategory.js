const { insertCategory } = require('../../model/category')
const listErrors = require('./listErrors')
const formatCategory = require('./formatCategory')

const addCategory = async (requestBody, response, dudeId) => {
    const category = formatCategory(requestBody, dudeId);
    const errors = await listErrors(category);

    return errors.length === 0
        ? await insertCategory(category)
        : { error: errors }
};

module.exports = addCategory