const { pool } = require('./dbpool')
const { insertDude } = require('../sqlqueries/dude')
const { insertCategory } = require('../sqlqueries/category')
const { insertForumpost } = require('../sqlqueries/forumpost')
const { insertComment } = require('../sqlqueries/comment')
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

    const catVar1 = { name: 'categ1', description: 'dis a test category', creatorid: dude2.dudeid }
    const cat1 = await insertCategory(catVar1)

    const postVar1 = { title: 'dis a forum post', content: 'dis is le content', creatorid: dude2.dudeid, categoryid: cat1.categoryid }
    const post1 = await insertForumpost(postVar1)

    const comvar1= {content: 'dis my coment', creatorid: dude1.dudeid, forumpostid: post1.forumpostid}
    const com1 = await insertComment(comvar1)
}

module.exports = {
    addData
}