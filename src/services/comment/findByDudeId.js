const { findByDudeId } = require('../model/comment')

getByDudetId = async (dude_id) => {
    return await findByDudeId(dude_id);
};

module.exports = getBydude_id;