import { createSelector } from 'reselect'
import _ from 'underscore'

const getIndustries = (state) => state.publish.industryTags; 
const getTechnologies = (state) => state.publish.technologyTags; 
const getClients = (state) => state.publish.clientTags; 

const uppercaser = (str) => {
	if (str === 'and') {
		return str; 
	}

	return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatString(string) { 
	if (!string) {
		return 'undefined';
	} else if (typeof string !== 'string') {
		return 'undefined'; 
	}

  let formattedString = string.replace(/(\b[a-z]*)/g, uppercaser);
  return formattedString; 
}

const replaceAmpersands = (str) => {
	let formattedString = str.replace(/&/g, 'and');
	return formattedString; 
}

export const getUniqueIndustries = createSelector(
  [getIndustries],
  (industries) => {
  	industries = industries.filter((i) => typeof i === 'string').map((i) => i.toLowerCase()).map((i) => replaceAmpersands(i)); 
  	industries = _.uniq(industries); 
  	industries = industries.map((i) => formatString(i)); 
  	return industries; 
  }
)

export const getUniqueTechnologies = createSelector(
  [getTechnologies],
  (technologies) => {
  	technologies = technologies.filter((i) => typeof i === 'string').map((i) => i.toLowerCase()); 
  	technologies = _.uniq(technologies); 
  	technologies = technologies.map((i) => formatString(i)); 
  	return technologies; 
  }
)

export const getUniqueClients = createSelector(
  [getClients],
  (clients) => {
  	clients = clients.filter((i) => typeof i === 'string').map((i) => i.toLowerCase()); 
  	clients = _.uniq(clients); 
  	clients = clients.map((i) => formatString(i)); 
  	return clients; 
  }
)