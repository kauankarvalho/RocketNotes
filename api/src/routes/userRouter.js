const UserAvatarController = require("../controllers/UserAvatarController")
const UserController = require("../controllers/UserController")
const ensureAuth = require("../middlewares/ensureAuth")
const uploadConfig = require("../configs/upload")
const { Router } = require("express")
const multer = require("multer")

const userController = new UserController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.multerConfig)

const userRouter = Router()

userRouter.post("/", userController.create)
userRouter.put("/", ensureAuth, userController.update)
userRouter.patch(
  "/avatar",
  ensureAuth,
  upload.single("avatar"),
  userAvatarController.update,
)
userRouter.delete("/", ensureAuth, userController.delete)

module.exports = userRouter
