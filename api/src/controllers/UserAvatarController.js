const DiskStorage = require("../providers/DiskStorage")
const prisma = require("../database")

class UserAvatarController {
  async update(request, reponse) {
    const avatar = request.file.filename
    const { id } = request.user

    const diskStorage = new DiskStorage()

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    const avatarExist = user.avatar
    if (avatarExist) {
      await diskStorage.deleteFile(user.avatar)
    }

    await diskStorage.saveFile(avatar)

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar,
      },
    })

    return reponse.status(200).json({
      avatar: updatedUser.avatar,
    })
  }
}

module.exports = UserAvatarController
