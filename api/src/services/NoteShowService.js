const ErrorResponse = require("../utils/ErrorResponse")

class NoteShowService {
  constructor(noteRepository) {
    this.notesRepository = noteRepository
  }

  async execute(id) {
    let note = await this.notesRepository.getNoteById(id)

    const noteDoesNotExist = !note
    if (noteDoesNotExist) {
      throw new ErrorResponse("error", "A nota não foi encontrada", 404)
    }

    note = {
      title: note.title,
      description: note.description,
      links: note.links.map((link) => link.url).sort(),
      tags: note.tags.map((tag) => tag.name).sort(),
    }

    return note
  }
}

module.exports = NoteShowService
