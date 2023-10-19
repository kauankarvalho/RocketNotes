const { Router } = require("express")

const userRouter = require("./user.router")

const routes = Router()
routes.use("/user", userRouter)

module.exports = routes
