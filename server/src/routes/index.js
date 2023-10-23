const { Router } = require("express")

const userRouter = require("./user.router")
const noteRouter = require("./note.router")

const routes = Router()

routes.use("/user", userRouter)
routes.use("/note", noteRouter)

module.exports = routes
