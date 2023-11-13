const uploadConfig = require("../configs/upload")
const { Router } = require("express")
const express = require("express")

const fileRouter = Router()

fileRouter.use("/", express.static(uploadConfig.uploadsFolder))

module.exports = fileRouter
