const prisma = require("../database")

class LinkRepository {
  async create({ user_id, note_id, url }) {
    await prisma.link.create({
      data: {
        user_id,
        note_id,
        url,
      },
    })
  }
}

module.exports = LinkRepository
