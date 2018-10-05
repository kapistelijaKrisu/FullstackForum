const { pool } = require('../config/dbpool')

const findAll = async () => {
    const text = 'SELECT * FROM Category ORDER BY Category.name ASC'
    const { rows } = await pool.query(text)
    return rows
}

const findByID = async (category_id) => {
    const text = 'SELECT * FROM Category WHERE category_id = $1'
    const { rows } = await pool.query(text, [category_id])
    return rows[0]
}

const findByName = async (name) => {
    const text = 'SELECT * FROM Category WHERE name = $1'
    const { rows } = await pool.query(text, [name])
    return rows[0]
}


const insertCategory = async (category) => {
    const text = 'INSERT INTO Category(name, description, creator_id) VALUES($1, $2, $3) RETURNING * ;'
    const values = [category.name, category.description, category.creator_id]
    const { rows } = await pool.query(text, values)
    return rows[0]
}

module.exports = {
    insertCategory,
    findByID,
    findByName,
    findAll
}