const crypto = require("node:crypto")

class InMemoryUserRepository {
  users = []

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
