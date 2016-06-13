import { add as addVectors } from '../lib/vector'

// TODO: hardcoded CANVAS_SIZE. got to find a good solution to share these constats between mpdules
const isWithinBoundries = position => position.x >= 0 &&
                                      position.x <= 300 &&
                                      position.y >= 0 &&
                                      position.y <= 300

const bullets = (bullets = [], action) => {
  switch (action.type) {
    case 'BULLET_ADD':
      return [...bullets, action.bullet]
      // return bullets
    case 'UPDATE_BULLETS':
      return bullets
      //only return bullets which havent left the canvas
      .filter(b => isWithinBoundries(b.position))
      //add their position and momentum
      .map(b => ({
          ...b,
          // add position and momentum vectors
          position: addVectors(b.position, b.momentum)
        }))
    default:
    return bullets
  }
}

module.exports = bullets
