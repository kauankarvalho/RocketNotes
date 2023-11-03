const { Router } = require("express")

const loginRouter = require("./login.router")
const userRouter = require("./user.router")
const fileRouter = require("./file.router")
const noteRouter = require("./note.router")
const tagRouter = require("./tag.router")

const routes = Router()

routes.use("/login", loginRouter)
routes.use("/user", userRouter)
routes.use("/file", fileRouter)
routes.use("/note", noteRouter)
routes.use("/tag", tagRouter)

module.exports = routes
