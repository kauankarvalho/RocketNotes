const { Router } = require("express")

const loginRouter = require("./loginRouter")
const userRouter = require("./userRouter")
const fileRouter = require("./fileRouter")
const noteRouter = require("./noteRouter")
const tagRouter = require("./tagRouter")

const routes = Router()

routes.use("/login", loginRouter)
routes.use("/user", userRouter)
routes.use("/file", fileRouter)
routes.use("/note", noteRouter)
routes.use("/tag", tagRouter)

module.exports = routes
