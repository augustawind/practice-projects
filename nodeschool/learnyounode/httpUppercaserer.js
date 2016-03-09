'use strict'

const http = require('http')
const mapStream = require('through2-map')

const server = http.createServer((request, response) => {
  if (request.method !== 'POST') {
    response.end('POST requests only')
    return
  }

  request
    .pipe(mapStream(chunk => chunk.toString().toUpperCase()))
    .pipe(response)
})

const port = process.argv[2]
server.listen(port)
