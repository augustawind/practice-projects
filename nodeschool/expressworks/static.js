const express = require('express')

const app = express()

const port = process.argv[2]
const filepath = process.argv[3]

app.use(express.static(filepath))

app.listen(port)
