const LoginController = require("../controllers/LoginController")
const { Router } = require("express")

const loginController = new LoginController()

const loginRouter = Router()

loginRouter.post("/", loginController.create)

module.exports = loginRouter
