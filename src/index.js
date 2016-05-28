import expect from 'expect'
import createStore from './store'
import render from './render'
import combineReducers from './combineReducers'
import players from './reducers/players'
import position from './reducers/position'
import bullets from './reducers/bullets'


let rootReducer = combineReducers({
  players,
  bullets
})

var store = createStore(rootReducer)

const init = () => {
  // TODO: move to render.js ??
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')
  let size = { x: canvas.width, y: canvas.height}

  store.dispatch({
    type: 'PLAYER_ADD',
    player: {
      //default player
      size: {x : 20, y: 20},
      radius:10,
      // TODO: replace hardcoded CANVAS_SIZE
      position: {x: 150, y:300-40},
      score: 0
    }
  })

  let update = (state) => {
    //game logic like user input goes here
    //update all positions of bullets
    store.dispatch({
      type: 'UPDATE_BULLETS'
    })

    if (keyState['39']) {
      store.dispatch({
        type: 'PLAYER_MOVE',
        vector: {x:1, y:0},
        playerId: 0
      })
    }
    if (keyState['37']) {
      store.dispatch({
        type: 'PLAYER_MOVE',
        vector: {x:-1, y:0},
        playerId: 0
      })
    }
    //shoot on 'space' press
    if (keyState['32']) {
      let x = state.players[0].position.x
      let y = state.players[0].position.y - state.players[0].size.y/2
      store.dispatch({
        type: 'BULLET_ADD',
        bullet: {
          position: {x, y},
          velocity: {x:0, y:-1},
          size: {x:4, y:8},
          playerId: 0
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
