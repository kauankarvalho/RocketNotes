const { Router } = require("express")

const userRouter = require("./user.router")
const noteRouter = require("./note.router")
const tagRouter = require("./tag.router")

const routes = Router()

routes.use("/user", userRouter)
routes.use("/note", noteRouter)
routes.use("/tag", tagRouter)

module.exports = routes
