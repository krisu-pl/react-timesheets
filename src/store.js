import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'

import rootReducer from './reducers/index'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

const store = createStore(
  rootReducer, composeEnhancers(applyMiddleware(reduxThunk)),
)

export default store
