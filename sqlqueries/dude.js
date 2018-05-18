const { pool } = require('../utils/dbpool')


const findByID = async (dudeid) => {
    const text = 'SELECT * FROM Role WHERE dudeID = $1'
    const { rows } = await pool.query(text, [dudeid])
    return rows[0]
}

const findByNick = async (nickname) => {
    const text = 'SELECT * FROM Dude WHERE nickname = $1'
    const { rows } = await pool.query(text, [nickname])
    return rows[0]
}
const initDude = async () => {
const text = 'CREATE TABLE Dude ('
    + 'dudeID SERIAL NOT NULL PRIMARY KEY, '
    + 'nickname varchar(31) NOT NULL UNIQUE, '
    + 'password varchar(127) NOT NULL, '
    + 'roleID int, '
    + 'FOREIGN KEY (roleID) REFERENCES Role(roleID)'
    + '); '
    await pool.query(text)
}

const insertDude = async (nickname, password, roleID) => {
    console.log('enter')
        const text = 'INSERT INTO dude(nickname, password, roleID) VALUES($1, $2, $3) RETURNING * ;'
        const values = [nickname, password, roleID]
    
    try {
        const {rows} = await pool.query(text, values)
        console.log(rows)
    } catch (e) {
        console.log(e.stack)
    }
}

module.exports = {
    initDude,
    insertDude,
    findByID,
    findByNick
}