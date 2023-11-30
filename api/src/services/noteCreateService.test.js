const InMemoryNoteRepository = require("../repositories/InMemoryNoteRepository")
const InMemoryLinkRepository = require("../repositories/InMemoryLinkRepository")
const InMemoryTagRepository = require("../repositories/InMemoryTagRepository")
import { describe, beforeEach, test, expect } from "vitest"
const NoteCreateService = require("./NoteCreateService")
const ErrorResponse = require("../utils/ErrorResponse")
const crypto = require("node:crypto")

describe("NoteCreateService", () => {
  let inMemoryNoteRepository
  let inMemoryLinkRepository
  let inMemoryTagRepository

  let noteCreateService

  let userId

  beforeEach(() => {
    inMemoryNoteRepository = new InMemoryNoteRepository()
    inMemoryLinkRepository = new InMemoryLinkRepository()
    inMemoryTagRepository = new InMemoryTagRepository()

    noteCreateService = new NoteCreateService({
      noteRepository: inMemoryNoteRepository,
      linkRepository: inMemoryLinkRepository,
      tagRepository: inMemoryTagRepository,
    })

    userId = crypto.randomUUID()
  })

  test("should reject create note with mandatory fields blank", () => {
    expect(async () => {
      await noteCreateService.execute({
        user_id: userId,
        title: "",
        description: "",
        links: ["https://www.lipsum.com/"],
        tags: ["Lorem Ipsum", "Generator"],
      })
    }).rejects.toEqual(
      new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: ["title", "description"],
        message: "Por favor, complete os campos de título e descrição",
      }),
    )
  })

  test("should reject create note without at least one tag", () => {
    expect(async () => {
      await noteCreateService.execute({
        user_id: userId,
        title: "What is Lorem Ipsum?",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        links: ["https://www.lipsum.com"],
        tags: [],
      })
    }).rejects.toEqual(
      new ErrorResponse({
        statusCode: 400,
        status: "warning",
        field: "tags",
        message:
          "Por favor, certifique-se de incluir pelo menos um marcador em sua anotação",
      }),
    )
  })

  test("should create a note with associated links and tags", async () => {
    const newNote = {
      user_id: userId,
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
