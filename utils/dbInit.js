const { dbPool } = require('./dbpool')

const checkForInitQuery = 'SELECT COUNT(*) '
    + 'FROM information_schema.tables '
    + "WHERE table_catalog = 'forum' "
    + "AND table_name = 'dude'; "

const roleQuery = 'CREATE TABLE Role ('
    + 'roleID int NOT NULL PRIMARY KEY, '
    + 'role varchar(31) NOT NULL UNIQUE '
    + '); '
const dudeQuery = 'CREATE TABLE Dude ('
    + 'dudeID int NOT NULL PRIMARY KEY, '
    + 'nickname varchar(31) NOT NULL UNIQUE, '
    + 'password varchar(31) NOT NULL, '
    + 'roleID int, '
    + 'FOREIGN KEY (roleID) REFERENCES Role(roleID)'
    + '); '

const dbcreation = async () => {
    console.log('checking for database')
    const client = await dbPool.connect()
    // await client.query('DROP TABLE Dude')
    // await client.query('DROP TABLE Role')

    try {
        const checkforInit = await client.query(checkForInitQuery)
        if (checkforInit.rows[0].count !== '0') { //count is a string
            
            console.log('a table is found. Assuming database is set.')
        
        } else {
        
            console.log('database table not found. Creating tables.')
            const roleresult = await client.query(roleQuery)
            console.log('role query finished', roleresult)
            const duderesult = await client.query(dudeQuery)
            console.log('dude query finished', duderesult)
            console.log('Tables have been set')
        }
    } catch (e) {
        console.log('db init failed', e.stack)
    } finally {
        client.release()
    }
}

dbcreation()