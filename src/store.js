//the reducer defines how state is updated with actions
const createStore = (reducer) => {
  let state
  let listeners = []
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    console.log('action', action)
    console.log('state', state)
    //call each listener the store has updated
    listeners.forEach(listener => listener())
  }
  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      //return a function that rePLAYER_MOVEs that listener from the array
      listeners = listeners.filter(l => l !== listener)
    }
  }

  dispatch({})

  return { getState, dispatch, subscribe }
}

module.exports = createStore
