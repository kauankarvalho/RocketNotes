const ResponseStatus = require("../utils/ResponseStatus")
const { hash, compare } = require("bcryptjs")
const prisma = require("../database")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const isMissingRequiredData = !name || !email || !password
    if (isMissingRequiredData) {
      throw new ResponseStatus(
        "warning",
        "Por favor, preencha todos os campos obrigatórios",
        400,
      )
    }

    const emailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (emailExist) {
      throw new ResponseStatus("error", "E-mail já cadastrado", 409)
    }

    const hashedPassword = await hash(password, 8)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    throw new ResponseStatus("success", "Conta criada com sucesso", 201)
  }

  async update(request, response) {
    const { name, email, password, newPassword } = request.body
    const { id } = request.user

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    const emailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const isDuplicateEmail = emailExist && email !== user.email
    if (isDuplicateEmail) {
      throw new ResponseStatus("error", "E-mail já cadastrado", 409)
    }

    const invalidPassword = !(await compare(password, user.password))
    if (invalidPassword) {
      throw new ResponseStatus("error", "Senha inválida", 401)
    }

    let hashedPassword
    if (newPassword) {
      hashedPassword = await hash(newPassword, 8)
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: hashedPassword || user.password,
      },
    })

    throw new ResponseStatus(
      "success",
      "As informações da conta foram atualizadas com sucesso",
      200,
    )
  }
}

module.exports = UserController
