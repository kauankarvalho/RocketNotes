const NoteController = require("../controllers/noteController")
const ensureAuth = require("../middlewares/ensureAuth")
const { Router } = require("express")

const noteController = new NoteController()

const noteRouter = Router()

noteRouter.use(ensureAuth)

noteRouter.get("/", noteController.index)
noteRouter.get("/:id", noteController.show)
noteRouter.post("/", noteController.create)
noteRouter.delete("/:id", noteController.delete)

module.exports = noteRouter
