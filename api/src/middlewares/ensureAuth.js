const ResponseStatus = require("../utils/ResponseStatus")
const authConfig = require("../configs/auth")
const { verify } = require("jsonwebtoken")

function ensureAuth(request, response, next) {
  const authHeader = request.headers.authorization

  const isAuthHeaderMissing = !authHeader
  if (isAuthHeaderMissing) {
    throw new ResponseStatus("error", "Token não informado", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id,
    }

    return next()
  } catch {
    throw new ResponseStatus("error", "Token inválido", 401)
  }
}

module.exports = ensureAuth
