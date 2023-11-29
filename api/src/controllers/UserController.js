const UserCreateService = require("../services/UserCreateService")
const UserUpdateService = require("../services/UserUpdateService")
const UserDeleteService = require("../services/UserDeleteService")
const UserRepository = require("../repositories/UserRepository")

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute({ name, email, password })

    return response.status(201).json({
      status: "success",
      message: "Conta criada com sucesso",
    })
  }

  async update(request, response) {
    const { name, email, password, newPassword } = request.body
    const { id } = request.user

    const userRepository = new UserRepository()
    const userUpdateService = new UserUpdateService(userRepository)

    await userUpdateService.execute({
      id,
      name,
      email,
      password,
      newPassword,
    })

    return response.status(200).json({
      status: "success",
      message: "As informações da conta foram atualizadas com sucesso",
    })
  }

  async delete(request, response) {
    const { password } = request.body
    const { id } = request.user

    const userRepository = new UserRepository()
    const userDeleteService = new UserDeleteService(userRepository)

    await userDeleteService.execute({ id, password })

    return response.status(200).json({
      status: "success",
      message: "Conta excluida com sucesso",
    })
  }
}

module.exports = UserController
