// SERVICES
import { elasticSuggest, elasticSearch } from '../services/elastic'

// ----------------------------- CONSTANTS ----------------------------- //
export const SET_SEARCH_PARAMETER = 'SET_SEARCH_PARAMETER'
export const SET_SEARCH_SUGGESTIONS_REQUEST = 'SET_SEARCH_SUGGESTIONS_REQUEST'; 
export const SET_SEARCH_SUGGESTIONS_SUCCESS = 'SET_SEARCH_SUGGESTIONS_SUCCESS'; 
export const SET_SEARCH_SUGGESTIONS_FAILURE = 'SET_SEARCH_SUGGESTIONS_FAILURE'; 
export const SET_SEARCH_RESULTS_REQUEST = 'SET_SEARCH_RESULTS_REQUEST'; 
export const SET_SEARCH_RESULTS_SUCCESS = 'SET_SEARCH_RESULTS_SUCCESS'; 
export const SET_SEARCH_RESULTS_FAILURE = 'SET_SEARCH_RESULTS_FAILURE'; 

import { GET_ALL_ASSETS_SUCCESS } from './assets'

// ----------------------------- REDUCERS ----------------------------- //
const initialState = {
	searchParameter: '', 
	searchSuggestions: [], 
	fetchingSuggestions: false, 
	showSearchSuggestions: false,  
	searchResults: [], 
	fetchingResults: false, 
}

const search = (state = initialState, action) => {
	switch (action.type) {
		case SET_SEARCH_PARAMETER: {
			return {
				...state, 
				searchParameter: action.searchParameter
			}
		}
		case SET_SEARCH_SUGGESTIONS_SUCCESS: {
			return {
				...state, 
				searchSuggestions: action.searchSuggestions,
				showSearchSuggestions: true, 
			}
		}
		case SET_SEARCH_RESULTS_REQUEST: {
			return {
				...state, 
				fetchingResults: true, 
				showSearchSuggestions: false, 
			}
		}
		case GET_ALL_ASSETS_SUCCESS: 
		case SET_SEARCH_RESULTS_SUCCESS: {
			return {
				...state, 
				fetchingResults: false,
				searchResults: action.items,
			}
		}
		default: 
			return state
	}
}

export default search; 


// ----------------------------- ACTION CREATORS ----------------------------- //
export const setSearchParameter = (searchParameter) => {
	return {
		type: SET_SEARCH_PARAMETER, 
		searchParameter
	}
}

export const setSearchSuggestionsRequest = () => {
	return {
		type: SET_SEARCH_SUGGESTIONS_REQUEST
	}
}

export const setSearchSuggestionsSuccess = (searchSuggestions) => {
	return {
		type: SET_SEARCH_SUGGESTIONS_SUCCESS, 
		searchSuggestions
	}
}

export const setSearchSuggestionsFailure = (error) => {
	return {
		type: SET_SEARCH_SUGGESTIONS_FAILURE, 
		error
	}
}

export const setSearchParameterThunk = (searchParameter) => {
	return (dispatch) => {
		dispatch(setSearchParameter(searchParameter)); 
		dispatch(setSearchSuggestionsRequest()); 
		return elasticSuggest(searchParameter)
		.then((body) => {
			const suggestions = body.suggestions; 
			dispatch(setSearchSuggestionsSuccess(suggestions)); 
		}).catch((err) => {
			console.log(`ERROR: ${err}`); 
			dispatch(setSearchResultsFailure()); 
		})
	}
}

// ELASTIC SEARCH 
export const setSearchResultsRequest = () => {
	return {
		type: SET_SEARCH_RESULTS_REQUEST
	}
}

export const setSearchResultsSuccess = (items, entities) => {
	return {
		type: SET_SEARCH_RESULTS_SUCCESS, 
		items, 
		entities
	}
}

export const setSearchResultsFailure = (error) => {
	return {
		type: SET_SEARCH_RESULTS_FAILURE, 
		error
	}
}

export const searchAssetsThunk = (searchParameter) => {
	return (dispatch) => {
		dispatch(setSearchParameter(searchParameter))
		dispatch(setSearchResultsRequest(searchParameter))
		return elasticSearch(searchParameter)
		.then((body) => {
			console.log(body);
			const { searchResults } = body; 
			let resultsItems = []; 
			let resultsEntities = {}; 
			searchResults.forEach((result) => {
				resultsEntities[`${result.assetID}`] = result; 
				resultsItems.push(result.assetID); 
			})
			dispatch(setSearchResultsSuccess(resultsItems, resultsEntities)); 
		}).catch((err) => {
			console.log(`ERROR: ${err}`); 
			dispatch(setSearchResultsFailure()); 
		})
	}
}
