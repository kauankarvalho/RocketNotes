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

    const avatarExists = user.avatar

    if (avatarExists) {
      await diskStorage.deleteFile(user.avatar)
    }

    await diskStorage.saveFile(avatar)

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar,
      },
    })

    return reponse.status(200).json()
  }
}

module.exports = UserAvatarController
