const prisma = require("../database")

class NoteController {
  async create(request, response) {
    const { title, description, links, tags } = request.body
    const { user } = request.params

    const note = await prisma.note.create({
      data: {
        user_id: user,
        title,
        description,
      },
    })

    if (links) {
      for (const url of links) {
        const link = await prisma.link.create({
          data: {
            user_id: user,
            note_id: note.id,
            url,
          },
        })
      }
    }

    if (tags) {
      for (const name of tags) {
        const tag = await prisma.tag.create({
          data: {
            user_id: user,
            note_id: note.id,
            name,
          },
        })
      }
    }

    return response.status(201).json()
  }

  async show(request, response) {
    const { id } = request.params

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
      include: {
        links: true,
        tags: true,
      },
    })

    return response.status(200).json({
      note,
    })
  }
}

module.exports = NoteController
