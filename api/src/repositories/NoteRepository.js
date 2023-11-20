const prisma = require("../database")

class NoteRepository {
  async getNoteById(id) {
    return await prisma.note.findUnique({
      where: {
        id,
      },
      include: {
        links: true,
        tags: true,
      },
    })
  }

  async getNotesByUserIdAndTitle({ user_id, title }) {
    return await prisma.note.findMany({
      where: {
        user_id,
        title: {
          contains: title,
        },
      },
      include: {
        tags: true,
      },
      orderBy: {
        title: "asc",
      },
    })
  }

  async getNotesByUserIdAndTitleOrTag({ user_id, title, tag }) {
    return await prisma.note.findMany({
      where: {
        user_id,
        title: {
          contains: title,
        },
        tags: {
          some: {
            name: tag,
          },
        },
      },
      include: {
        tags: true,
      },
      orderBy: {
        title: "asc",
      },
    })
  }

  async create({ user_id, title, description }) {
    return await prisma.note.create({
      data: {
        user_id,
        title,
        description,
      },
    })
  }

  async delete(id) {
    await prisma.note.delete({
      where: {
        id,
      },
    })
  }
}

module.exports = NoteRepository
