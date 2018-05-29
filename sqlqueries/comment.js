const { pool } = require('../utils/dbpool')

const findByForumpostId = async (forumpostid) => {
    const text = 'SELECT * FROM Comment WHERE forumpostid = $1;'
    const { rows } = await pool.query(text, [forumpostid])
    return rows
}
const findByDudeId = async (dudeId) => {
    const text = 'SELECT * FROM Comment WHERE creatorID = $1;'
    const { rows } = await pool.query(text, [dudeId])
    return rows
}

const insertComment = async (comment) => {
    const text = 'INSERT INTO Comment(content, creatorid, forumpostid, posttime) VALUES($1, $2, $3, now()) RETURNING * ;'
    const values = [comment.content, comment.creatorid, comment.forumpostid]
    const { rows } = await pool.query(text, values)
    console.log(rows[0])
    return rows[0]
}

module.exports = {
    insertComment,
    findByDudeId,
    findByForumpostId
}