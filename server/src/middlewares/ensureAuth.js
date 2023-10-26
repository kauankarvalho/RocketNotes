const AppError = require("../utils/appError")
const authConfig = require("../configs/auth")
const { verify } = require("jsonwebtoken")

function ensureAuth(request, response, next) {
  const authHeader = request.headers.authorization

  const isAuthHeaderMissing = !authHeader
  if (isAuthHeaderMissing) {
    throw new AppError("Token não informado", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: user_id,
    }

    return next()
  } catch {
    throw new AppError("Token inválido", 401)
  }
}

module.exports = ensureAuth
