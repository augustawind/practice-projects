const express = require('express')

const app = express()

app.get('/home', (request, response) => {
  response.end('Hello World!')
})

const port = process.argv[2]
app.listen(port)
