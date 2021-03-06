import { createStore, compose } from 'redux'
import { persistState } from 'redux-devtools'
import configureStore from './store/configureStore'
import render from './render'
import players from './reducers/players'
import bullets from './reducers/bullets'
import { normalize as normaizeVector, rotateByDeg as rotateVectorByDeg } from './lib/vector'



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

var store

const init = () => {
  // TODO: move to render.js ??
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')
  let size = { x: canvas.width, y: canvas.height}

  // initial State defined upon store creation
  store = configureStore({
    players: [{
      radius:10,
      orientation: -90,
      position: {x: 20, y:150},
      momentum: {x:0, y:0},
      angularMomentum: 0,
      score: 0
    },{
      radius:10,
      orientation: 90,
      position: {x: 120, y:300-40},
      momentum: {x:0, y:0},
      angularMomentum: 0,
      score: 0
    }]
  })

  let update = (state) => {
    //game logic like user input goes here

    //if there are bullets update all positions of bullets
    if (state.bullets.length) {
      store.dispatch({
        type: 'UPDATE_BULLETS'
      })
    }
    // only update players if any of them has momentum
    if (state.players.filter(p => p.momentum.x || p.momentum.y).length) {
      store.dispatch({
        type: 'PLAYERS_UPDATE'
      })
    }

    // TODO: fix player movement
    // move forward player 0
    if (keyState['38']) {
      setPlayerMomentum(0, {x:0, y:1})
    }
    if (keyState['87']) {
      setPlayerMomentum(1, {x:0, y:1})
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
      playerRotate(1,1)
    }
    if (keyState['65']) {
      playerRotate(1,-1)
    }
    //shoot on 'space' press
    if (keyState['32']){
      // TODO: refactor: normalize vector first if players can have different momentum
      let { position, orientation, momentum } = state.players[0]

      store.dispatch({
        type: 'BULLET_ADD',
        bullet: {
          position,
          momentum: rotateVectorByDeg({x:0,y:1}, orientation),
          size: {x:4, y:8},
          playerIndex: 0
        }
      })
    }
    //shoot on 'space' press
    if (keyState['83']){
      // TODO: refactor: normalize vector first if players can have different momentum
      let { position, orientation, momentum } = state.players[1]

      store.dispatch({
        type: 'BULLET_ADD',
        bullet: {
          position,
          momentum: rotateVectorByDeg({x:0,y:1}, orientation),
          size: {x:4, y:8},
          playerIndex: 0
        }
      })
    }
  }
  // game loop
  let tick = () => {
    let state = store.getState()
    update(state)
    if (frameCount++ < 300) {
    }else {
    }
    render(ctx, state, size)
    requestAnimationFrame(tick)
  }
  var frameCount = 0
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
