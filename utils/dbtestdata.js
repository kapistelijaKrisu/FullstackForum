const { pool } = require('./dbpool')
const { insertDude } = require('../sqlqueries/dude')
const { getModId, getPlebId } = require('../sqlqueries/role')
const bcrypt = require('bcrypt')


const addData = async () => {


    const saltRounds = 10
    const pw1 = await bcrypt.hash('pw1', saltRounds)
    const pw2 = await bcrypt.hash('pw2', saltRounds)

    const dudeVar1 = { username: 'dude1', password: pw1, roleID: getModId() }
    const dude1 = await insertDude(dudeVar1)
    const dudeVar2 = { username: 'dude2', password: pw2, roleID: getPlebId() }
    const dude2 = await insertDude(dudeVar2)
    console.log(dude1)
}

module.exports = {
    addData
}