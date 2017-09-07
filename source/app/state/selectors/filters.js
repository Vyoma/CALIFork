import { createSelector } from 'reselect'
import _ from 'underscore'; 

// ASSETS SELECTOR
import { getAssetObjectsArray } from './assets';

// VALIDATED TECHNOLOGIES 
export const technologyConstantsArray = [
	"Watson Content Hub",
	"Watson Conversation Service",
	"Watson Explorer",
	"Watson Knowledge Studios",
	"Watson Visual Recognition",
	"Watson Speech to Text",
	"Watson Personality Insights",
	"Watson Natural Language Classifier",
	"Watson Tone Analyzer",
	"Watson Discovery Services",
	"Watson Speech to Text",
	"Watson Text to Speech",
	"Data Science Experience",
	"Python", 
	"R", 
	"Jupyter Notebook",
	"Javascript", 
	"NodeJS", 
	"Node Red",
	"React", 
	"Angular",
	"SOLR",
	"IBM Bluemix",
	"HDFS",
	"Hive",
	"Kafka",
	"Cognos",
	"SPSS",
	"Watson IoT Platform",
]

export const getIndustryFilters = createSelector(
  [getAssetObjectsArray],
  (assetObjectsArray) => {
  	let industryFilters = []; 
  	assetObjectsArray.forEach((asset) => {
  		industryFilters = industryFilters.concat(asset.industries); 
  	}); 
  	industryFilters = _.uniq(industryFilters); 
  	return industryFilters; 
  }
)

export const getTechnologyFilters = createSelector(
  [getAssetObjectsArray],
  (assetObjectsArray) => {
  	let technologyFilters = []; 
  	assetObjectsArray.forEach((asset) => {
  		technologyFilters = technologyFilters.concat(asset.technologies); 
  	}); 
  	technologyFilters = _.uniq(technologyFilters); 
  	technologyFilters = _.intersection(technologyConstantsArray, technologyFilters)
  	return technologyFilters; 
  }
)

export const getClientFilters = createSelector(
  [getAssetObjectsArray],
  (assetObjectsArray) => {
  	let clientFilters = []; 
  	assetObjectsArray.forEach((asset) => {
  		clientFilters = clientFilters.concat(asset.clients); 
  	}); 
  	clientFilters = _.uniq(clientFilters); 
  	return clientFilters;
  }
)