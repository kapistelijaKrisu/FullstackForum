const { pool } = require('../config/dbpool')

const findAll = async () => {
    const text = ` SELECT
        c.category_id, c.name,
        c.description, c.creator_id,
        d.username as creator_name,
        coalesce(fcount, 0) as forumpost_count
    FROM Category c
    LEFT JOIN
        (SELECT f.category_id, count(1) fcount
        FROM Forumpost f
        GROUP BY f.category_id) as sd
    ON sd.category_id = c.category_id
    LEFT JOIN Dude d
    ON c.creator_id = d.dude_id
    ORDER BY c.name`
    const { rows } = await pool.query(text)
    return rows
}

const findByName = async (name) => {
    const text = `SELECT
        c.category_id,
        c.name
        c.description,
        c.creator_id,
        d.username as creator_name,
        coalesce(fcount, 0) as forumpost_count
    FROM Category c
    LEFT JOIN
        (SELECT f.category_id, count(1) fcount
        FROM Forumpost f
        GROUP BY f.category_id) as sd
    ON sd.category_id=c.category_id  WHERE c.name = $1
    LEFT JOIN Dude d
    ON c.creator_id = d.dude_id
    ORDER BY c.name`
    const { rows } = await pool.query(text, [name])
    return rows[0]
}

const findById = async (name) => {
    const text = `SELECT
        c.category_id,
        c.name
        c.description,
        c.creator_id,
        d.username as creator_name,
        coalesce(fcount, 0) as forumpost_count
    FROM Category c
    LEFT JOIN
        (SELECT f.category_id, count(1) forumpost_count
        FROM Forumpost f
        GROUP BY f.category_id) as sd
    ON sd.category_id=c.category_id  WHERE c.category_id = $1
    LEFT JOIN Dude d
    ON c.creator_id = d.dude_id
    ORDER BY c.name`
    const { rows } = await pool.query(text, [name])
    return rows[0]
}

const insertCategory = async (category) => {
    const text = 'INSERT INTO Category(name, description, creator_id) VALUES($1, $2, $3) RETURNING * ;'
    const values = [category.name, category.description, category.creator_id]
    const { rows } = await pool.query(text, values)
    rows[0].forumpost_count = 0;
    return rows[0]
}

module.exports = {
    insertCategory,
    findById,
    findByName,
    findAll
}