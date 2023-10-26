const prisma = require("../database")

class TagController {
  async index(request, response) {
    const { user_id } = request.params

    let tags = await prisma.tag.findMany({
      where: {
        user_id,
      },
      select: {
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    })

    tags = tags.map((tag) => tag.name)

    return response.status(200).json({
      tags,
    })
  }
}

module.exports = TagController
