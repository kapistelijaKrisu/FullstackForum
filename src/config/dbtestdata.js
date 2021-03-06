const { insertDude } = require('../model/dude')
const { insertCategory } = require('../model/category')
const { insertForumpost } = require('../model/forumpost')
const { insertComment } = require('../model/comment')
const { getModId, getPlebId } = require('../model/role')
const bcrypt = require('bcrypt')


const addData = async () => {


    const saltRounds = 10
    const pw2 = await bcrypt.hash('pw2', saltRounds)

    const dudeVar2 = { username: 'pleb', password: pw2, role_id: getPlebId() }
    const dude2 = await insertDude(dudeVar2)

    const catVar1 = { name: 'General', description: 'Talk about any stuff!', creator_id: 1 }
    const cat1 = await insertCategory(catVar1)
    const catVar2 = { name: 'categ2', description: 'dis an another test category', creator_id: dude2.dude_id }
    const cat2 = await insertCategory(catVar2)

    for (let i = 0; i < 20; i++) {
        const postVar1 = { title: 'dis a forum post' + i, creator_id: dude2.dude_id, category_id: cat1.category_id }
        const postVar2 = { title: 'dis a forum post another' + i, creator_id: dude2.dude_id, category_id: cat1.category_id }
        //const post1 = await insertForumpost(postVar1)
        const post2 = await insertForumpost(postVar2)

      //  const comvar1 = { content: 'dis is a comment' + i, creator_id: dude2.dude_id, forumpost_id: post1.forumpost_id }
      //  const comvar2 = { content: 'dis is a 2nd coment ' + i, creator_id: dude2.dude_id, forumpost_id: post1.forumpost_id }
      const comvar3 = { content: 'dis is a 3rd comment' + i, creator_id: dude2.dude_id, forumpost_id: post2.forumpost_id }
      const comvar4 = { content: 'dis is a 4th coment' + i, creator_id: dude2.dude_id, forumpost_id: post2.forumpost_id }
      const comvar5 = { content: 'dis is a 5rd comment' + i, creator_id: dude2.dude_id, forumpost_id: post2.forumpost_id }
        const comvar6 = { content: 'dis is a 6th coment' + i, creator_id: dude2.dude_id, forumpost_id: post2.forumpost_id }
        const comvar7 = { content: 'dis is a 7rd comment' + i, creator_id: dude2.dude_id, forumpost_id: post2.forumpost_id }
        const comvar8 = { content: 'dis is a 8th coment' + i, creator_id: dude2.dude_id, forumpost_id: post2.forumpost_id }
        const comvar9 = { content: 'dis is a 9rd comment' + i, creator_id: dude2.dude_id, forumpost_id: post2.forumpost_id }
        const comvar0 = { content: 'dis is a 0th coment' + i, creator_id: dude2.dude_id, forumpost_id: post2.forumpost_id }
      //  const com1 = await insertComment(comvar1)
      //  const com2 = await insertComment(comvar2)
        const com3 = await insertComment(comvar3)
        const com4 = await insertComment(comvar4)
        await insertComment(comvar5)
        //await insertComment(comvar6)
        //await insertComment(comvar7)
    }
}

module.exports = {
    addData
}