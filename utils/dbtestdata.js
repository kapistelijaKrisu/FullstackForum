const { pool } = require('./dbpool')
const { insertRole } = require('../sqlqueries/role')
const { insertDude } = require('../sqlqueries/dude')

const addData = async () => {
    const plebId = await insertRole('PLEB')
    const modId = await insertRole('MOD')
    const dude1 = await insertDude('dude1', 'pw1', plebId)
    const dude2 = await insertDude('dude2', 'pw2', modId)
    console.log(dude1)
}

module.exports = {
    addData
}