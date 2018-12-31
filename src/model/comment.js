const { pool } = require('../config/dbpool')

const findByforumpost_id = async (forumpost_id, includeDeleted) => {
    let text = 'SELECT * FROM Comment WHERE forumpost_id = $1'
    if (!includeDeleted) {
        text = text + ' AND deleted != TRUE'
    }
    const { rows } = await pool.query(text, [forumpost_id])
    return rows
}
const findByDudeId = async (dude_id, includeDeleted) => {
    let text = 'SELECT * FROM Comment WHERE creator_id = $1;'
    if (!includeDeleted) {
        text = text + ' AND deleted != TRUE'
    }
    const { rows } = await pool.query(text, [dude_id])
    return rows
}

const findByCommentId = async (comment_id) => {
    let text = 'SELECT * FROM Comment WHERE comment_id = $1;'
    const { rows } = await pool.query(text, [comment_id])
    return rows[0]
}

const insertComment = async (comment) => {
    const text = 'INSERT INTO Comment(content, creator_id, forumpost_id, posttime) VALUES($1, $2, $3, now()) RETURNING * ;'
    const values = [comment.content, comment.creator_id, comment.forumpost_id]
    const { rows } = await pool.query(text, values)
    return rows[0]
}

const editComment = async (comment) => {
    const text = 'UPDATE Comment SET'
    + ' content = $2, deleted = $3, edited = now()'
    + ' WHERE comment_id = $1 RETURNING * ;';
    const values = [comment.comment_id, comment.content, comment.deleted]
    const { rows } = await pool.query(text, values)
    return rows[0]
}

module.exports = {
    insertComment,
    findByCommentId,
    editComment,
    findByDudeId,
    findByforumpost_id
}