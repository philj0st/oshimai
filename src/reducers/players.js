import vector from './vector'

// import vector library or have actions and states sent to reducer?
const addVec = ( { x:x1, y:y1 }, { x:x2, y:y2 } ) => ({
  x: x1 + x2,
  y: y1 + y2
})

const multiplyVec = ( { x:x1, y:y1 }, { x:x2, y:y2 } ) => ({
  x: x1 * x2,
  y: y1 * y2
})

const vectorLength = ({ x, y }) => Math.sqrt(x * x + y * y)


const player = (state = [], action) => {
  switch (action.type) {
    case 'PLAYER_ADD':
      return [...state, action.player]

    // add players momentum to its position
    case 'PLAYERS_UPDATE':
    // TODO: check for collision in here filter if next state is not collioding. could also happen during rowing force application
    //return a new array with player who had their position and momentum added
      return state.map(p => {
        let position = addVec(p.position, p.momentum)
        let momentum = (vectorLength(p.momentum) > 0.1)? multiplyVec(p.momentum, {x:0.9, y: 0.9}) : {x:0, y:0}
        return {
          ...p,
          // add position and momentum vectors
          position,
          // then decrease momentum if its bigger than 0.1, else set it to [0,0]
          momentum
        }
      })

    case 'PLAYER_ADD_MOMENTUM':
      let { playerIndex, momentum } = action
      // add momentum to the already existing one
      let resultingMomentum = addVec(state[playerIndex].momentum, momentum)
      // get a new state of a position
      return [
        // spread over the left part of the array
        ...state.slice(0, playerIndex),
        // specify the new player Object
        {
          // copy all the properties from the previous state
          ...state[playerIndex],
          // then override the momentum
          momentum: resultingMomentum
        },
        // spread over the right part of the array
        ...state.slice(playerIndex +1)
      ]

    case 'PLAYER_REMOVE':
      return [
        ...state.slice(0, playerIndex),
        ...state.slice(playerIndex +1)
      ]
      break;
    default:
    return state
  }
}

module.exports = player
