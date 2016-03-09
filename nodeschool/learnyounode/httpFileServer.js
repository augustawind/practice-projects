'use strict'

const fs = require('fs')
const http = require('http')

const filePath = process.argv[3]

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'content-type': 'text/plain' })
  const source = fs.createReadStream(filePath)
  source.pipe(response)
})

const port = process.argv[2]
server.listen(port)
