const InMemoryLinkRepository = require("./InMemoryLinkRepository")
const InMemoryTagRepository = require("./InMemoryTagRepository")

function formatNotesWithTags({ notes, tags }) {
  let formattedNotes = []

  notes.forEach((note) => {
    tags = tags.filter((tag) => tag.note_id === note.id)

    const noteWithYourTags = {
      ...note,
      tags,
    }

    formattedNotes = [noteWithYourTags, ...formattedNotes]
  })

  return formattedNotes
}

class InMemoryNoteRepository {
  notes = []

  async getNoteById(id) {
    const inMemoryLinkRepository = new InMemoryLinkRepository()
    const inMemoryTagRepository = new InMemoryTagRepository()

    let note = this.notes.find((note) => note.id === id)
    const links = inMemoryLinkRepository.links.filter(
      (link) => link.note_id === id,
    )
    const tags = inMemoryTagRepository.tags.filter((tag) => tag.note_id === id)

    note = {
      ...note,
      links,
      tags,
    }

    return note
  }

  async getNotesByUserIdAndTitle({ user_id, title }) {
    const inMemoryTagRepository = new InMemoryTagRepository()

    let notes = this.notes.filter((note) => note.user_id === user_id)
    let tags = inMemoryTagRepository.tags.filter(
      (tag) => tag.user_id === user_id,
    )

    notes = formatNotesWithTags({ notes, tags })

    if (title) {
      notes = notes.filter((note) => note.title === title)
      return notes
    }

    return notes
  }

  async getNotesByUserIdAndTitleOrTag({ user_id, title, tag }) {
    const inMemoryTagRepository = new InMemoryTagRepository()

    let notes = this.notes.filter((note) => note.user_id === user_id)
    let tags = inMemoryTagRepository.tags.filter(
      (tag) => tag.user_id === user_id,
    )

    notes = formatNotesWithTags({ notes, tags })

    if (title && tag) {
      notes = notes.filter((note) => {
        hasTitle = note.title === title
        hasTag = note.some((noteTag) => noteTag === tag)

        return hasTag && hasTag
      })
      return notes
    }

    if (title) {
      notes = notes.filter((note) => note.title === title)
      return notes
    }

    if (tag) {
      notes = notes.filter((note) =>
        note.tags.some((noteTag) => noteTag.name === tag),
      )
      return notes
    }

    return notes
  }

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
