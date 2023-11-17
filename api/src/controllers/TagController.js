const TagRepository = require("../repositories/TagRepository")
const TagIndexService = require("../services/TagIndexService")

class TagController {
  async index(request, response) {
    const { id: user_id } = request.user

    const tagRepository = new TagRepository()
    const tagIndexService = new TagIndexService(tagRepository)

    const tags = await tagIndexService.execute(user_id)

    return response.status(200).json({
      tags,
    })
  }
}

module.exports = TagController
