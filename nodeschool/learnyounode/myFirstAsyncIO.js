'use strict';

const fs = require('fs')

if (process.argv.length > 2) {
  fs.readFile(process.argv[2], 'utf8', (err, data) => {
    const nLines = data.split('\n').length - 1
    console.log(nLines)
  })
}
