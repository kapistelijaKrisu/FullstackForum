const awt = require('jsonwebtoken')
const { secret } = require('../config/api_config')
const { getModId } = require('../model/role')

const getSecurityContext = (token) => {
    const decodedToken = awt.verify(token, secret)
    return {
        dudeId: decodedToken.dudeid,
        roleId: decodedToken.roleid,
        hasModRigths: decodedToken.roleid === getModId()
    }
}

module.exports = getSecurityContext;