import { add as addVectors } from '../lib/vector'

// reducer handling the state if a single player
const player = (player = {}, action) => {
  switch (action.type) {
    case 'PLAYER_ROTATE':
      let { angle } = action
      return {
        ...player,
        orientation: player.orientation + angle
      }

    case 'PLAYER_ADD_MOMENTUM':
      let { momentum } = action
      return {
        // copy all the properties from the previous state
        ...player,
        // add momentum to the already existing one
        momentum: addVectors(player.momentum, momentum)
      }
  }
}

module.exports = player
