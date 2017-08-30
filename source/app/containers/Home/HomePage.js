// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// ACTION CREATORS 
import { fetchAllAssetsThunk, setSearchParameterThunk, searchAssetsThunk } from '../../state/search' 

// APP COMPONENTS
import Autocomplete from '../../components/Autocomplete/Autocomplete'
import SearchResults from './SearchResults/SearchResults'

class HomePage extends Component {
	static fetchData(store, params) {
	  return store.dispatch(fetchAllAssetsThunk());
	}

  static propTypes = {
    searchParameter: PropTypes.string.isRequired,
    searchSuggestions: PropTypes.array.isRequired, 
    searchResults: PropTypes.array.isRequired, 
  }

  handleChangeSearchParameter = (e) => {
  	const { setSearchParameterThunk } = this.props; 
  	let searchParameter = e.target.value;
  	setSearchParameterThunk(searchParameter); 
  }

  handleSearchSubmit = (e) => {
  	const { searchAssetsThunk, searchParameter } = this.props; 
  	searchAssetsThunk(searchParameter)
  }

  handleSelectSuggestion = (suggestion) => {
  	const { searchAssetsThunk } = this.props; 
  	searchAssetsThunk(suggestion); 
  }

  handleSelectAsset = (assetID) => {
  	const { selectAsset } = this.props; 
  	selectAsset(assetID);

  	// TODO: REFACTOR TO WORK AS LINK 
  	// -> SERVER CAN MAKE REQUEST TO MONGODB OBJECT  

  	// const { selectAsset, navToAssetPage } = this.props; 
  	// navToAssetPage(assetID); 
  }

  render() {
  	const { searchParameter, searchSuggestions, showSearchSuggestions } = this.props; 

  	return (
  		<Container fluid={true}>
        <Helmet
          title="Project CALI"
        />
  			<Row className="tl-search">
  				<Col sm={12} md={12}>
  					<Autocomplete 
  						searchParameter={searchParameter}
  						searchSuggestions={searchSuggestions}
  						dropdownOpen={showSearchSuggestions}
  						onSubmit={this.handleSearchSubmit}
  						onChange={this.handleChangeSearchParameter}
  						onSelect={this.handleSelectSuggestion}
  						onSelectAsset={this.handleSelectAsset}
  						onBlur={this.handleBlur}
  						onFocus={this.handleFocus}
  					/> 
  				</Col>
  			</Row>
  			<Row>
          <Col sm={12} md={12}>
    				<SearchResults />
          </Col>
  			</Row>
  		</Container>
  	)
  }
}

const mapStateToProps = (state, ownProps) => ({
  searchParameter: state.search.searchParameter, 
  searchSuggestions: state.search.searchSuggestions, 
  searchResults: state.search.searchResults, 
  fetchingResults: state.search.fetchingResults, 
  showSearchSuggestions: state.search.showSearchSuggestions, 
}); 

const mapDispatchToProps = (dispatch) => ({
  fetchAllAssetsThunk: () => {
    dispatch(fetchAllAssetsThunk())
  },
  setSearchParameterThunk: (searchParameter) => {
    dispatch(setSearchParameterThunk(searchParameter))
  },
  searchAssetsThunk: (searchParameter) => {
    dispatch(searchAssetsThunk(searchParameter))
  },
  // selectAsset: (assetID) => {
  //   dispatch(selectAsset(assetID))
  // },
  // navToAssetPage: (assetTitle) => {
  //   dispatch(navToAssetPage(assetTitle))
  // },
  // blurSearchSuggestions: () => {
  //   dispatch(blurSearchSuggestions())
  // },
  // focusSearchSuggestions: () => {
  //   dispatch(focusSearchSuggestions())
  // },
}); 

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)