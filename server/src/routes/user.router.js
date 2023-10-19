const UserController = require("../controllers/userController")
const { Router } = require("express")

const userController = new UserController()

const userRouter = Router()
userRouter.post("/", userController.create)

module.exports = userRouter
