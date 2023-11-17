const UserAvatarUpdateService = require("../services/UserAvatarUpdateService")
const UserRepository = require("../repositories/UserRepository")

class UserAvatarController {
  async update(request, reponse) {
    const avatar = request.file.filename
    const { id } = request.user

    const userRepository = new UserRepository()
    const userAvatarUpdateService = new UserAvatarUpdateService(userRepository)

    const updatedAvatar = await userAvatarUpdateService.execute({ id, avatar })

    return reponse.status(200).json({
      avatar: updatedAvatar,
    })
  }
}

module.exports = UserAvatarController
