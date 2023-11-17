const ErrorResponse = require("../utils/ErrorResponse")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")

class LoginCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ email, password }) {
    const isMissingRequiredData = !email || !password
    if (isMissingRequiredData) {
      throw new ErrorResponse(
        "warning",
        "Por favor, preencha todos os campos obrigatórios",
        400,
      )
    }

    const user = await this.userRepository.getUserByEmail(email)

    const userDoesNotExist = !user
    if (userDoesNotExist) {
      throw new ErrorResponse("error", "E-mail e/ou senha inválido", 401)
    }

    const invalidPassword = !(await compare(password, user.password))
    if (invalidPassword) {
      throw new ErrorResponse("error", "E-mail e/ou senha inválido", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    }
  }
}

module.exports = LoginCreateService
