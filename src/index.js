import expect from 'expect'
import createStore from './store'
import render from './render'
import combineReducers from './combineReducers'
import player from './reducers/player'
import position from './reducers/position'
import enemies from './reducers/enemies'
import bullets from './reducers/bullets'


let rootReducer = combineReducers({
  player,
  enemies,
  bullets
})

var store = createStore(rootReducer)

const init = () => {
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')
  let size = { x: canvas.width, y: canvas.height}

  let update = (state) => {
    //game logic like user input goes here
    //update all positions of bullets
    store.dispatch({
      type: 'UPDATE_BULLETS'
    })

    if (keyState['39']) {
      store.dispatch({
        type: 'PLAYER_MOVE',
        vector: [1, 0]
      })
    }
    if (keyState['37']) {
      store.dispatch({
        type: 'PLAYER_MOVE',
        vector: [-1, 0]
      })
    }
    //shoot on 'space' press
    if (keyState['32']) {
      let x = state.player.position[0]
      let y = state.player.position[1] - state.player.size.y/2
      store.dispatch({
        type: 'ADD_BULLET',
        bullet: {
          position: [x,y],
          velocity: [0,-1],
          size: {x:4, y:8},
          origin: 'player'
        }
      })
    }

  }

  let tick = () => {
    let state = store.getState()
    update(state)
    render(ctx, state, size)
    requestAnimationFrame(tick)
  }

  var keyState = {};
  window.addEventListener('keydown', e => keyState[e.keyCode] = true)
  window.addEventListener('keyup', e => keyState[e.keyCode] = false)

  console.log('initialized')
  return {
    canvas,
    ctx,
    size,
    tick
  }
}

window.onload = ()=> {
  var game = init()
  //initial call to recursive tick function
  game.tick()
}
