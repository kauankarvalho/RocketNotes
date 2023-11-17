const ErrorResponse = require("../utils/ErrorResponse")
const { hash, compare } = require("bcryptjs")

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ id, name, email, password, newPassword }) {
    const isNameOrEmailEmpty = !name || !email
    if (isNameOrEmailEmpty) {
      throw new ErrorResponse(
        "warning",
        "Você precisa fornecer tanto um nome quanto um email",
        400,
      )
    }

    const passwordDoesNotExist = !password
    if (passwordDoesNotExist) {
      throw new ErrorResponse("warning", "Por favor, insira sua senha", 400)
    }

    const user = await this.userRepository.getUserById(id)

    const invalidPassword = !(await compare(password, user.password))
    if (invalidPassword) {
      throw new ErrorResponse("error", "Senha inválida", 401)
    }

    const emailExist = await this.userRepository.getUserByEmail(email)

    const isDuplicateEmail = emailExist && email !== user.email
    if (isDuplicateEmail) {
      throw new ErrorResponse("error", "E-mail já cadastrado", 409)
    }

    let hashedPassword
    if (newPassword) {
      hashedPassword = await hash(newPassword, 8)
    }

    await this.userRepository.update({
      id,
      name,
      email,
      password: hashedPassword || user.password,
    })
  }
}

module.exports = UserUpdateService
