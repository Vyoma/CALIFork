// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-grid-system'
import { Helmet } from 'react-helmet'

// ACTION CREATORS 
import { fetchAllAssetsThunk, setSearchParameterThunk, searchAssetsThunk } from '../../state/search' 

class TestPage extends Component {
	static fetchData(store, params) {
	  return store.dispatch(fetchAllAssetsThunk());
	}

  static propTypes = {
    searchParameter: PropTypes.string.isRequired,
    searchSuggestions: PropTypes.array.isRequired, 
    searchResults: PropTypes.array.isRequired, 
  }

  render() {
  	const { searchParameter, searchSuggestions, searchResults } = this.props; 

  	return (
  		<div>
        <Helmet
          title="Project CALI"
        />
        <div>
        	{searchResults.map((assetID) => {
        		return (
	        		<div key={assetID}>
	        			<h6>{assetID}</h6>
	        		</div>
        		)
        	})}
        </div>
  		</div>
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
}); 

export default connect(mapStateToProps, mapDispatchToProps)(TestPage)