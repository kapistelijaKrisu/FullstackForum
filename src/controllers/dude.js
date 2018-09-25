const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { secret } = require('../config/api_config')
const dudequeries = require('../model/dude')
const { getPlebId, getModId } = require('../model/role')
const { isInLength } = require('../utils/validation')

router.post('/', async (request, response) => {
    try {
        let body = request.body
        body.username = body.username.trim()
        body.password = body.password.trim()

        if (!isInLength(3, 31, false, body.password)) {
            return response.status(400).json({ error: 'password has to be 3-31 characters long!' })
        }
        if (!isInLength(3, 31, false, body.username)) {
            return response.status(400).json({ error: 'username has to be 3-31 characters long!' })
        }

        const existingDude = await dudequeries.findByNick(body.username)
        if (existingDude) {
            return response.status(400).json({ error: 'username must be unique' })
        }

        const saltRounds = 10
        const password = await bcrypt.hash(body.password, saltRounds)

        const dude = {
            username: body.username,
            password,
            roleid: getPlebId(),
            isMod: false
        }

        const savedDude = await dudequeries.insertDude(dude)

        const loginToken = {
            username: savedDude.username,
            dudeid: savedDude.dudeid,
            roleid: savedDude.roleid
        }
        const token = jwt.sign(loginToken, secret)
        response.status(200).send({ token, loginToken })

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})
module.exports = router