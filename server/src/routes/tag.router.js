const TagController = require("../controllers/tagController")
const { Router } = require("express")

const tagController = new TagController()

const tagRouter = Router()

tagRouter.get("/:user_id", tagController.index)

module.exports = tagRouter
