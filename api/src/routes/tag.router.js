const TagController = require("../controllers/tagController")
const ensureAuth = require("../middlewares/ensureAuth")
const { Router } = require("express")

const tagController = new TagController()

const tagRouter = Router()

tagRouter.get("/", ensureAuth, tagController.index)

module.exports = tagRouter
