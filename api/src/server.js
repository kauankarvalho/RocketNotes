require("express-async-errors")
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "Error",
      message: error.message,
    })
  }

  console.log(error)

  return response.status(500).json({
    status: "Error",
    message: "Internal Server Error",
  })
})

const port = 3000
app.listen(port, () => console.log(`Server ready at: http://localhost:${port}`))
