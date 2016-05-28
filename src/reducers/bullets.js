import position from './position'

// TODO: hardcoded CANVAS_SIZE. got to find a good solution to share these constats between mpdules
const isWithinBoundries = position => position.x >= 0 &&
                                      position.x <= 300 &&
                                      position.y >= 0 &&
                                      position.y <= 300

const bullets = (state = [], action) => {
  switch (action.type) {
    case 'BULLET_ADD':
      return [...state, action.bullet]
    case 'UPDATE_BULLETS':
      return state
      //only return bullets which havent left the canvas
      .filter(b => isWithinBoundries(b.position))
      //add their position and velocity
      .map(b => {
        let positionAction = {
          type: 'POSITION_ADD',
          vector: b.velocity
        }
        return {
          ...b,
          // add position and velocity vectors
          position: position(b.position, positionAction)
        }
      })
    default:
    return state
  }
}

module.exports = bullets
