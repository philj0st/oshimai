// have to use require here for the script to be called via node cli
var expect = require('expect')
var vector = require('../src/reducers/vector')

expect(
  vector({x: 20, y:30}, {type: 'VECTOR_ADD', vector: {x: 30, y:20}})
).toEqual({x: 50, y:50})

console.log('vector reducer tests passed');
