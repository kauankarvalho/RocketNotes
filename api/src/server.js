require("express-async-errors")
const ResponseStatus = require("./utils/ResponseStatus")
const express = require("express")
const routes = require("./routes")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((info, request, response, next) => {
  if (info instanceof ResponseStatus) {
    return response.status(info.statusCode).json({
      status: info.status,
      message: info.message,
    })
  }

  console.log(info)

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  })
})

const port = 3000
app.listen(port, () => console.log(`Server ready at: http://localhost:${port}`))
