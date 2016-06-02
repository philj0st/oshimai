import expect from 'expect'
import createStore from './store'
import render from './render'
import combineReducers from './combineReducers'
import players from './reducers/players'
import bullets from './reducers/bullets'


let rootReducer = combineReducers({
  players,
  bullets
})

var store = createStore(rootReducer)

const setPlayerMomentum = (playerIndex, momentum) => {
  store.dispatch({
    type: 'PLAYER_ADD_MOMENTUM',
    momentum,
    playerIndex
  })
}

const playerRotate = (playerIndex, angle) => {
  store.dispatch({
    type: 'PLAYER_ROTATE',
    angle,
    playerIndex
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
      orientation: 0,
      // TODO: replace hardcoded CANVAS_SIZE
      position: {x: 20, y:150},
      momentum: {x:0, y:0},
      angularMomentum: 0,
      score: 0
    }
  })

  store.dispatch({
    type: 'PLAYER_ADD',
    player: {
      //default player
      radius:10,
      orientation: 0,
      // TODO: replace hardcoded CANVAS_SIZE
      position: {x: 120, y:300-40},
      momentum: {x:0, y:0},
      angularMomentum: 0,
      score: 0
    }
  })

  let update = (state) => {
    //game logic like user input goes here
    //update all positions of bullets
    store.dispatch({
      type: 'UPDATE_BULLETS'
    })
    store.dispatch({
      type: 'PLAYERS_UPDATE'
    })

    // move forward player 0
    if (keyState['38']) {
      setPlayerMomentum(0, {x:0, y:1})
    }
    // left and right for player 0
    if (keyState['39']) {
      // setPlayerMomentum(0, {x:-1, y:0})
      playerRotate(0,1)
    }
    if (keyState['37']) {
      // setPlayerMomentum(0, {x:1, y:0})
      playerRotate(0,-1)
    }
    if (keyState['68']) {
      setPlayerMomentum(1, {x:1, y:0})
    }
    if (keyState['65']) {
      setPlayerMomentum(1, {x:-1, y:0})
    }
    //shoot on 'space' press
    if (keyState['32']){
      // TODO: refactor: normalize vector first if players can have different momentum
      let { position, orientation } = state.players[0]
      
      store.dispatch({
        type: 'BULLET_ADD',
        bullet: {
          position,
          momentum,
          size: {x:4, y:8},
          playerIndex: 0
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
