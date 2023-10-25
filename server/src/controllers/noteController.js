const AppError = require("../utils/appError")
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
      select: {
        title: true,
        description: true,
      },
    })

    const noteDoesNotExist = !note
    if (noteDoesNotExist) {
      throw new AppError("A nota não foi encontrada", 404)
    }

    let links = await prisma.link.findMany({
      where: {
        note_id: id,
      },
      select: {
        url: true,
      },
      orderBy: {
        url: "asc",
      },
    })

    let tags = await prisma.tag.findMany({
      where: {
        note_id: id,
      },
      select: {
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    })

    links = links.map((link) => link.url)
    tags = tags.map((tag) => tag.name)

    return response.status(200).json({
      ...note,
      links,
      tags,
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
