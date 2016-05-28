//reducer to change position
const position = (state = {x: 0, y: 0}, action) => {
  switch (action.type) {
    case 'POSITION_ADD':
      return {
        x: state.x + action.vector.x,
        y: state.y + action.vector.y
      }
    default:
    return state
  }
}

module.exports = position
