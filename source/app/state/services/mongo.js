// DEPENDENCIES
const fetch = require('isomorphic-fetch');

// API ROOT
const API_ROOT = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/a3ba2a4e09d604c8268276a46076fb7efb447e8060ed52a5618f0a63426dcec1/a1cab8ca-3cf7-477a-9364-5f8f0d180936'

export const mongoGet = (assetID) => {
	const endpoint = `${API_ROOT}/mongo/get`; 
	return fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ 
			assetID: assetID 
		})
	})
	.then((response) => {
		return response.json(); 
	})
	.catch((err) => {
		return err; 
	}); 
}

export const mongoGetAll = () => {
	const endpoint = `${API_ROOT}/mongo/get`; 
	return fetch(endpoint, {
		method: 'GET'
	})
	.then((response) => {
		return response.json(); 
	})
	.then((json) => {
		return json.response; 
	})
	.catch((err) => {
		return err; 
	}); 
}

export const mongoSave = (assetObject) => {
	const endpoint = `${API_ROOT}/mongo/save`; 
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
		console.log('MONGO SAVE RESPONSE');
		return response.json(); 
	})
	.then((json) => {
		console.log(json);
		if (json.error) {
			throw new Error(json.error);
		}

		return json; 
	})
	.catch((error) => {
		throw new Error(error)
	}); 
}

