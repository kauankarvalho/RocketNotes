const prisma = require("../database")

class TagRepository {
  async getTagsByUserId(user_id) {
    return await prisma.tag.findMany({
      where: {
        user_id,
      },
      select: {
        name: true,
      },
      orderBy: {
        name: "asc",
      },
      distinct: ["name"],
    })
  }

  async create({ user_id, note_id, name }) {
    await prisma.tag.create({
      data: {
        user_id,
        note_id,
        name,
      },
    })
  }
}

module.exports = TagRepository
