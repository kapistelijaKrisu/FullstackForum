const { pool } = require('../config/dbpool')

const findByforumpost_id = async (forumpost_id) => {
    const text = 'SELECT * FROM Comment WHERE forumpost_id = $1;'
    const { rows } = await pool.query(text, [forumpost_id])
    return rows
}
const findByDudeId = async (dude_id) => {
    const text = 'SELECT * FROM Comment WHERE creator_id = $1;'
    const { rows } = await pool.query(text, [dude_id])
    return rows
}

const insertComment = async (comment) => {
    const text = 'INSERT INTO Comment(content, creator_id, forumpost_id, posttime) VALUES($1, $2, $3, now()) RETURNING * ;'
    const values = [comment.content, comment.creator_id, comment.forumpost_id]
    const { rows } = await pool.query(text, values)
    return rows[0]
}

module.exports = {
    insertComment,
    findByDudeId,
    findByforumpost_id
}