const crypto = require("node:crypto")

class InMemoryLinkRepository {
  links = [
    {
      id: "c54d2e39-d410-4ece-9bd1-974c94860a71",
      user_id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      note_id: "87f967c6-e17f-432a-90da-6f237d8f56b2",
      url: "https://react.dev",
    },
    {
      id: "a997a2e6-cbd2-4339-b621-47ffd0a2ec04",
      user_id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      note_id: "87f967c6-e17f-432a-90da-6f237d8f56b2",
      url: "https://tailwindcss.com",
    },
    {
      id: "ec0c014b-ade4-45c4-bb63-17e54c7748aa",
      user_id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      note_id: "4e1105d2-050f-41ac-b78a-37df8a162b52",
      url: "https://nodejs.org",
    },
    {
      id: "63941cf0-4229-4bc5-aa5d-8e49f6fb9823",
      user_id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      note_id: "4e1105d2-050f-41ac-b78a-37df8a162b52",
      url: "https://jwt.io",
    },
  ]

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
