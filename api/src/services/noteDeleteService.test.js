const InMemoryNoteRepository = require("../repositories/InMemoryNoteRepository")
const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
import { describe, beforeEach, test, expect } from "vitest"
const NoteDeleteService = require("./NoteDeleteService")

describe("NoteDeleteService", () => {
  let inMemoryNoteRepository
  let noteDeleteService
  
  let john

  beforeEach(() => {
    inMemoryNoteRepository = new InMemoryNoteRepository()
    noteDeleteService = new NoteDeleteService(inMemoryNoteRepository)

    john = {
      id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      name: "John",
      email: "john@email.com",
      password: "$2a$08$hiUvBe9tESYEj0.QuyChBOAwOio/AvoRTXjBxGmp4OS12uobAyTvy",
      avatar: null,
    }
    
    const inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUserRepository.users = [john]
  })

  test("should delete note in database", async () => {
    const note = {
      id: "cf80e009-8311-40b0-b54b-5e525718fc78",
      user_id: john.id,
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
