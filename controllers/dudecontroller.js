const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dudequeries = require('../sqlqueries/dude')


router.post('/', async (request, response) => {
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
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = {
            username: body.username,
            name: body.name,
            roleid: body.adult,
            passwordHash
        }

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})
module.exports = router