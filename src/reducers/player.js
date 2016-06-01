// reducer handling the state if a single player

const player = (player = [], action) => {
  switch (action.type) {
    case 'PLAYER_ROTATE':
      let { angle } = action
      let orientation = player.orientation + angle
      return {
        ...player,
        orientation
      }
  }
}

module.exports = player
