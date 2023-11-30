const InMemoryTagRepository = require("../repositories/InMemoryTagRepository")
const TagIndexService = require("./TagIndexService")
import { describe, test, expect } from "vitest"
const crypto = require("node:crypto")

describe("TagIndexService", () => {
  test("should retrieve user-specific tags", async () => {
    let inMemoryTagRepository = new InMemoryTagRepository()
    let tagIndexService = new TagIndexService(inMemoryTagRepository)

    const userId = crypto.randomUUID()

    inMemoryTagRepository.tags = [
      {
        id: crypto.randomUUID(),
        user_id: userId,
        note_id: crypto.randomUUID(),
        name: "HTML",
      },
      {
        id: crypto.randomUUID(),
        user_id: userId,
        note_id: crypto.randomUUID(),
        name: "CSS",
      },
    ]

    const tagsInDataBase = inMemoryTagRepository.tags.map((tag) => tag.name)
    const tags = await tagIndexService.execute(userId)

    expect(tags).toEqual(tagsInDataBase)
  })
})
