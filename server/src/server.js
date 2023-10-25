require("express-async-errors")
const AppError = require("./utils/appError")
const express = require("express")
const routes = require("./routes")

const app = express()

app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      mensagem: error.mensagem,
    })
  }

  console.log(error)

  return response.status(500).json({
    status: "error",
    mensagem: "Internal Server Error",
  })
})

const port = 3000
app.listen(port, () => console.log(`Server ready at: http://localhost:${port}`))
