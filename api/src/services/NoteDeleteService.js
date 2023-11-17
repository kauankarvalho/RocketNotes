class NoteDeleteService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository
  }

  async execute(id) {
    await this.noteRepository.delete(id)
  }
}

module.exports = NoteDeleteService
