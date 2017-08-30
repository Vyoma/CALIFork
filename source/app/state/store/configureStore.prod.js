// REACT-REDUX
import { createStore, applyMiddleware } from 'redux'

// REDUCER
import rootReducer from '../index.js'

// MIDDLEWARE
import thunkMiddleware from 'redux-thunk'

export const configureStore = (preloadedState) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunkMiddleware, routeMiddleware)
)