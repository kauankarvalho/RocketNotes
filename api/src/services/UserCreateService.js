const ErrorResponse = require("../utils/ErrorResponse")
const { hash } = require("bcryptjs")

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const isMissingRequiredData = !name || !email || !password
    if (isMissingRequiredData) {
      throw new ErrorResponse(
        "warning",
        "Por favor, preencha todos os campos obrigatórios",
        400,
      )
    }

    const emailExist = await this.userRepository.getUserByEmail(email)
    if (emailExist) {
      throw new ErrorResponse("error", "E-mail já cadastrado", 409)
    }

    const hashedPassword = await hash(password, 8)
    await this.userRepository.create({ name, email, password: hashedPassword })
  }
}

module.exports = UserCreateService
