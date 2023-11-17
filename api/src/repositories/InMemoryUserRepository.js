const crypto = require("node:crypto")

class InMemoryUserRepository {
  users = [
    {
      id: "",
      name: "Henry",
      email: "henry@email.com",
      password: "$2a$08$hiUvBe9tESYEj0.QuyChBOAwOio/AvoRTXjBxGmp4OS12uobAyTvy",
      avatar: null,
    },
    {
      id: "",
      name: "James",
      email: "james@email.com",
      password: "",
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
        avatar,
      },
      ...this.users,
    ]

    console.log(this.users)
  }

  async update({ id, name, email, password, avatar }) {
    const updatedUser = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name,
          email,
          password,
          avatar,
        }
      }
      return user
    })

    this.users = updatedUser
  }
}

module.exports = InMemoryUserRepository
