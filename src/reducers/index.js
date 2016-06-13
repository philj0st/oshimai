import { combineReducers } from 'redux'
import players from './players'
import bullets from './bullets'

var rootReducer = combineReducers({
  players,
  bullets
})

export default rootReducer
