// DEPENDENCIES
const fetch = require('isomorphic-fetch');

// API ROOT
const API_ROOT = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/a3ba2a4e09d604c8268276a46076fb7efb447e8060ed52a5618f0a63426dcec1/a1cab8ca-3cf7-477a-9364-5f8f0d180936'

export const elasticSuggest = (searchParameter) => {
	const endpoint = `${API_ROOT}/elastic/suggest`; 
	return fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 
			searchParameter: searchParameter 
		})
	})
	.then((response) => {
		return response.json(); 
	})
	.catch((err) => {
		return err; 
	}); 
}

export const elasticSearch = (searchParameter) => {
	const endpoint = `${API_ROOT}/elastic/search`; 
	return fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 
			searchParameter: searchParameter 
		})
	})
	.then((response) => {
		return response.json(); 
	})
	.catch((err) => {
		return err; 
	}); 
}

export const elasticIndex = (assetObject) => {
	const endpoint = `${API_ROOT}/elastic/index`; 
	return fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 
			assetObject: assetObject 
		})
	})
	.then((response) => {
		return response.json(); 
	})
	.catch((err) => {
		return err; 
	}); 
} 