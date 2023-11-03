const ensureAuth = require("../middlewares/ensureAuth")
const uploadConfig = require("../configs/upload")
const { Router } = require("express")
const express = require("express")

const fileRouter = Router()

fileRouter.use("/", ensureAuth, express.static(uploadConfig.uploadsFolder))

module.exports = fileRouter
