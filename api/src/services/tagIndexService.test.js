const InMemoryTagRepository = require("../repositories/InMemoryTagRepository")
import { describe, test, expect } from "vitest"
const TagIndexService = require("./TagIndexService")

describe("TagIndexService", () => {
  test("should retrieve user-specific tags", async () => {
    let inMemoryTagRepository = new InMemoryTagRepository()
    let tagIndexService = new TagIndexService(inMemoryTagRepository)

    const user_id = "5d006fea-072e-46fc-b275-68139c23a0d5"
    inMemoryTagRepository.tags = [
      {
        id: "17115fc2-ac8c-4524-b564-7c2f049f357d",
        user_id,
        note_id: "5033e76a-fb94-4067-b1b5-9921f28295d4",
        name: "Html",
      },
      {
        id: "8919d4ff-6acf-46f1-8e3d-9d4848eff3b2",
        user_id,
        note_id: "5033e76a-fb94-4067-b1b5-9921f28295d4",
        name: "CSS",
      },
    ]

    const tagsInDataBase = inMemoryTagRepository.tags.map((tag) => tag.name)
    const tags = await tagIndexService.execute(user_id)

    expect(tags).toEqual(tagsInDataBase)
  })
})
