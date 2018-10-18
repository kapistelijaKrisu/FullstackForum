const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { secret } = require('../../config/api_config')
const dudequeries = require('../../model/dude')
const formatDude = require('./formatDude')
const listErrors = require('./listErrors')

addDude = async (request, response) => {
    errors = await listErrors(request.body);
    return errors.length !== 0
        ? response.status(400).json({ error: errors })
        : await sendNewlyMadeToken(await makeDude(request), response);
}

sendNewlyMadeToken = async (dude, response) => {
    const loginToken = {
        username: dude.username,
        dude_id: dude.dude_id,
        role_id: dude.role_id
    }
    const token = await jwt.sign(loginToken, secret)
    response.status(200).send({ token, loginToken })
}

makeDude = async (request) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(request.body.password, saltRounds)

    const dude = formatDude(request.body, hashedPassword)

    const savedDude = await dudequeries.insertDude(dude)
    return savedDude;
}


module.exports = addDude