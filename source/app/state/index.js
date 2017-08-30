// REACT-REDUX
import { combineReducers } from 'redux'

// REDUCERS
import assets from './assets'
import entities from './entities'
import search from './search'
import publish from './modules/publish'

const rootReducer = combineReducers({
	assets, 
	entities, 
	search, 
	publish,
})

export default rootReducer