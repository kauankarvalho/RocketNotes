const prisma = require("../database")
const { hash } = require("bcryptjs")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const hashedPassword = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    })

    return response.status(201).json()
  }
}

module.exports = UserController
