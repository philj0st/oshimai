// reducer handling the state if a single player

// TODO: decide on vector reducer or lib
const addVec = ( { x:x1, y:y1 }, { x:x2, y:y2 } ) => ({
  x: x1 + x2,
  y: y1 + y2
})

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
        momentum: addVec(player.momentum, momentum)
      }
  }
}

module.exports = player
