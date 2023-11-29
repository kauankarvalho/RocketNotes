const ErrorResponse = require("../utils/ErrorResponse")
const authConfig = require("../configs/auth")
const { verify } = require("jsonwebtoken")

function ensureAuth(request, response, next) {
  const authHeader = request.headers.authorization

  const isAuthHeaderMissing = !authHeader
  if (isAuthHeaderMissing) {
    throw new ErrorResponse({
      statusCode: 401,
      status: "error",
      message: "Token não informado",
    })
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id,
    }

    return next()
  } catch {
    throw new ErrorResponse({
      statusCode: 401,
      status: "error",
      message: "Token inválido",
    })
  }
}

module.exports = ensureAuth
