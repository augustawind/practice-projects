const filteredLs = require('./filteredLsModular.js')

const dir = process.argv[2]
const ext = process.argv[3]

filteredLs(dir, ext, (err, list) => {
  if (err) {
    console.error('There was an error: ', err)
    return
  }

  list.forEach(filename => {
    console.log(filename)
  })
})
