const InMemoryNoteRepository = require("../repositories/InMemoryNoteRepository")
const NoteDeleteService = require("./NoteDeleteService")
import { describe, test, expect } from "vitest"

describe("NoteDeleteService", () => {
  test("should delete note in database", async () => {
    const inMemoryNoteRepository = new InMemoryNoteRepository()
    const noteDeleteService = new NoteDeleteService(inMemoryNoteRepository)

    const note = {
      id: "cf80e009-8311-40b0-b54b-5e525718fc78",
      user_id: "5d006fea-072e-46fc-b275-68139c23a0d5",
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
