'use strict'

const net = require('net')

function pad(padding, string) {
  return ('0'.repeat(padding) + string).slice(-padding)
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = pad(2, date.getMonth() + 1)
  const day = pad(2, date.getDate())
  const hours = pad(2, date.getHours())
  const minutes = pad(2, date.getMinutes())

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const server = net.createServer(socket => {
  const now = formatDate(new Date())
  socket.end(now + '\n')
})

const port = process.argv[2]
server.listen(port)
