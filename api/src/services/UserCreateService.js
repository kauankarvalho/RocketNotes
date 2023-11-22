const ErrorResponse = require("../utils/ErrorResponse")
const { hash } = require("bcryptjs")

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const isMissingRequiredData = !name || !email || !password
    if (isMissingRequiredData) {
      throw new ErrorResponse({
        statusCode: 400,
        status: "warning",
        message: "Por favor, preencha todos os campos obrigatórios",
      })
    }

    const emailExist = await this.userRepository.getUserByEmail(email)
    if (emailExist) {
      throw new ErrorResponse({
        statusCode: 409,
        status: "error",
        field: "email",
        message: "E-mail já cadastrado",
      })
    }

    const hashedPassword = await hash(password, 8)
    await this.userRepository.create({ name, email, password: hashedPassword })
  }
}

module.exports = UserCreateService
