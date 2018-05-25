const { pool } = require('../utils/dbpool')

const findByID = async (forumpostid) => {
    const text = 'SELECT * FROM Forumpost WHERE forumpostid = $1;'
    const { rows } = await pool.query(text, [forumpostid])
    return rows[0]
}

const findByCategoryId = async (categoryid) => {
    const text = 'SELECT * FROM Forumpost WHERE categoryid = $1;'
    const { rows } = await pool.query(text, [categoryid])
    return rows
}
const findByDudeId = async (dudeId) => {
    const text = 'SELECT * FROM Forumpost WHERE creatorid = $1;'
    const { rows } = await pool.query(text, [dudeId])
    return rows
}

const insertForumpost = async (forumpost) => {
    const text = 'INSERT INTO Forumpost(title, content, creatorid, categoryid) VALUES($1, $2, $3, $4) RETURNING * ;'
    const values = [forumpost.title, forumpost.content, forumpost.creatorid, forumpost.categoryid]
    const { rows } = await pool.query(text, values)
    return rows[0]
}

module.exports = {
    findByID,
    insertForumpost,
    findByDudeId,
    findByCategoryId
}