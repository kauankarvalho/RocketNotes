const prisma = require("../database")

class TagController {
  async index(request, response) {
    const { user_id } = request.params

    const tags = await prisma.tag.findMany({
      where: {
        user_id,
      },
    })

    return response.status(200).json({
      tags,
    })
  }
}

module.exports = TagController
