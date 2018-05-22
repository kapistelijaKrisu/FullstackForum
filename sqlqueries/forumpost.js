const { pool } = require('../utils/dbpool')

const findByCategoryId = async (categoryid) => {
    const text = 'SELECT * FROM Forumpost WHERE categoryid = $1;'
    const { rows } = await pool.query(text, [categoryid])
    return rows
}
const findByDudeId = async (dudeId) => {
    const text = 'SELECT * FROM Forumpost WHERE creatorID = $1;'
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
    insertForumpost,
    findByDudeId,
    findByCategoryId
}