const { pool } = require('../utils/dbpool')


const findByID = async (roleid) => {
    const text = 'SELECT * FROM Role WHERE roleID = $1'
    const { rows } = await pool.query(text, [roleid])
    return rows[0]
}
const findByRole = async (role) => {
    const text = 'SELECT * FROM Role WHERE role = $1'
    const { rows } = await pool.query(text, [role])
    return rows[0]
}

const initRole = async () => {
    const text = 'CREATE TABLE Role ('
        + 'roleID SERIAL PRIMARY KEY, '
        + 'role varchar(31) NOT NULL UNIQUE '
        + '); '
    await pool.query(text)
}

const insertRole = async (role) => {

    const text = 'INSERT INTO Role(role) VALUES($1) Returning roleId'
    const { rows } = await pool.query(text, [role])
    return rows[0].roleid
}

module.exports = {
    findByID,
    findByRole,
    initRole,
    insertRole
}