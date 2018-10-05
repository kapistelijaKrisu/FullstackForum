const jwt = require('jsonwebtoken')
const { secret } = require('../config/api_config')
const { getModId } = require('../model/role')

const logger = (request, response, next) => {
  if (process.env.NODE_ENV === 'test') {
    return next()
  }

  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const getSecurityContext = async (request, response, next) => {
  if (request.token) {
    const decodedToken = await jwt.verify(request.token, secret)
    request.securityContext = {
      dude_id: decodedToken.dude_id,
      username: decodedToken.username,
      role_id: decodedToken.role_id,
      hasModRigths: decodedToken.role_id === getModId()
    }
  }
  next()
}

module.exports = {
  logger,
  tokenExtractor,
  getSecurityContext
}