const { pool } = require('../config/dbpool')


const findByID = async (roleid) => {
    const text = 'SELECT * FROM Role WHERE roleid = $1'
    const { rows } = await pool.query(text, [roleid])
    return rows[0]
}
const findByRole = async (role) => {
    const text = 'SELECT * FROM Role WHERE role = $1'
    const { rows } = await pool.query(text, [role])
    return rows[0]
}

const insertRole = async (client, role) => {

    const text = 'INSERT INTO Role(role) VALUES($1) Returning roleId'
    const { rows } = await client.query(text, [role])
    return rows[0].roleid
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
        plebId = foundPleb.roleid
    }

    const foundMod = await findByRole('MOD')
    if (!await foundMod) {
         modId = await insertRole(client, 'MOD')
    } else {
        modId = foundMod.roleid
    }
}

module.exports = {
    findByID,
    findByRole,
    initRoles,
    getModId,
    getPlebId
}