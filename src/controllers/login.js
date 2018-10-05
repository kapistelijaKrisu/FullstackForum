const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {secret} = require('../config/api_config')
const dudequeries = require('../model/dude')
const {getModId} = require('../model/role')

router.post('/', async (request, response) => {
    try {
        const credentials = request.body
        const dude = await dudequeries.findByNick(credentials.username)
        if (dude === undefined) {
            return response.status(401).send({ error: 'invalid username or password' })
        }
        const passwordCorrect = dude === null ?
            false : await bcrypt.compare(credentials.password, dude.password)

        if (!(dude && passwordCorrect)) {
            return response.status(401).send({ error: 'invalid username or password' })
        }

        const loginToken = {
            username: dude.username,
            dude_id: dude.dude_id,
            role_id: dude.role_id,
            isMod: dude.role_id===getModId()
        }
        const token = jwt.sign(loginToken, secret)
        response.status(200).send({ token, loginToken })

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})
module.exports = router