const InMemoryNoteRepository = require("../repositories/InMemoryNoteRepository")
const NoteDeleteService = require("./NoteDeleteService")
import { describe, test, expect } from "vitest"
const crypto = require("node:crypto")

describe("NoteDeleteService", () => {
  test("should delete note in database", async () => {
    const inMemoryNoteRepository = new InMemoryNoteRepository()
    const noteDeleteService = new NoteDeleteService(inMemoryNoteRepository)

    const note = {
      id: crypto.randomUUID(),
      user_id: crypto.randomUUID(),
      title: "What is Lorem Ipsum?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      links: ["https://www.lipsum.com"],
      tags: ["Lorem Ipsum", "Generator"],
    }

    await noteDeleteService.execute(note.id)

    expect(inMemoryNoteRepository.notes).not.toContain(note)
  })
})
