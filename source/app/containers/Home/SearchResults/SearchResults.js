// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// SELECTORS 
import { getFilteredResults } from '../../../state/selectors/assets' 

// APP COMPONENTS
import FilterTabs from './FilterTabs'
import AssetCard from '../../../components/AssetCard/AssetCard'

// CARBON COMPONENTS 
import { Loading } from 'carbon-components-react'

class SearchResults extends Component {
	static propTypes = {
    filteredResults: PropTypes.array.isRequired, 
	}

	handleSelectAsset = (assetID) => {
		const { selectAsset, navToAssetPage } = this.props; 
		selectAsset(assetID); 
		navToAssetPage(assetID); 
	}

	render() {
		const { fetchingResults, filteredResults } = this.props; 

		if (fetchingResults) {
			return (
				<Container fluid={true}>
					<Row>
						<Col sm={12} md={12}>
							<Loading className="some-class" />
						</Col>
					</Row>
				</Container>
			)
		}

		return (
			<Container fluid={true}>
				<Row>
					<Col md={12}>
						<FilterTabs />
					</Col>
				</Row>
				<Row>
					{filteredResults.map((result) => {
						const { assetID } = result; 
						return (
							<Col key={assetID} md={4}>
								<AssetCard 
									key={assetID}
									{...result}
									handleSelectAsset={() => {this.handleSelectAsset(assetID)}}
								/>
							</Col>
						)
					})}
				</Row>
			</Container>
		)
	}
}



const mapStateToProps = (state, ownProps) => ({
  filteredResults: getFilteredResults(state), 
  fetchingResults: state.search.fetchingResults,
}); 

const mapDispatchToProps = (dispatch) => ({
  selectAsset: (assetID) => {
    dispatch(selectAsset(assetID))
  },
  navToAssetPage: (assetTitle) => {
    dispatch(navToAssetPage(assetTitle))
  },
}); 

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
