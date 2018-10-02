const { findAll } = require('.././../model/category')

const findAllCategories = async () => {
    return await findAll();
};

module.exports = findAllCategories;