require("dotenv/config")
require("express-async-errors")
const ErrorResponse = require("./utils/ErrorResponse")
const express = require("express")
const routes = require("./routes")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof ErrorResponse) {
    return response.status(error.statusCode).json({
      status: error.status,
      field: error.field,
      message: error.message,
    })
  }

  console.log(error)

  return response.status(500).json({
    status: "error",
    message: "Erro Interno de Servidor",
  })
})

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => console.log(`Server ready on port: ${port}`))
