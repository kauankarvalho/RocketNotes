const UserController = require("../controllers/userController")
const ensureAuth = require("../middlewares/ensureAuth")
const { Router } = require("express")

const userController = new UserController()

const userRouter = Router()

userRouter.post("/", userController.create)
userRouter.put("/", ensureAuth, userController.update)

module.exports = userRouter
