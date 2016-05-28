const combineReducers = (reducers) => {
  return (state = {}, action) => {
    // [player, player.position, enemies]
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action)
        return nextState
      }, {}
    )
  }
}

module.exports = combineReducers
