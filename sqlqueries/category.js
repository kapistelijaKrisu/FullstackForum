const { pool } = require('../utils/dbpool')

const findAll = async () => {
    const text = 'SELECT * FROM Category ORDER BY Category.name ASC'
    const { rows } = await pool.query(text)
    return rows
}

const findByID = async (categoryID) => {
    const text = 'SELECT * FROM Category WHERE categoryID = $1'
    const { rows } = await pool.query(text, [categoryID])
    return rows[0]
}

const findByName = async (name) => {
    const text = 'SELECT * FROM Category WHERE name = $1'
    const { rows } = await pool.query(text, [name])
    return rows[0]
}


const insertCategory = async (category) => {
    const text = 'INSERT INTO Category(name, description, creatorid) VALUES($1, $2, $3) RETURNING * ;'
    const values = [category.name, category.description, category.creatorid]
    const { rows } = await pool.query(text, values)
    return rows[0]
}

module.exports = {
    insertCategory,
    findByID,
    findByName,
    findAll
}