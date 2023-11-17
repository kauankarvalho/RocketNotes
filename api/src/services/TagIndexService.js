class TagIndexService {
  constructor(tagRepository) {
    this.tagRepository = tagRepository
  }

  async execute(user_id) {
    let tags = await this.tagRepository.getTagsByUserId(user_id)
    tags = tags.map((tag) => tag.name)

    return tags
  }
}

module.exports = TagIndexService
