'use strict';

const fs = require('fs')

if (process.argv.length > 2) {
  const text = fs.readFileSync(process.argv[2], 'utf8')
  const nLines = text.split('\n').length - 1
  console.log(nLines)
}
