const { pool } = require('./dbpool')
const { initRole, insertRole } = require('../sqlqueries/role')
const { initDude, insertDude } = require('../sqlqueries/dude')

const dbcreation = async () => {
    console.log('checking for database')
    await pool.query('DROP TABLE Dude')
    await pool.query('DROP TABLE Role')

    try {
        const checkForInitQuery = 'SELECT COUNT(*) '
            + 'FROM information_schema.tables '
            + "WHERE table_catalog = 'forum' "
            + "AND table_name = 'dude'; "
        const checkforInit = await pool.query(checkForInitQuery)
        if (checkforInit.rows[0].count !== '0') { //count is a string
            console.log('a table is found. Assuming database is set.')

        } else {
            console.log('database table not found. Creating tables.')
            await initRole()
            await initDude()
            const plebId = await insertRole('PLEB')
            const modId = await insertRole('MOD')
            const dude1 = await insertDude('dude1', 'pw1', plebId)
            const dude2 = await insertDude('dude2', 'pw2', modId)
            console.log('Tables have been set')
        }
    } catch (e) {
        console.log('db init failed', e.stack)
    }

}

dbcreation()