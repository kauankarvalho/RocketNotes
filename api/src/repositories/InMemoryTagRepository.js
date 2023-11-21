const crypto = require("node:crypto")

class InMemoryTagRepository {
  tags = []

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
