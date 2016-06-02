// functional implementation of the victor.js functionality i need

// helper functions
const horizontalAngle = vector => Math.atan2(vector.y, vector.x)
const verticalAngle = vector => Math.atan2(vector.x, vector.y)

// alias for horizontalAngle
export const angle = vector => horizontalAngle(vector)

const degrees = 180 / Math.PI
const radian2degrees = rad => rad * degrees
const degrees2radian = deg => deg / degrees

// what a neat ES6 usage :)
export const length = ({ x, y }) => Math.sqrt(x * x + y * y)

/**
 * Rotates the vector to a certain angle, in radians CCW from +X axis.
 * @param {vector} vector The other vector
 * @param {angle} angle to rotate the vector
 */
const rotate = ({ x:x1, y:y1 }, angle) => {
  let x = x1 * Math.cos(angle) - y1 * Math.sin(angle)
  let y = x1 * Math.sin(angle) + y1 * Math.cos(angle)
  return {
    x,
    y
  }
}

const rotateBy = (vector, rotation) => {
  let angleRad = angle(vector) + rotation
  return rotate(vector, angleRad)
}

// call rotateBy with a converted rotation
export const rotateByDeg = (vector, rotation) => rotateBy(vector, degrees2radian(rotation))

export const add = ( { x:x1, y:y1 }, { x:x2, y:y2 } ) => ({
  x: x1 + x2,
  y: y1 + y2
})

export const divide = ( { x:x1, y:y1 }, { x:x2, y:y2 } ) => ({
  x: x1 / x2,
  y: y1 / y2
})

export const multiply = ( { x:x1, y:y1 }, { x:x2, y:y2 } ) => ({
  x: x1 * x2,
  y: y1 * y2
})

export const normalize = vector => {
  let vectorLength = length(vector)
  let { x:x1, y:y1 } = vector
  if (vectorLength === 0) {
    return {
      x: 1,
      y: 0
    }
  }else {
    return {
      x: x1 / length,
      y: y1 / length
    }
  }
}
