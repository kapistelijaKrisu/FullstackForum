const { pool } = require('./dbpool')
const { insertDude } = require('../sqlqueries/dude')
const { getModId, getPlebId } = require('../sqlqueries/role')
const bcrypt = require('bcrypt')


const addData = async () => {
    
    const saltRounds = 10
    const pw1 = await bcrypt.hash('pw1', saltRounds)
    const dude1 = await insertDude('dude1', pw1, getModId())
    const pw2 = await bcrypt.hash('pw2', saltRounds)
    const dude2 = await insertDude('dude2', pw2, getPlebId())
    console.log(dude1)
}

module.exports = {
    addData
}