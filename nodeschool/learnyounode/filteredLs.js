'use strict'

const fs = require('fs')
const path = require('path')

const dir = process.argv[2]
const ext = process.argv[3]

fs.readdir(dir, (err, list) => {
  list.forEach(filename => {
    if (path.extname(filename).slice(1) === ext) {
      console.log(filename)
    }
  })
})
