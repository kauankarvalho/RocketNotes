const LoginController = require("../controllers/loginController")
const { Router } = require("express")

const loginController = new LoginController()

const loginRouter = Router()

loginRouter.post("/", loginController.create)

module.exports = loginRouter
