// ----------------------------- CONSTANTS ----------------------------- //
import { SET_SEARCH_RESULTS_SUCCESS } from './search'
import { GET_ALL_ASSETS_SUCCESS, GET_ASSET_SUCCESS } from './assets'
// ----------------------------- REDUCERS ----------------------------- //
const initialState = {
	assets: {}
}

const assets = (state, action) => {
	switch(action.type) {
		case GET_ALL_ASSETS_SUCCESS: 
		case SET_SEARCH_RESULTS_SUCCESS:
		case GET_ASSET_SUCCESS: 
			return {
				...state, 
				...action.entities
			}
		default: 
			return state; 
	}
}

const entities = ( state = initialState, action) => {
	switch (action.type) {
		case GET_ASSET_SUCCESS:
		case GET_ALL_ASSETS_SUCCESS: 
		case SET_SEARCH_RESULTS_SUCCESS:
			return {
			  ...state, 
			  assets: assets(state.assets, action)
			}
		default: 
			return state; 
	}
}

export default entities