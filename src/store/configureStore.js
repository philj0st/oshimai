import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'

import rootReducer from '../reducers'

const enhancer = compose(
  window.devToolsExtension && window.devToolsExtension(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }
  return store
}
