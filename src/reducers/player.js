import position from './position'

const player = (state = {
  //default player
  size: {x : 20, y: 20},
  // TODO: replace hardcoded CANVAS_SIZE
  position: [150,300-40],
  score: 0
}, action) => {
  switch (action.type) {
    case 'PLAYER_MOVE':
      // return Object.assign({}, state, {
      //   //call positionReducer with a adjusted scope of state
      //   position: position(state.position, action)
      // })
      return {
        ...state,
        position: position(state.position, {
          ...action,
          type: 'POSITION_ADD'
        })
      }
    default:
    return state
  }
}

module.exports = player
