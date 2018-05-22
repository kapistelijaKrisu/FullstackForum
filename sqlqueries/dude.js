const { pool } = require('../utils/dbpool')

const findByID = async (dudeid) => {
    const text = 'SELECT * FROM Dude WHERE dudeID = $1'
    const { rows } = await pool.query(text, [dudeid])
    return rows[0]
}

const findByNick = async (nickname) => {
    const text = 'SELECT * FROM Dude WHERE username = $1'
    try {
        const { rows } = await pool.query(text, [nickname])
        return rows[0]
    } catch (e) {
        console.log(e.stack)
    }
}


const insertDude = async (dude) => {
    const text = 'INSERT INTO dude(username, password, roleID) VALUES($1, $2, $3) RETURNING * ;'
    const values = [dude.username, dude.password, dude.roleID]
    try {
        const { rows } = await pool.query(text, values)
        return rows[0]
    } catch (e) {
        console.log(e.stack)
    }
}

module.exports = {
    insertDude,
    findByID,
    findByNick
}