const InMemoryTagRepository = require("../repositories/InMemoryTagRepository")
const TagIndexService = require("./TagIndexService")
import { test, expect } from "vitest"
const crypto = require("node:crypto")

test("should retrieve user-specific tags", async () => {
  let inMemoryTagRepository = new InMemoryTagRepository()
  let tagIndexService = new TagIndexService(inMemoryTagRepository)

  const user_id = crypto.randomUUID()
  inMemoryTagRepository.tags = [
    {
      id: crypto.randomUUID(),
      user_id,
      note_id: crypto.randomUUID(),
      name: "Html",
    },
    {
      id: crypto.randomUUID(),
      user_id,
      note_id: crypto.randomUUID(),
      name: "CSS",
    },
  ]

  const tagsInDataBase = inMemoryTagRepository.tags.map((tag) => tag.name)
  const tags = await tagIndexService.execute(user_id)

  expect(tags).toEqual(tagsInDataBase)
})
