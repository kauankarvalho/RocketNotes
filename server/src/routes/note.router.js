const NoteController = require("../controllers/noteController")
const { Router } = require("express")

const noteController = new NoteController()

const noteRouter = Router()

noteRouter.get("/:user_id", noteController.index)
noteRouter.get("/:id", noteController.show)
noteRouter.post("/:user_id", noteController.create)
noteRouter.delete("/:id", noteController.delete)

module.exports = noteRouter
