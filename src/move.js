var expect = require('expect')
var createStore = require('./store');
var combineReducers = require('./combineReducers');

//reducer to change somethings position
//return the initial state of the game/position (state default value)
const positionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PLAYER_MOVE':
    //return a new state array with the objects to the to-be-mutated object, the mutated object itself and the objects after the mutated one
      return [
        ...state.slice(0, action.index),
        //create a new object containing all the properties from the previous state's object
        Object.assign({}, state[action.index], {
          // but change the position
          position : [
            state[action.index].position[0] + action.vec[0],
            state[action.index].position[1] + action.vec[1]
          ]
        }),
        ...state.slice(action.index + 1)
      ]
      break;
    default:
    return state
  }
}

// var gameObjects = createStore(positionReducer)

const testPLAYER_MOVE = () => {
  const stateBefore = [
    {
      name: 'player',
      sprite: 'url',
      position: [10,10]
    }
  ]
  const action = {
    type: 'PLAYER_MOVE',
    index: 0,
    vec: [10,-5]
  }
  const stateAfter = [
    {
      name: 'player',
      sprite: 'url',
      position: [20,5]
    }
  ]
  expect(
    positionReducer(stateBefore, action)
  ).toEqual(stateAfter)
}

testPLAYER_MOVE()
console.log('tests successful');
