const InMemoryNoteRepository = require("../repositories/InMemoryNoteRepository")
import { describe, beforeEach, test, expect } from "vitest"
const NoteDeleteService = require("./NoteDeleteService")

describe("NoteDeleteService", () => {
  let inMemoryNoteRepository
  let noteDeleteService

  beforeEach(() => {
    inMemoryNoteRepository = new InMemoryNoteRepository()
    noteDeleteService = new NoteDeleteService(inMemoryNoteRepository)
  })

  test("should delete note in database", async () => {
    const note = inMemoryNoteRepository.notes[0]

    await noteDeleteService.execute(note.id)

    expect(inMemoryNoteRepository.notes).not.toContain(note)
  })
})
