const AppError = require("../utils/appError")
const prisma = require("../database")
const { hash } = require("bcryptjs")

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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password } = request.body
    const { id } = request.params

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return response.status(200).json()
  }
}

module.exports = UserController
