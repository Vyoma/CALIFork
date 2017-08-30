// DEPENDENCIES
const fetch = require('isomorphic-fetch');

// API ROOT
const API_ROOT = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/a3ba2a4e09d604c8268276a46076fb7efb447e8060ed52a5618f0a63426dcec1/a1cab8ca-3cf7-477a-9364-5f8f0d180936'


// ----------------------------- CONSTANTS ----------------------------- //
export const SET_SEARCH_PARAMETER = 'SET_SEARCH_PARAMETER'
export const SET_SEARCH_SUGGESTIONS_REQUEST = 'SET_SEARCH_SUGGESTIONS_REQUEST'; 
export const SET_SEARCH_SUGGESTIONS_SUCCESS = 'SET_SEARCH_SUGGESTIONS_SUCCESS'; 
export const SET_SEARCH_SUGGESTIONS_FAILURE = 'SET_SEARCH_SUGGESTIONS_FAILURE'; 
export const SET_SEARCH_RESULTS_REQUEST = 'SET_SEARCH_RESULTS_REQUEST'; 
export const SET_SEARCH_RESULTS_SUCCESS = 'SET_SEARCH_RESULTS_SUCCESS'; 
export const SET_SEARCH_RESULTS_FAILURE = 'SET_SEARCH_RESULTS_FAILURE'; 


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

		// HIT APICONNECT/OPENWHISK ENDPOINT
		const suggestEndpoint = `${API_ROOT}/elastic/suggest`; 
		fetch(suggestEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 
				searchParameter: searchParameter 
			})
		}).then((response) => {
			return response.json(); 
		}).then((body) => {
			const suggestions = body.suggestions; 
			dispatch(setSearchSuggestionsSuccess(suggestions)); 
		}).catch((err) => {
			console.log(`ERROR: ${err}`); 
			dispatch(setSearchResultsFailure()); 
		})
	}
}

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

export const fetchAllAssetsThunk = () => {
	return (dispatch) => {

		// HIT APICONNECT/OPENWHISK ENDPOINT
		const allEndpoint = `${API_ROOT}/elastic/all`; 
		return fetch(allEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		}).then((response) => {
			return response.json(); 
		}).then((body) => {
			const searchResults = body.searchResults; 
			let resultsItems = []; 
			let resultsEntities = {}; 
			searchResults.forEach((result) => {
				resultsEntities[`${result.assetID}`] = result; 
				resultsItems.push(result.assetID); 
			})
			dispatch(setSearchResultsSuccess(resultsItems, resultsEntities)); 
		}).catch((err) => {
			console.log(`ERROR: ${err}`); 
			dispatch(setSearchResultsFailure(err)); 
		})
	}
}
