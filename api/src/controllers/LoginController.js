const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")
const prisma = require("../database")

class LoginController {
  async create(request, response) {
    const { secret, expiresIn } = authConfig.jwt
    const { email, password } = request.body

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        avatar: true,
      },
    })

    const isMissingRequiredData = !email || !password
    if (isMissingRequiredData) {
      throw new AppError(
        "Por favor, preencha todos os campos obrigatórios",
        400,
      )
    }

    const userDoesNotExist = !user
    if (userDoesNotExist) {
      throw new AppError("E-mail e/ou senha inválido", 401)
    }

    const invalidPassword = !(await compare(password, user.password))
    if (invalidPassword) {
      throw new AppError("E-mail e/ou senha inválido", 401)
    }

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
