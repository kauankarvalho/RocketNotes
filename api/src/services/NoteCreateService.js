const ErrorResponse = require("../utils/ErrorResponse")

class NoteCreateService {
  constructor({ noteRepository, linkRepository, tagRepository }) {
    this.noteRepository = noteRepository
    this.linkRepository = linkRepository
    this.tagRepository = tagRepository
  }

  async execute({ user_id, title, description, links, tags }) {
    const isMissingRequiredData = !title || !description
    if (isMissingRequiredData) {
      throw new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: ["title", "description"],
        message: "Por favor, complete os campos de título e descrição",
      })
    }

    const isMissingTags = tags.length === 0
    if (isMissingTags) {
      throw new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: "tags",
        message:
          "Por favor, certifique-se de incluir pelo menos um marcador em sua anotação",
      })
    }

    const note = await this.noteRepository.create({
      user_id,
      title,
      description,
    })

    const linksExist = links
    if (linksExist) {
      for (const url of links) {
        await this.linkRepository.create({
          user_id,
          note_id: note.id,
          url,
        })
      }
    }

    const tagsExist = tags
    if (tagsExist) {
      for (const name of tags) {
        await this.tagRepository.create({
          user_id,
          note_id: note.id,
          name,
        })
      }
    }
  }
}

module.exports = NoteCreateService
