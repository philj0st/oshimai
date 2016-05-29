import position from './position'

const player = (state = [], action) => {
  switch (action.type) {
    case 'PLAYER_ADD':
      return [...state, action.player]

    case 'PLAYER_MOVE':
    // TODO: check for collision in here and only move if next state is not collioding. could also happen during rowing force application
      let { playerId } = action
      // get a new state of a position
      let newPosition = position(state[playerId].position, {
        type: 'POSITION_ADD',
        vector: action.vector
      })
      return [
        // spread over the left part of the array
        ...state.slice(0, playerId),
        // specify the new player Object
        {
          // copy all the properties from the previous state
          ...state[playerId],
          // then override the position with the the new state of the position
          position: newPosition
        },
        // spread over the right part of the array
        ...state.slice(playerId +1)
      ]

    case 'PLAYER_REMOVE':
      return [
        ...state.slice(0, playerId),
        ...state.slice(playerId +1)
      ]
      break;
    default:
    return state
  }
}

module.exports = player
