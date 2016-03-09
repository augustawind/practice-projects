'use strict'

const fs = require('fs')
const path = require('path')

function filteredLs(dir, ext, callback) {
  fs.readdir(dir, (err, list) => {
    if (err) {
      callback(err)
    } else {
      const data = list.filter(filename => {
        return path.extname(filename).slice(1) === ext
      })

      callback(null, data)
    }
  })
}

module.exports = filteredLs
