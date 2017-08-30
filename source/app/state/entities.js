// ----------------------------- CONSTANTS ----------------------------- //
import { SET_SEARCH_RESULTS_SUCCESS } from './search'

// ----------------------------- REDUCERS ----------------------------- //
const initialState = {
	assets: {}
}

const assets = (state, action) => {
	switch(action.type) {
		case SET_SEARCH_RESULTS_SUCCESS:
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