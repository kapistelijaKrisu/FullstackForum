const { pool } = require('./dbpool')
const { mod } = require('./config')
const { addData } = require('./dbtestdata')
const { getModId, initRoles } = require('../sqlqueries/role')
const { findByNick, insertDude } = require('../sqlqueries/dude')
const bcrypt = require('bcrypt')


const dbcreation = async () => {
    console.log('checking for database')
    const client = await pool.connect()
   // if (process.env.NODE_ENV !== 'production') {
        await refreshDataBase(client)
   // }

    try {
        await initRoleTable(client)
        await initRoles(client)
        await initRoles(client)
        await initDudeTable(client)
        await initCategoryTable(client)
        await initForumPostTable(client)
        await initCommentTable(client)

        console.log('Tables have been set')

        if (process.env.NODE_ENV !== 'production') {
            console.log('adding test data..')
            await addData()
            console.log('Test data has been added')
        }
    } catch (e) {
        console.log('db init failed', e.stack)
    } finally {
        await initMod(client)
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

const refreshDataBase = async (client) => {
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

const initMod = async () => {
    const saltRounds = 10
    const modtokened = mod.split(":")
    const modDude = {
        username: modtokened[0],
        password: await bcrypt.hash(modtokened[1], saltRounds),
        roleid: getModId()
    }
    console.log(modDude)

    const modder = null
    await findByNick(modDude.username) ?
        console.log('this username is already taken') :
        modder = await insertDude(modDude)

        console.log(modder)
}

dbcreation()