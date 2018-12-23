const { pool } = require('../config/dbpool')

const findByID = async (dude_id) => {
    const text = 'SELECT * FROM Dude WHERE dude_id = $1'
    const { rows } = await pool.query(text, [dude_id])
    return rows[0]
}

const findByNick = async (nickname) => {
    const text = 'SELECT * FROM Dude WHERE username = $1'
    const { rows } = await pool.query(text, [nickname])
    return rows[0]
}


const insertDude = async (dude) => {
    const text = 'INSERT INTO dude(username, password, role_id) VALUES($1, $2, $3) RETURNING * ;'
    const values = [dude.username, dude.password, dude.role_id]
    const { rows } = await pool.query(text, values)
    return rows[0]
}

module.exports = {
    insertDude,
    findByID,
    findByNick
}