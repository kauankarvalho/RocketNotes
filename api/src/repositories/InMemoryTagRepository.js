const crypto = require("node:crypto")

class InMemoryTagRepository {
  tags = [
    {
      id: "e2410a74-9dd6-454b-a59a-90ed43e741c7",
      user_id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      note_id: "87f967c6-e17f-432a-90da-6f237d8f56b2",
      name: "React",
    },
    {
      id: "fb951393-8358-45e5-a2ef-e71da1debcc2",
      user_id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      note_id: "87f967c6-e17f-432a-90da-6f237d8f56b2",
      name: "Tailwindcss",
    },
    {
      id: "eafc8bd8-bdb4-4640-83af-13e90c3990d4",
      user_id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      note_id: "4e1105d2-050f-41ac-b78a-37df8a162b52",
      name: "Node",
    },
    {
      id: "00eb9a60-81a0-41dc-afdd-22d0b8a2bbf1",
      user_id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      note_id: "4e1105d2-050f-41ac-b78a-37df8a162b52",
      name: "JWT",
    },
  ]

  async getTagsByUserId(user_id) {
    return this.tags.filter((tag) => tag.user_id === user_id)
  }

  async create({ user_id, note_id, name }) {
    this.tags = [
      {
        id: crypto.randomUUID(),
        user_id,
        note_id,
        name,
      },
      ...this.tags,
    ]
  }
}

module.exports = InMemoryTagRepository
