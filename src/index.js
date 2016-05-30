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

const movePlayer = (playerId, vector) => {
  store.dispatch({
    type: 'PLAYER_MOVE',
    vector,
    playerId
  })
}

const init = () => {
  // TODO: move to render.js ??
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')
  let size = { x: canvas.width, y: canvas.height}

  store.dispatch({
    type: 'PLAYER_ADD',
    player: {
      //default player
      radius:10,
      rotation: 0,
      // TODO: replace hardcoded CANVAS_SIZE
      position: {x: 20, y:150},
      score: 0
    }
  })
  store.dispatch({
    type: 'PLAYER_ADD',
    player: {
      //default player
      radius:10,
      rotation: 0,
      // TODO: replace hardcoded CANVAS_SIZE
      position: {x: 120, y:300-40},
      score: 0
    }
  })

  let update = (state) => {
    //game logic like user input goes here
    //update all positions of bullets
    store.dispatch({
      type: 'UPDATE_BULLETS'
    })
    // left and right for player 0
    if (keyState['39']) {
      movePlayer(0, {x:1, y:0})
    }
    if (keyState['37']) {
      movePlayer(0, {x:-1, y:0})
    }
    if (keyState['68']) {
      movePlayer(1, {x:1, y:0})
    }
    if (keyState['65']) {
      movePlayer(1, {x:-1, y:0})
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
  window.addEventListener('keydown', e => console.log(e.keyCode))

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
