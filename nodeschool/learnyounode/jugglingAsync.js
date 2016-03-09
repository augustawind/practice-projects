'use strict'

const http = require('http')
const bl = require('bl')

const urls = process.argv.slice(2, 5)
const contents = []
let count = 0

urls.forEach((url, i) => {
  http.get(url, response => {
    response.pipe(bl((err, data) => {
      if (err)
        return console.error(err)

      contents[i] = data.toString()
      count++

      if (count === 3) {
        contents.forEach(string => {
          console.log(string)
        })
      }
    }))
  })
})
