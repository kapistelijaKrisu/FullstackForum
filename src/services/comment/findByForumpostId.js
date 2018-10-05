const { findByforumpost_id } = require('../../model/comment')

getByforumpost_id = async (forumpost_id) => {
    return await findByforumpost_id(forumpost_id);
};

module.exports = getByforumpost_id;