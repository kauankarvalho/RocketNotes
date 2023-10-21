const NoteController = require("../controllers/noteController")
const { Router } = require("express")

const noteController = new NoteController()

const noteRouter = Router()
noteRouter.get("/:id", noteController.show)
noteRouter.post("/:user", noteController.create)
noteRouter.delete("/:id", noteController.delete)

module.exports = noteRouter
