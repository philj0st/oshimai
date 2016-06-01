// TODO: refactor into 2 reducers player and players and then extract array slicing to a function
import vector from './vector'
import player from './player'

// import vector library or have actions and states sent to reducer? -> Dan the man sais different reducers can handle different part of the state tree and reducers can call other reducers within.
// https://egghead.io/lessons/javascript-redux-reducer-composition-with-arrays
// TODO: so no library import, refactor back to the vector reducer
const addVec = ( { x:x1, y:y1 }, { x:x2, y:y2 } ) => ({
  x: x1 + x2,
  y: y1 + y2
})

const multiplyVec = ( { x:x1, y:y1 }, { x:x2, y:y2 } ) => ({
  x: x1 * x2,
  y: y1 * y2
})

const vectorLength = ({ x, y }) => Math.sqrt(x * x + y * y)

const replaceItemAt = (array, index, object) => [
  // spread over the left part of the array
  ...array.slice(0, index),
  // place the new object in th middle
  object,
  // spread over the right part of the array
  ...array.slice(index +1)
]

const players = (players = [], action) => {
  let { playerIndex } = action
  switch (action.type) {
    case 'PLAYER_ADD':
      return [...players, action.player]

    // add players momentum to its position
    case 'PLAYERS_UPDATE':
    // TODO: check for collision in here filter if next state is not collioding. could also happen during rowing force application
    //return a new array with player who had their position and momentum added
      return players.map(p => {
        // adjust the momentum towards the direction the player is facing
        let directedMomentum = vector(p.momentum, {type: 'VECTOR_ROTATE_BY_DEG', angle: p.orientation})
        // add the momentum to the position
        let position = addVec(p.position, directedMomentum)
        // decrease the momentum over time
        let momentum = (vectorLength(p.momentum) > 0.1)? multiplyVec(p.momentum, {x:0.9, y: 0.9}) : {x:0, y:0}
        // TODO: decrease the angularMomentum over time
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
      let resultingMomentum = addVec(players[playerIndex].momentum, momentum)
      // get a new state of a position
      return [
        // spread over the left part of the array
        ...players.slice(0, playerIndex),
        // specify the new player Object
        {
          // copy all the properties from the previous state
          ...players[playerIndex],
          // then override the momentum
          momentum: resultingMomentum
        },
        // spread over the right part of the array
        ...players.slice(playerIndex +1)
      ]

    case 'PLAYER_ROTATE':
      // return a new array with the player at index's rotation handled by the player reducer
      return replaceItemAt(players, playerIndex, player(players[playerIndex], action))

    case 'PLAYER_REMOVE':
      return [
        ...players.slice(0, playerIndex),
        ...players.slice(playerIndex +1)
      ]
      break;
    default:
    return players
  }
}

module.exports = players
