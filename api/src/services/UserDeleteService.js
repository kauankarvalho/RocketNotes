const ErrorResponse = require("../utils/ErrorResponse")
const { compare } = require("bcryptjs")

class UserDeleteService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ id, password }) {
    const emptyPassword = !password
    if (emptyPassword) {
      throw new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: "password",
        message: "Por favor, insira sua senha",
      })
    }

    const user = await this.userRepository.getUserById(id)

    const invalidPassword = !(await compare(password, user.password))
    if (invalidPassword) {
      throw new ErrorResponse({
        statusCode: 401,
        status: "error",
        field: "password",
        message: "Senha inválida",
      })
    }

    await this.userRepository.delete(id)
  }
}

module.exports = UserDeleteService
