const AppError = require("../utils/AppError")
const prisma = require("../database")

class NoteController {
  async index(request, response) {
    const { id: user_id } = request.user
    let { title, tag } = request.query

    let notes

    const tagExist = tag
    if (tagExist) {
      notes = await prisma.note.findMany({
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
    } else {
      notes = await prisma.note.findMany({
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

    notes = notes.map((note) => {
      return {
        id: note.id,
        title: note.title,
        tags: note.tags.map((tag) => tag.name).sort(),
      }
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
    const { id: user_id } = request.user

    const isMissingRequiredData = !title || !description
    if (isMissingRequiredData) {
      throw new AppError(
        "Por favor, complete os campos de título e descrição",
        400,
      )
    }

    const note = await prisma.note.create({
      data: {
        user_id,
        title,
        description,
      },
    })

    if (links) {
      for (const url of links) {
        await prisma.link.create({
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
        await prisma.tag.create({
          data: {
            user_id,
            note_id: note.id,
            name,
          },
        })
      }
    }

    return response.status(201).json({
      status: "Successful",
      message: "Anotação criada com sucesso",
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await prisma.note.delete({
      where: {
        id,
      },
    })

    return response.status(200).json({
      status: "Successful",
      message: "Anotação excluida com sucesso",
    })
  }
}

module.exports = NoteController
