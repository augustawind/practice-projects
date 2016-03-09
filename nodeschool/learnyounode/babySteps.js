'use strict';

const numbers = process.argv.slice(2)

if (numbers.length) {
  const sum = numbers.reduce((result, n) => Number(result) + Number(n))
  console.log(sum)
}
