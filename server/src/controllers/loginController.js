const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")
const prisma = require("../database")

class LoginController {
  async create(request, response) {
    const { secret, expiresIn } = authConfig.jwt
    const { email, password } = request.body

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return response.status(200).json({
      user,
      token,
    })
  }
}

module.exports = LoginController
