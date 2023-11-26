const EmailValidator = require("../utils/EmailValidator")
const ErrorResponse = require("../utils/ErrorResponse")
const { hash, compare } = require("bcryptjs")

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ id, name, email, password, newPassword }) {
    const isNameOrEmailEmpty = !name || !email
    if (isNameOrEmailEmpty) {
      throw new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: ["name", "email"],
        message: "Você precisa fornecer tanto um nome quanto um email",
      })
    }

    const passwordDoesNotExist = !password
    if (passwordDoesNotExist) {
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

    EmailValidator.validator(email)

    const emailExist = await this.userRepository.getUserByEmail(email)

    const isDuplicateEmail = emailExist && email !== user.email
    if (isDuplicateEmail) {
      throw new ErrorResponse({
        statusCode: 409,
        status: "error",
        field: "email",
        message: "E-mail já cadastrado",
      })
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
