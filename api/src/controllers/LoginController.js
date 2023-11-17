const LoginCreateService = require("../services/LoginCreateService")
const UserRepository = require("../repositories/UserRepository")

class LoginController {
  async create(request, response) {
    const { email, password } = request.body

    const userRepository = new UserRepository()
    const loginCreateService = new LoginCreateService(userRepository)

    const { user, token } = await loginCreateService.execute({
      email,
      password,
    })

    return response.status(200).json({
      user,
      token,
    })
  }
}

module.exports = LoginController
