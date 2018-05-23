const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {secret} = require('../utils/config')
const dudequeries = require('../sqlqueries/dude')
const {getModId} = require('../sqlqueries/role')

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
            dudeid: dude.dudeid,
            roleid: dude.roleid,
            isMod: dude.roleid===getModId()
        }
        const token = jwt.sign(loginToken, secret)

        response.status(200).send({ token, loginToken })

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})
module.exports = router