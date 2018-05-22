const { pool } = require('./dbpool')
const { addData } = require('./dbtestdata')
const { plebId, modId, initRoles } = require('../sqlqueries/role')

const dbcreation = async () => {
    console.log('checking for database')
    const client = await pool.connect()
    if (process.env.NODE_ENV !== 'production') {
        await refreshDataBase(client)
    }

    try {
        await initRoleTable(client)
        await initRoles(client)
        await initRoles(client)
        await initDudeTable(client)
        await initCategoryTable(client)


        console.log('Tables have been set')

        if (process.env.NODE_ENV !== 'production') {
            console.log('adding test data..')
            await addData()
            console.log('Test data has been added')
        }

    } catch (e) {
        console.log('db init failed', e.stack)
    } finally {
        client.release()
    }

}

const initRoleTable = async (client) => {
    const text = 'CREATE TABLE Role ('
        + 'roleID SERIAL PRIMARY KEY, '
        + 'role varchar(31) NOT NULL UNIQUE '
        + '); '
    await client.query(text)
}

const initDudeTable = async (client) => {
    const text = 'CREATE TABLE Dude ('
        + 'dudeID SERIAL NOT NULL PRIMARY KEY, '
        + 'username varchar(31) NOT NULL UNIQUE, '
        + 'password varchar(127) NOT NULL, '
        + 'roleID int NOT NULL, '
        + 'FOREIGN KEY (roleID) REFERENCES Role(roleID)'
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

const refreshDataBase = async (client) => {

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

dbcreation()