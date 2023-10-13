const express = require("express")
const app = express()

const port = 3000
const server = app.listen(port, () =>
  console.log(`Server ready at: http://localhost:${port}`),
)
