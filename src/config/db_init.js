const { mod } = require('./api_config')
const { pool } = require('./dbpool')
const { addData } = require('./dbtestdata')
const { getModId, initRoles } = require('../model/role')
const { findByNick, insertDude } = require('../model/dude')
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
             await migration(client)
        }
        await migration(client)
    } catch (e) {
        console.log('db init failed', e)
    } finally {
        client.release()
    }
}

const migration = async (client) => {
    let text = 'ALTER TABLE Comment '
        + 'ADD COLUMN deleted boolean;'
    await client.query(text)
    text = 'UPDATE Comment '
    + 'SET deleted = false;'
    await client.query(text)
}

const initRoleTable = async (client) => {
    const text = 'CREATE TABLE Role ('
        + 'role_id SERIAL PRIMARY KEY, '
        + 'role varchar(31) NOT NULL UNIQUE '
        + '); '
    await client.query(text)
}

const initDudeTable = async (client) => {
    const text = 'CREATE TABLE Dude ('
        + 'dude_id SERIAL NOT NULL PRIMARY KEY, '
        + 'username varchar(31) NOT NULL UNIQUE, '
        + 'password varchar(127) NOT NULL, '
        + 'role_id int NOT NULL, '
        + 'FOREIGN KEY (role_id) REFERENCES Role(role_id)'
        + '); '
    await client.query(text)
}
const initCategoryTable = async (client) => {
    const text = 'CREATE TABLE Category ('
        + 'category_id SERIAL NOT NULL PRIMARY KEY, '
        + 'name varchar(31) NOT NULL UNIQUE, '
        + 'description varchar(127) NOT NULL, '
        + 'creator_id int NOT NULL, '
        + 'FOREIGN KEY (creator_id) REFERENCES Dude(dude_id)'
        + '); '
    await client.query(text)
}
const initForumPostTable = async (client) => {
    const text = 'CREATE TABLE Forumpost ('
        + 'forumpost_id SERIAL NOT NULL PRIMARY KEY, '
        + 'title varchar(31) NOT NULL, '
        + 'creator_id int NOT NULL, '
        + 'category_id int NOT NULL, '
        + 'disabled boolean DEFAULT false NOT NULL, '
        + 'FOREIGN KEY (creator_id) REFERENCES Dude(dude_id), '
        + 'FOREIGN KEY (category_id) REFERENCES Category(category_id)'
        + '); '
    await client.query(text)
}
const initCommentTable = async (client) => {
    const text = 'CREATE TABLE Comment ('
        + 'comment_id SERIAL NOT NULL PRIMARY KEY, '
        + 'content varchar(1023) NOT NULL, '
        + 'creator_id int NOT NULL, '
        + 'forumpost_id int NOT NULL, '
        + 'posttime timestamp NOT NULL, '
        + 'FOREIGN KEY (creator_id) REFERENCES Dude(dude_id), '
        + 'FOREIGN KEY (forumpost_id) REFERENCES Forumpost(forumpost_id)'
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
        role_id: getModId()
    }
    await findByNick(modDude.username) ?
        console.log('this username is already taken') :
        modder = await insertDude(modDude)
}
module.exports = {
    db_creation
  }