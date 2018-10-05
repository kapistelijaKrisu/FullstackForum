const { getPlebId } = require('../../model/role')

const formatDude = (body, hashedpassword) => {
    return {
        username: body.username.trim(),
        password: hashedpassword,
        role_id: getPlebId(),
        isMod: false
    }
}

module.exports = formatDude