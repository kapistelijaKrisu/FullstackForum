const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dudequeries = require('../sqlqueries/dude')

router.post('/', async (request, response) => {
    console.log('loggin backend')
    try {
        const credentials = request.body
        console.log(credentials)
        const dude = await dudequeries.findByNick(credentials.username)
     console.log(dude)
        const passwordCorrect = dude === null ?
            false : await bcrypt.compare(credentials.password, dude.password)

        if (!(dude && passwordCorrect)) {
            return response.status(401).send({ error: 'invalid username or password' })
        }

        const loginToken = {
            username: dude.username,
            id: dude.dudeid,
            roleid: dude.roleid
        }
        const token = jwt.sign(loginToken, process.env.SECRET)

        response.status(200).send({ token, loginToken })

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})
module.exports = router