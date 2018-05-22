const { pool } = require('./dbpool')
const { insertDude } = require('../sqlqueries/dude')
const { insertCategory } = require('../sqlqueries/category')
const { getModId, getPlebId } = require('../sqlqueries/role')
const bcrypt = require('bcrypt')


const addData = async () => {


    const saltRounds = 10
    const pw1 = await bcrypt.hash('pw1', saltRounds)
    const pw2 = await bcrypt.hash('pw2', saltRounds)

    const dudeVar1 = { username: 'mod', password: pw1, roleID: getModId() }
    const dude1 = await insertDude(dudeVar1)
    const dudeVar2 = { username: 'pleb', password: pw2, roleID: getPlebId() }
    const dude2 = await insertDude(dudeVar2)

    const catVar1 = {name:'categ1', description:'dis a test category', creatorid:dude2.dudeid}
    const cat1 = await insertCategory(catVar1)

}

module.exports = {
    addData
}