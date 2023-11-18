const crypto = require("node:crypto")

class InMemoryUserRepository {
  users = [
    {
      id: "5d006fea-072e-46fc-b275-68139c23a0d5",
      name: "Henry",
      email: "henry@email.com",
      password: "$2a$08$hiUvBe9tESYEj0.QuyChBOAwOio/AvoRTXjBxGmp4OS12uobAyTvy",
      avatar: null,
    },
    {
      id: "66db4215-9fe4-4ad9-8930-9cb482e81fb4",
      name: "James",
      email: "james@email.com",
      password: "$2a$08$4bAT3q38FcFFtQSBtNYOWeuZqi0nW3CdMjKU/8AJkOHQX9oR0DW0S",
      avatar: null,
    },
  ]

  async getUserById(id) {
    return this.users.find((user) => user.id === id)
  }

  async getUserByEmail(email) {
    return this.users.find((user) => user.email === email)
  }

  async create({ name, email, password, avatar }) {
    this.users = [
      {
        id: crypto.randomUUID(),
        name,
        email,
        password,
        avatar: null,
      },
      ...this.users,
    ]
  }

  async update({ id, name, email, password, avatar }) {
    const updatedUser = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name,
          email,
          password,
          avatar: null,
        }
      }
      return user
    })

    this.users = updatedUser
  }
}

module.exports = InMemoryUserRepository
