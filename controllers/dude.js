const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dudequeries = require('../sqlqueries/dude')
const { getPlebId, getModId } = require('../sqlqueries/role')

router.post('/', async (request, response) => {
    console.log('regging backend')
    try {
        const body = request.body

        if (body.password.length < 3) {
            return response.status(400).json({ error: 'password has to be at least 3 characters long!' })
        }

        const existingDude = await dudequeries.findByNick(body.username)
        console.log(existingDude)
        if (existingDude) {
            return response.status(400).json({ error: 'username must be unique' })
        }

        const saltRounds = 10
        const password = await bcrypt.hash(body.password, saltRounds)

        const dude = {
            username: body.username,
            password,
            roleID: getPlebId(),
            isMod: false
        }

        const savedDude = await dudequeries.insertDude(dude)
        console.log(savedDude)
        const loginToken = {
            username: savedDude.username,
            dudeid: savedDude.dudeid,
            roleid: savedDude.roleid
        }
        const token = jwt.sign(loginToken, process.env.SECRET)
        response.status(200).send({ token, loginToken })

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})
module.exports = router