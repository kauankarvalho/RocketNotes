class NoteIndexService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository
  }

  async execute({ user_id, title, tag }) {
    let notes

    const tagExist = tag
    if (tagExist) {
      notes = await this.noteRepository.getNotesByUserIdAndTitleOrTag({
        user_id,
        title,
        tag,
      })
    } else {
      notes = await this.noteRepository.getNotesByUserIdAndTitle({
        user_id,
        title,
      })
    }

    notes = notes.map((note) => {
      return {
        id: note.id,
        title: note.title,
        tags: note.tags.map((tag) => tag.name).sort(),
      }
    })

    return notes
  }
}

module.exports = NoteIndexService
