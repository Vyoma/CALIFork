// REACT-REDUX
import { createStore, applyMiddleware } from 'redux'

// REDUCERS
import rootReducer from '../index.js'

// MIDDLEWARE
import thunkMiddleware from 'redux-thunk'
// import { browserHistory } from 'react-router'

// DEV TOOLS
import { loadState, saveState } from './localStorage'
import { createLogger } from 'redux-logger'
import throttle from 'lodash/throttle'

// DEV
const loggerMiddleware = createLogger(); 

export const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ))
  store.subscribe(throttle(() => {
    saveState(store.getState()); 
  }, 1000));
  
  return store; 
}