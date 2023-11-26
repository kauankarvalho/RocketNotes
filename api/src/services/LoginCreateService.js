const EmailValidator = require("../utils/EmailValidator")
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
      throw new ErrorResponse({
        statusCode: 400,
        status: "warning",
        message: "Por favor, preencha todos os campos obrigatórios",
      })
    }

    EmailValidator.validator(email)

    const user = await this.userRepository.getUserByEmail(email)

    const userDoesNotExist = !user
    if (userDoesNotExist) {
      throw new ErrorResponse({
        statusCode: 401,
        status: "error",
        message: "E-mail ou senha inválido",
      })
    }

    const invalidPassword = !(await compare(password, user.password))
    if (invalidPassword) {
      throw new ErrorResponse({
        statusCode: 401,
        status: "error",
        message: "E-mail ou senha inválido",
      })
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
