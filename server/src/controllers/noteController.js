const prisma = require("../database")

class NoteController {
  async index(request, response) {
    const { user_id } = request.params

    const notes = await prisma.note.findMany({
      where: {
        user_id,
      },
    })

    return response.status(200).json({
      notes,
    })
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

  async create(request, response) {
    const { title, description, links, tags } = request.body
    const { user_id } = request.params

    const note = await prisma.note.create({
      data: {
        user_id,
        title,
        description,
      },
    })

    if (links) {
      for (const url of links) {
        const link = await prisma.link.create({
          data: {
            user_id,
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
            user_id,
            note_id: note.id,
            name,
          },
        })
      }
    }

    return response.status(201).json()
  }

  async delete(request, response) {
    const { id } = request.params

    const note = await prisma.note.delete({
      where: {
        id,
      },
    })

    return response.status(200).json()
  }
}

module.exports = NoteController
