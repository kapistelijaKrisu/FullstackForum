const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


router.get('/', async (request, response) => {

    response.json('Helllo world!')
})

router.post('/', async (request, response) => {

    const body = request.body

    const dude = await User.findOne({ username: body.username })
    const passwordCorrect = dude === null ?
        false :
        await bcrypt.compare(body.password, dude.passwordHash)

    if (!(dude && passwordCorrect)) {
        return response.status(401).send({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: dude.username,
        id: dude._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, username: dude.username, name: dude.name })
})
module.exports = router