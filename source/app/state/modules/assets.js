// SERVICES
import { mongoGetAll, mongoGet } from '../services/mongo'

// ----------------------------- CONSTANTS ----------------------------- //
export const GET_ASSET_SUCCESS = 'GET_ASSET_SUCCESS'
export const GET_ASSET_REQUEST = 'GET_ASSET_REQUEST'
export const GET_ASSET_FAILURE = 'GET_ASSET_FAILURE'
export const GET_ALL_ASSETS_SUCCESS = 'GET_ALL_ASSETS_SUCCESS'
export const GET_ALL_ASSETS_REQUEST = 'GET_ALL_ASSETS_REQUEST'
export const GET_ALL_ASSETS_FAILURE = 'GET_ALL_ASSETS_FAILURE'
export const ADD_ASSET_FILTER = 'ADD_ASSET_FILTER'
export const REMOVE_ASSET_FILTER = 'REMOVE_ASSET_FILTER'
export const REMOVE_ALL_ASSET_FILTERS = 'REMOVE_ALL_ASSET_FILTERS'
export const SELECT_ASSET = 'SELECT_ASSET'

import { SET_SEARCH_RESULTS_SUCCESS } from './search'
import { PUBLISH_ASSET_SUCCESS } from './publish'

// ----------------------------- REDUCERS ----------------------------- //
const initialState = {
	items: [],
	isFetching: false, 
	// SELECTED 
	selectedAsset: null, 
	selectedAssetObject: null, 
	fetchingAsset: false,
	assetFilters: [],
	// HANDLE PUBLISHING FLOW => MONGO RETRIEVAL IS TOO SLOW 
	publishedAssetID: null, 
	publishedAssetObject: null, 

	// TODO: CONFIRM DELETE
	clearAssets: false,  // -> Nav to home will trigger new fetch
	loadingAssets: false, // -> Overlaps with fetching asset 
	fetchedAssetObject: null, // -> Implement getSelectedAssetObject selector
}

const assets = ( state = initialState, action) => {
	switch (action.type) {
		case ADD_ASSET_FILTER: 
			return {
				...state, 
				assetFilters: [
					...state.assetFilters, 
					action.filterValue 
				]
			}
		case REMOVE_ASSET_FILTER: 
			return {
				...state, 
				assetFilters: state.assetFilters.filter((val) => val !== action.filterValue) 
			}
		case REMOVE_ALL_ASSET_FILTERS: 
			return {
				...state, 
				assetFilters: [] 
			}
		case GET_ALL_ASSETS_REQUEST: {
			return {
				...state, 
				isFetching: true, 
			}
		}
		case GET_ALL_ASSETS_SUCCESS: 
		case SET_SEARCH_RESULTS_SUCCESS: {
			return {
				...state,
				items: action.items,
				clearAssets: false,
				isFetching: false, 
			}
		}
		case SELECT_ASSET: 
		case GET_ASSET_REQUEST:
			return {
				...state, 
				selectedAsset: action.assetID, 
				isFetching: true, 
			}
		case GET_ASSET_SUCCESS:
			return {
				...state, 
				items: [
					...state.items, 
					...action.items
				]
			}
		case PUBLISH_ASSET_SUCCESS: 
			return {
				...state, 
				publishedAssetID: action.assetID, 
				publishedAssetObject: action.assetObject,
				items: [
					...state.items, 
					action.assetID
				], 
			}
		default: 
			return state; 
	}
}

export default assets


// ----------------------------- ACTION CREATORS ----------------------------- //
export const addAssetFilter = (filterValue) => {
	return {
		type: ADD_ASSET_FILTER, 
		filterValue, 
	}
}

export const removeAssetFilter = (filterValue) => {
	return {
		type: REMOVE_ASSET_FILTER, 
		filterValue, 
	}
}

export const removeAllFilters = () => {
	return {
		type: REMOVE_ALL_ASSET_FILTERS,
	}
}

export const getAssetRequest = (assetID) => {
	return {
		type: GET_ASSET_REQUEST, 
		assetID, 
	}
}

export const getAssetSuccess = (items, entities) => {
	return {
		type: GET_ASSET_SUCCESS,
		items,
		entities
	}
}

export const getAssetFailure = (error) => {
	return {
		type: GET_ASSET_FAILURE,
		error
	}
}

export const getAssetThunk = (assetID) => {
	return (dispatch) => {
		dispatch(getAssetRequest(assetID)); 
		return mongoGet(assetID)
		.then((asset) => {
			let items = [asset.assetID]; 
			let entities = {}; 
			entities[asset.assetID] = asset; 
			dispatch(getAssetSuccess(items, entities)); 
		}).catch((err) => {
			console.log(`ERROR: ${err}`); 
			dispatch(getAssetFailure(err)); 
		})
	}
}


export const getAllAssetsRequest = () => {
	return {
		type: GET_ALL_ASSETS_REQUEST, 
	}
}

export const getAllAssetsSuccess = (items, entities) => {
	return {
		type: GET_ALL_ASSETS_SUCCESS,
		items,
		entities, 
	}
}

export const getAllAssetsFailure = (error) => {
	return {
		type: GET_ALL_ASSETS_FAILURE,
		error
	}
}

export const resetHomeThunk = (ownProps) => {
	return (dispatch, getState) => {
		const state = getState();
		const searchResults = state.search.searchResults; 
		const assetEntities = Object.keys(state.entities.assests); 
		if (searchResults.length !== assetEntities.length) {
			console.log('FIRING RESET HOME')
			dispatch(getAllAssetsThunk()); 
		}
	}
}

export const getAllAssetsThunk = () => {
	return (dispatch) => {
		dispatch(getAllAssetsRequest()); 
		return mongoGetAll()
		.then((assets) => {
			let items = []; 
			let entities = {}; 
			assets.forEach((asset) => {
				entities[`${asset.assetID}`] = asset; 
				items.push(asset.assetID); 
			})
			dispatch(getAllAssetsSuccess(items, entities)); 
		}).catch((err) => {
			console.log(`ERROR: ${err}`); 
			dispatch(getAllAssetsFailure(err)); 
		})
	}
}

const shouldGetAllAssets = (assetState) => {
	console.log('asset state'); 
	console.log('isFetching', assetState.isFetching); 
	console.log('items.length', assetState.items.length); 

	if (assetState.isFetching) {
		return false; 
	} else if (assetState.items.length > 1) {
		return false; 
	} else {
		return true; 
	}
}

export const getAllAssetsConditionalThunk = () => {
	return (dispatch, getState) => {
		const state = getState(); 
		if (shouldGetAllAssets(state.assets)) {
			console.log('GETTING ALL ASSETS');
			dispatch(getAllAssetsThunk()); 
		} else {
			const items = state.assets.items; 
			// dispatch(setSearchResults())
		}
	}
}

export const selectAsset = (assetID) => {
	return {
		type: SELECT_ASSET, 
		assetID
	}
}