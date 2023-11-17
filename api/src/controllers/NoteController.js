const NoteCreateService = require("../services/NoteCreateService")
const NoteDeleteService = require("../services/NoteDeleteService")
const NoteIndexService = require("../services/NoteIndexService")
const NoteRepository = require("../repositories/NoteRepository")
const LinkRepository = require("../repositories/LinkRepository")
const TagRepository = require("../repositories/TagRepository")
const NoteShowService = require("../services/NoteShowService")

class NoteController {
  async index(request, response) {
    const { id: user_id } = request.user
    const { title, tag } = request.query

    const noteRepository = new NoteRepository()
    const noteIndexService = new NoteIndexService(noteRepository)

    const notes = await noteIndexService.execute({ user_id, title, tag })

    return response.status(200).json({
      notes,
    })
  }

  async show(request, response) {
    const { id } = request.params

    const noteRepository = new NoteRepository()
    const noteShowService = new NoteShowService(noteRepository)

    const note = await noteShowService.execute(id)

    return response.status(200).json({
      note,
    })
  }

  async create(request, response) {
    const { title, description, links, tags } = request.body
    const { id: user_id } = request.user

    const noteRepository = new NoteRepository()
    const linkRepository = new LinkRepository()
    const tagRepository = new TagRepository()

    const noteCreateService = new NoteCreateService({
      noteRepository,
      linkRepository,
      tagRepository,
    })

    await noteCreateService.execute({
      user_id,
      title,
      description,
      links,
      tags,
    })

    return response.status(201).json({
      status: "success",
      message: "Anotação criada com sucesso",
    })
  }

  async delete(request, response) {
    const { id } = request.params

    const noteRepository = new NoteRepository()
    const noteDeleteService = new NoteDeleteService(noteRepository)

    await noteDeleteService.execute(id)

    return response.status(200).json({
      status: "success",
      message: "Anotação excluida com sucesso",
    })
  }
}

module.exports = NoteController
