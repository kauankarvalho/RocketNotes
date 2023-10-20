const NoteController = require("../controllers/noteController")
const { Router } = require("express")

const noteController = new NoteController()

const noteRouter = Router()
noteRouter.post("/:user", noteController.create)

module.exports = noteRouter
