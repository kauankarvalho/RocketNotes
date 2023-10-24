const authConfig = require("../configs/auth")
const { verify } = require("jsonwebtoken")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.header.authorization
  
  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: user_id,
    }

    return next()
  } catch {}
}

module.exports = ensureAuthenticated
