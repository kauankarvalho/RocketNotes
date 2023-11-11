const ResponseStatus = require("../utils/ResponseStatus")
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

    let note = await prisma.note.findUnique({
      where: {
        id,
      },
      include: {
        links: true,
        tags: true,
      },
    })

    const noteDoesNotExist = !note
    if (noteDoesNotExist) {
      throw new ResponseStatus("error", "A nota não foi encontrada", 404)
    }

    note = {
      title: note.title,
      description: note.description,
      links: note.links.map((link) => link.url).sort(),
      tags: note.tags.map((tag) => tag.name).sort(),
    }

    return response.status(200).json({
      note,
    })
  }

  async create(request, response) {
    const { title, description, links, tags } = request.body
    const { id: user_id } = request.user

    const isMissingRequiredData = !title || !description
    if (isMissingRequiredData) {
      throw new ResponseStatus(
        "warning",
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

    throw new ResponseStatus("success", "Anotação criada com sucesso", 201)
  }

  async delete(request, response) {
    const { id } = request.params

    await prisma.note.delete({
      where: {
        id,
      },
    })

    throw new ResponseStatus("success", "Anotação excluida com sucesso", 200)
  }
}

module.exports = NoteController
