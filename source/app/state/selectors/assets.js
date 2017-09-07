import { createSelector } from 'reselect'
import _ from 'underscore'

const getAssetItems = (state) => state.assets.items
const getAssetEntities = (state) => state.entities.assets
export const getAssetObjectsArray = createSelector(
  [getAssetItems, getAssetEntities],
  (assetItems, assetEntities) => {
  	return assetItems.map((c) => assetEntities[`${c}`]).filter((c) => c); 
  }
)

const getParameterAssetID = (state, props) => props.match.params.assetID; 
const getSelectedAssetID = (state) => state.assets.selectedAsset
export const getSelectedAssetObject = createSelector(
  [getSelectedAssetID, getParameterAssetID, getAssetEntities],
  (selectedAssetID, parameterID, assetEntities) => {
    const assetID = parameterID || selectedAssetID; 
    console.log(`parameterID ${parameterID}`)
    console.log(`selectedAssetID ${selectedAssetID}`)
    console.log(`assetID ${assetID}`)
    console.log(Object.keys(assetEntities)); 
  	return assetEntities[`${assetID}`]; 
  }
)

const assetFilterFn = (asset, assetFilters) => {
	const { industries, technologyStack, clientList } = asset; 
	let combined = industries.concat(technologyStack); 
  combined = combined.concat(clientList); 
	return _.intersection(combined, assetFilters).length > 0; 
}

const getAssetFilters = (state) => state.assets.assetFilters
export const getFilteredAssets = createSelector(
  [getAssetObjectsArray, getAssetFilters],
  (assetArray, assetFilters) => {
  	if (assetFilters.length === 0) {
  		return assetArray; 
  	} else {
	  	return assetArray.filter((asset) => assetFilterFn(asset, assetFilters))
  	}
  }
)

const getSearchResults = (state) => state.search.searchResults
export const getSearchResultsObjectsArray = createSelector(
  [getSearchResults, getAssetEntities],
  (assetItems, assetEntities) => {
    return assetItems.map((c) => assetEntities[`${c}`])
  }
)

const getSearchParameter = (state) => state.search.searchParameter 
const getShowSearchSuggestions = (state) => state.search.showSearchSuggestions
export const getAssetsArrayForHome = createSelector(
  [getSearchParameter, getShowSearchSuggestions, getSearchResults, getAssetObjectsArray],
  (searchParameter, showSearchSuggestions, searchResults, assetsObjectsArray) => {
    if (searchResults.length === 0 && (searchParameter === '' || showSearchSuggestions)) {
      console.log('RETURNING ARRAY')
      return assetsObjectsArray; 
    } else {
      const emptyArray = []; 
      console.log('RETURNING EMPTY ARRAY')
      return emptyArray; 
    }
    return []; 
  }
)

// REFERENCE TO ORIGINAL FILTERED RESULTS SELECTOR WITHOUT FUNCTION FOR ACCESSING ASSET ENTITIES
export const getFilteredResults = createSelector(
  [getSearchResultsObjectsArray, getAssetFilters],
  (searchResults, assetFilters) => {
    if (assetFilters.length === 0) {
      searchResults = _.uniq(searchResults);
      return searchResults; 
    } else {
      searchResults = _.uniq(searchResults); 
      return searchResults.filter((asset) => assetFilterFn(asset, assetFilters))
    }
  }
)