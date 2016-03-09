'use strict'

const http = require('http')
const url = require('url')

function parseISO(ISOString) {
  const date = new Date(ISOString)

  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  }
}

function parseUNIX(ISOString) {
  const date = new Date(ISOString)

  return {
    unixtime: date.getTime()
  }
}

const server = http.createServer((request, response) => {
  if (request.method !== 'GET') {
    response.end('GET requests only')
    return
  }

  const urlObject = url.parse(request.url, true)
  const pathname = urlObject.pathname
  const query = urlObject.query
  let result

  if (pathname === '/api/parsetime' && query.iso) {
    result = parseISO(query.iso)
  } else if (pathname === '/api/unixtime' && query.iso) {
    result = parseUNIX(query.iso)
  }

  if (result) {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(result))
  } else {
    response.writeHead(404)
    response.end()
  }
})

const port = process.argv[2]
server.listen(port)
