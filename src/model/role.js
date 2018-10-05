const { pool } = require('../config/dbpool')


const findByID = async (role_id) => {
    const text = 'SELECT * FROM Role WHERE role_id = $1'
    const { rows } = await pool.query(text, [role_id])
    return rows[0]
}
const findByRole = async (role) => {
    const text = 'SELECT * FROM Role WHERE role = $1'
    const { rows } = await pool.query(text, [role])
    return rows[0]
}

const insertRole = async (client, role) => {

    const text = 'INSERT INTO Role(role) VALUES($1) Returning role_id'
    const { rows } = await client.query(text, [role])
    return rows[0].role_id
}

let plebId
let modId

const getPlebId = () => {
    return plebId
}
const getModId = () => {
    return modId
}

const initRoles = async (client) => {
    const foundPleb = await findByRole('PLEB')
    if (!foundPleb) {
        plebId = await insertRole(client, 'PLEB')
    } else {
        plebId = foundPleb.role_id
    }

    const foundMod = await findByRole('MOD')
    if (!await foundMod) {
         modId = await insertRole(client, 'MOD')
    } else {
        modId = foundMod.role_id
    }
}

module.exports = {
    findByID,
    findByRole,
    initRoles,
    getModId,
    getPlebId
}