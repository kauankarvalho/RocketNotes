const AppError = require("../utils/appError")
const { hash, compare } = require("bcryptjs")
const prisma = require("../database")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (emailExists) {
      throw new AppError("E-mail já cadastrado", 409)
    }

    const hashedPassword = await hash(password, 8)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, newPassword } = request.body
    const { id } = request.user

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        password: true,
      },
    })

    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const isDuplicateEmail = emailExists && email !== user.email
    if (isDuplicateEmail) {
      throw new AppError("E-mail já cadastrado", 409)
    }

    const invalidPassword = !(await compare(password, user.password))
    if (invalidPassword) {
      throw new AppError("Senha inválida", 401)
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

    return response.status(200).json()
  }
}

module.exports = UserController
