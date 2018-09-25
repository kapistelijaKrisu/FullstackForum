const { insertDude } = require('../model/dude')
const { insertCategory } = require('../model/category')
const { insertForumpost } = require('../model/forumpost')
const { insertComment } = require('../model/comment')
const { getModId, getPlebId } = require('../model/role')
const bcrypt = require('bcrypt')


const addData = async () => {


    const saltRounds = 10
    const pw2 = await bcrypt.hash('pw2', saltRounds)

    const dudeVar2 = { username: 'pleb', password: pw2, roleid: getPlebId() }
    const dude2 = await insertDude(dudeVar2)

    const catVar1 = { name: 'General', description: 'Talk about any stuff!', creatorid: 1 }
    const cat1 = await insertCategory(catVar1)
    const catVar2 = { name: 'categ2', description: 'dis an another test category', creatorid: dude2.dudeid }
    const cat2 = await insertCategory(catVar2)

    const postVar1 = { title: 'dis a forum post', creatorid: dude2.dudeid, categoryid: cat1.categoryid }
    const postVar2 = { title: 'dis a forum post2', creatorid: dude2.dudeid, categoryid: cat1.categoryid }
    const post1 = await insertForumpost(postVar1)
    const post2 = await insertForumpost(postVar2)

    const comvar1= {content: 'dis is a comment', creatorid: dude2.dudeid, forumpostid: post1.forumpostid}
    const comvar2= {content: 'dis is a 2nd coment', creatorid: dude2.dudeid, forumpostid: post1.forumpostid}
    const comvar3= {content: 'dis is a 3rd comment', creatorid: dude2.dudeid, forumpostid: post2.forumpostid}
    const comvar4= {content: 'dis is a 4th coment', creatorid: dude2.dudeid, forumpostid: post2.forumpostid}
    const com1 = await insertComment(comvar1)
    const com2 = await insertComment(comvar2)
    const com3 = await insertComment(comvar3)
    const com4 = await insertComment(comvar4)
}

module.exports = {
    addData
}