const DiskStorage = require("../providers/DiskStorage")

class UserAvatarUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ id, avatar }) {
    const diskStorage = new DiskStorage()

    const user = await this.userRepository.getUserById(id)

    const avatarExist = user.avatar
    if (avatarExist) {
      await diskStorage.deleteFile(user.avatar)
    }

    await diskStorage.saveFile(avatar)

    const updatedUser = await this.userRepository.update({ id, avatar })

    return updatedUser.avatar
  }
}

module.exports = UserAvatarUpdateService
