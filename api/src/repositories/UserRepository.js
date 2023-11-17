const prisma = require("../database")

class UserRepository {
  async getUserById(id) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async create({ name, email, password }) {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }

  async update({ id, name, email, password, avatar }) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        avatar,
      },
    })
  }
}

module.exports = UserRepository
