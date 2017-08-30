// DEPENDENCIES
const fetch = require('isomorphic-fetch');

// API ROOT
const API_ROOT = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/a3ba2a4e09d604c8268276a46076fb7efb447e8060ed52a5618f0a63426dcec1/a1cab8ca-3cf7-477a-9364-5f8f0d180936'

// ----------------------------- CONSTANTS ----------------------------- //
export const ADD_ASSET_FILTER = 'ADD_ASSET_FILTER'
export const REMOVE_ASSET_FILTER = 'REMOVE_ASSET_FILTER'
export const REMOVE_ALL_ASSET_FILTERS = 'REMOVE_ALL_ASSET_FILTERS'
export const FETCH_ASSET_SUCCESS = 'FETCH_ASSET_SUCCESS'
export const FETCH_ASSET_REQUEST = 'FETCH_ASSET_REQUEST'
export const FETCH_ASSET_FAILURE = 'FETCH_ASSET_FAILURE'

import { SET_SEARCH_RESULTS_SUCCESS } from './search'

// ----------------------------- REDUCERS ----------------------------- //
const initialState = {
	items: [],
	selectedAsset: null, 
	fetchingAsset: false,
	assetFilters: [],
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
		case SET_SEARCH_RESULTS_SUCCESS: {
			return {
				...state,
				items: action.items,
				clearAssets: false,
			}
		}
		case FETCH_ASSET_SUCCESS: {
			return {
				...state, 
				fetchingAsset: false, 
				fetchedAssetObject: action.fetchedAssetObject, 
			}
		}
		case FETCH_ASSET_REQUEST: {
			return {
				...state, 
				fetchingAsset: true, 
				selectedAsset: action.assetID
			}
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

export const fetchAssetRequest = (assetID) => {
	return {
		type: FETCH_ASSET_REQUEST, 
		assetID, 
	}
}

export const fetchAssetSuccess = (fetchedAssetObject) => {
	return {
		type: FETCH_ASSET_SUCCESS,
		fetchedAssetObject
	}
}

export const fetchAssetThunk = (assetID) => {
	return (dispatch) => {
		dispatch(fetchAssetRequest(assetID))
		// HIT APICONNECT/OPENWHISK ENDPOINT
		const endpoint = `${API_ROOT}/elastic/get`; 
		return fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 
				assetID: assetID 
			})
		}).then((response) => {
			return response.json(); 
		}).then((body) => {
			const asset = body.asset; 
			dispatch(fetchAssetSuccess(asset));
		}).catch((err) => {
			console.log(`ERROR: ${err}`); 
			dispatch(setSearchResultsFailure()); 
		})
	}
}