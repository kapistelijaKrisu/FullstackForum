const { mod } = require('./api_config')
const { pool } = require('./dbpool')
const { addData } = require('./dbtestdata')
const { getModId, initRoles } = require('../model/role')
const { findByNick, insertDude, findByID } = require('../model/dude')
const bcrypt = require('bcrypt')


const db_creation = async () => {
    //change here once for setting up production 
    const client = await pool.connect()
    try {
        if (process.env.NODE_ENV !== 'production') {
            await dropDBtables(client)

            console.log('Setting up database tables...')
            await initRoleTable(client)
            await initRoles(client)//in test this is needed earlier
            await initDudeTable(client)
            await initCategoryTable(client)
            await initForumPostTable(client)
            await initCommentTable(client)

            console.log('Database tables are up')
            console.log('adding test data..')
            await initMod(mod)
            await addData()
            console.log('Test data has been added')
        } else {
            await initRoles(client)//dont forget this
        }
    } catch (e) {
        console.log('db init failed', e)
    } finally {
        client.release()
    }
}
const initRoleTable = async (client) => {
    const text = 'CREATE TABLE Role ('
        + 'roleid SERIAL PRIMARY KEY, '
        + 'role varchar(31) NOT NULL UNIQUE '
        + '); '
    await client.query(text)
}

const initDudeTable = async (client) => {
    const text = 'CREATE TABLE Dude ('
        + 'dudeID SERIAL NOT NULL PRIMARY KEY, '
        + 'username varchar(31) NOT NULL UNIQUE, '
        + 'password varchar(127) NOT NULL, '
        + 'roleid int NOT NULL, '
        + 'FOREIGN KEY (roleid) REFERENCES Role(roleid)'
        + '); '
    await client.query(text)
}
const initCategoryTable = async (client) => {
    const text = 'CREATE TABLE Category ('
        + 'categoryID SERIAL NOT NULL PRIMARY KEY, '
        + 'name varchar(31) NOT NULL UNIQUE, '
        + 'description varchar(127) NOT NULL, '
        + 'creatorID int NOT NULL, '
        + 'FOREIGN KEY (creatorID) REFERENCES Dude(dudeID)'
        + '); '
    await client.query(text)
}
const initForumPostTable = async (client) => {
    const text = 'CREATE TABLE Forumpost ('
        + 'forumpostID SERIAL NOT NULL PRIMARY KEY, '
        + 'title varchar(31) NOT NULL, '
        + 'creatorID int NOT NULL, '
        + 'categoryID int NOT NULL, '
        + 'FOREIGN KEY (creatorID) REFERENCES Dude(dudeID), '
        + 'FOREIGN KEY (categoryID) REFERENCES Category(categoryID)'
        + '); '
    await client.query(text)
}
const initCommentTable = async (client) => {
    const text = 'CREATE TABLE Comment ('
        + 'commentID SERIAL NOT NULL PRIMARY KEY, '
        + 'content varchar(1023) NOT NULL, '
        + 'creatorID int NOT NULL, '
        + 'forumpostID int NOT NULL, '
        + 'posttime timestamp NOT NULL, '
        + 'FOREIGN KEY (creatorID) REFERENCES Dude(dudeID), '
        + 'FOREIGN KEY (forumpostID) REFERENCES Forumpost(forumpostID)'
        + '); '
    await client.query(text)
}

const dropDBtables = async (client) => {
    console.log('Dropping database tables')
    await dropTable(client, 'DROP TABLE Comment')
    await dropTable(client, 'DROP TABLE Forumpost')
    await dropTable(client, 'DROP TABLE Category')
    await dropTable(client, 'DROP TABLE Dude')
    await dropTable(client, 'DROP TABLE Role')
}

const dropTable = async (client, text) => {
    try {
        await client.query(text)
    } catch (e) {
        //     console.log(e.stack)
    }
}

const initMod = async (mod) => {
    const saltRounds = 10
    const modtokened = mod.split(":")
    const modDude = {
        username: modtokened[0],
        password: await bcrypt.hash(modtokened[1], saltRounds),
        roleid: getModId()
    }
    await findByNick(modDude.username) ?
        console.log('this username is already taken') :
        modder = await insertDude(modDude)
}
module.exports = {
    db_creation
  }