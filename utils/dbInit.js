const { pool } = require('./dbpool')
const { addData } = require('./dbtestdata')
const {plebId, modId, initRoles } = require('../sqlqueries/role')

const dbcreation = async () => {
    console.log('checking for database')
    const client = await pool.connect()
    if (process.env.NODE_ENV !== 'production') {
        refreshDataBase(client)
    }

    try {
        if (await checkforATable(client)) {
            console.log('a table is found. Assuming database is set.')
        } else {
            console.log('database table not found. Creating tables.')
            await initRoleTable(client)
            await initRoles(client)
            await initRoles(client)
            await initDudeTable(client)
            
            console.log('Tables have been set')

            if (process.env.NODE_ENV !== 'production') {
                console.log('adding test data..')
                await addData()
                console.log('Test data has been added')
            }
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
        + 'roleID int, '
        + 'FOREIGN KEY (roleID) REFERENCES Role(roleID)'
        + '); '
    await client.query(text)
}

const checkforATable = async (client) => {
    const checkForInitQuery = 'SELECT COUNT(*) '
        + 'FROM information_schema.tables '
        + "WHERE table_catalog = 'forum' "
        + "AND table_name = 'dude'; "
    const checkforInit = await client.query(checkForInitQuery)

    return checkforInit.rows[0].count !== '0' //count is a string
}

const refreshDataBase = async (client) => {
    try {
        await dropTables(client)
    } catch (e) {
        console.log(e.stack)
    }
}

const dropTables = async (client) => {
    await client.query('DROP TABLE Dude')
    await client.query('DROP TABLE Role')
}

dbcreation()