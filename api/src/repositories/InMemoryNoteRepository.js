class InMemoryNoteRepository {
  notes = []

  async create({ user_id, title, description }) {
    const newNote = {
      id: crypto.randomUUID(),
      user_id,
      title,
      description,
    }

    this.notes = [newNote, ...this.notes]

    return newNote
  }

  async delete(id) {
    this.notes = this.notes.filter((note) => note.id !== id)
  }
}

module.exports = InMemoryNoteRepository
