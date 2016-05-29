// have to use require here for the script to be called via node cli
var expect = require('expect')
var vector = require('../src/reducers/vector')

expect(
  vector({x: 20, y:30}, {type: 'VECTOR_ADD', vector: {x: 30, y:20}})
).toEqual({x: 50, y:50})

// make rotations in both directions
// TODO: fails .. adding PI/2 CW to [0/1] should result in [1/0]
expect(
  vector(vector({x:0, y:1}, {type:'VECTOR_ROTATE', angle: -Math.PI/4}), {type:'VECTOR_ROTATE', angle: -Math.PI/4})
).toEqual(vector({x:1, y:0}, {type:'VECTOR_ROTATE', angle: Math.PI/4}))

// persist length across rotations
const vectorLength = ({ x, y }) => Math.sqrt(x * x + y * y)
expect(
  vectorLength(vector({x:1, y:0}, {type:'VECTOR_ROTATE', angle: Math.PI/4}))
).toEqual(1)

console.log('vector reducer tests passed');
