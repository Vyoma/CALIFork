// REACT-REDUX
import { combineReducers } from 'redux'

// REDUCERS
import assets from './modules/assets'
import search from './modules/search'
import publish from './modules/publish'
import entities from './modules/entities'

const rootReducer = combineReducers({
	assets, 
	entities, 
	search, 
	publish,
})

export default rootReducer