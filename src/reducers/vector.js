// functional implementation of the victor.js functionality i need

// helper functions
const horizontalAngle = vector => Math.atan2(vector.y, vector.x)
const verticalAngle = vector => Math.atan2(vector.x, vector.y)

const degrees = 180 / Math.PI
const radian2degrees = rad => rad * degrees
const degrees2radian = deg => deg / degrees

// what a neat ES6 usage :)
const vectorLength = ({ x, y }) => Math.sqrt(x * x + y * y)

const rotateVec = (vector, angle) => {
  // create variables for x and y of the old state
  let { x: xOld, y: yOld } = vector
  // calculate x, y for the new state
  let x = (xOld * Math.cos(angle)) - (yOld * Math.sin(angle))
  let y = (xOld * Math.sin(angle)) + (yOld * Math.cos(angle))
  return {
    x,
    y
  }
}

// actual reducer
const vector = (vector = {x:0, y:0}, action) => {
  switch (action.type) {
    case 'VECTOR_ADD':
    // TODO: should i destructure x and y from vector for all cases?
      return {
        x: vector.x + action.vector.x,
        y: vector.y + action.vector.y
      }

    // http://victorjs.org/#rotatebydeg
    // Rotates the vector by a rotation angle, given in degrees CCW from +X axis.
    // @param action.angle - angle in degrees
    case 'VECTOR_ROTATE_BY_DEG':
      let { angle } = action
      return rotateVec(vector, degrees2radian(angle))

    default:
      return vector
  }
}
module.exports = vector
