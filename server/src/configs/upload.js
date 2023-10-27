const cripto = require("node:crypto")
const path = require("node:path")
const multer = require("multer")

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp")
const uploadsFolder = path.resolve(tmpFolder, "uploads")

const multerConfig = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = cripto.randomBytes(10).toString("hex")
      const fileName = fileHash

      return callback(null, fileName)
    },
  }),
}

module.exports = {
  tmpFolder,
  uploadsFolder,
  multerConfig,
}
