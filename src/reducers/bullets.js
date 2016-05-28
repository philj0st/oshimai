import position from './position'

// TODO: hardcoded CANVAS_SIZE. got to find a good solution to share these constats between mpdules
const isWithinBoundries = position => position[0] >= 0 &&
                                      position[0] <= 300 &&
                                      position[1] >= 0 &&
                                      position[1] <= 300

const bullets = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BULLET':
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
