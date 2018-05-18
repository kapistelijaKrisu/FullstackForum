const { pool } = require('../utils/dbpool')


const findByID = async (dudeid) => {
    const text = 'SELECT * FROM Role WHERE dudeID = $1'
    const { rows } = await pool.query(text, [dudeid])
    return rows[0]
}

const findByNick = async (nickname) => {
    const text = 'SELECT * FROM Dude WHERE nickname = $1'
    try {
        const { rows } = await pool.query(text, [nickname])
        return rows[0]
    } catch (e) {
        console.log(e.stack)
    }
}


const insertDude = async (nickname, password, roleID) => {
    const text = 'INSERT INTO dude(nickname, password, roleID) VALUES($1, $2, $3) RETURNING * ;'
    const values = [nickname, password, roleID]
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