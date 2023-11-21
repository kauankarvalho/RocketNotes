const crypto = require("node:crypto")

class InMemoryLinkRepository {
  links = []

  async create({ user_id, note_id, url }) {
    this.links = [
      {
        id: crypto.randomUUID(),
        user_id,
        note_id,
        url,
      },
      ...this.links,
    ]
  }
}

module.exports = InMemoryLinkRepository
