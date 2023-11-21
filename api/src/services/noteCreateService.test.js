const InMemoryUserRepository = require("../repositories/InMemoryUserRepository")
const InMemoryNoteRepository = require("../repositories/InMemoryNoteRepository")
const InMemoryLinkRepository = require("../repositories/InMemoryLinkRepository")
const InMemoryTagRepository = require("../repositories/InMemoryTagRepository")
import { describe, beforeEach, test, expect } from "vitest"
const NoteCreateService = require("./NoteCreateService")
const ErrorResponse = require("../utils/ErrorResponse")

describe("NoteCreateService", () => {
  let inMemoryNoteRepository
  let inMemoryLinkRepository
  let inMemoryTagRepository

  let noteCreateService

  let john

  beforeEach(() => {
    inMemoryNoteRepository = new InMemoryNoteRepository()
    inMemoryLinkRepository = new InMemoryLinkRepository()
    inMemoryTagRepository = new InMemoryTagRepository()

    noteCreateService = new NoteCreateService({
      noteRepository: inMemoryNoteRepository,
      linkRepository: inMemoryLinkRepository,
      tagRepository: inMemoryTagRepository,
    })

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

  test("should reject create note with mandatory fields blank", () => {
    expect(async () => {
      await noteCreateService.execute({
        user_id: john.id,
        title: "",
        description: "",
        links: ["https://www.lipsum.com/"],
        tags: ["Lorem Ipsum", "Generator"],
      })
    }).rejects.toEqual(
      new ErrorResponse(
        "warning",
        "Por favor, complete os campos de título e descrição",
        400,
      ),
    )
  })

  test("should create a note with associated links and tags", async () => {
    const newNote = {
      user_id: john.id,
      title: "What is Lorem Ipsum?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      links: ["https://www.lipsum.com"],
      tags: ["Lorem Ipsum", "Generator"],
    }

    await noteCreateService.execute(newNote)

    expect(inMemoryNoteRepository.notes).toContainEqual({
      id: expect.any(String),
      user_id: newNote.user_id,
      title: newNote.title,
      description: newNote.description,
    })

    expect(inMemoryLinkRepository.links).toContainEqual({
      id: expect.any(String),
      user_id: newNote.user_id,
      note_id: expect.any(String),
      url: newNote.links[0],
    })

    expect(inMemoryTagRepository.tags).toContainEqual({
      id: expect.any(String),
      user_id: newNote.user_id,
      note_id: expect.any(String),
      name: newNote.tags[0],
    })

    expect(inMemoryTagRepository.tags).toContainEqual({
      id: expect.any(String),
      user_id: newNote.user_id,
      note_id: expect.any(String),
      name: newNote.tags[1],
    })
  })
})
