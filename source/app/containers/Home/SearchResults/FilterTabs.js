// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// ACTION CREATORS 
import { addAssetFilter, removeAssetFilter, removeAllFilters } from '../../../state/assets' 

// SELECTORS 
import { getIndustryFilters, getTechnologyFilters, getClientFilters } from '../../../state/selectors/filters' 

// APP COMPONENTS 
import Tab from '../../../components/Tab/Tab'

// CARBON COMPONENTS 
import { Checkbox } from 'carbon-components-react'

// CONSTANT CATEGORIES
const filterCategories = ['All', 'Industry', 'Technology', 'Client']; 

// STYLES
import styles from '../../../styles/styles.scss'

class FilterTabs extends Component {
	static propTypes = {
    industryFilters: PropTypes.array.isRequired, 
    technologyFilters: PropTypes.array.isRequired, 
    clientFilters: PropTypes.array.isRequired, 
    addAssetFilter: PropTypes.func.isRequired, 
    removeAssetFilter: PropTypes.func.isRequired, 
    removeAllFilters: PropTypes.func.isRequired, 
	}

	state = {
		filterCategory: 'All', 
		filterCategoryIndex: 0,
		activeTabIndex: 0,  
	}

	handleSelectTab = (activeTabIndex) => {
		const { removeAllFilters } = this.props;
		this.setState({ activeTabIndex }); 
		removeAllFilters(); 
	}

	handleCheckboxSelect = (checkedBool, filterValue) => {
		const { addAssetFilter, removeAssetFilter } = this.props; 
		if (checkedBool) {
			addAssetFilter(filterValue); 
		} else {
			removeAssetFilter(filterValue)
		}
	}

	renderCategoryCheckboxes = () => {
		const { industryFilters, technologyFilters, clientFilters } = this.props; 
		let { activeTabIndex } = this.state; 
		let category = filterCategories[activeTabIndex]; 
		let categoryArray; 
		switch (category) {
			case 'Industry':
				categoryArray = industryFilters; 
				break; 
			case 'Technology': 
				categoryArray = technologyFilters; 
				break; 
			case 'Client': 
				categoryArray = clientFilters;
				break; 
			default: 
				categoryArray = []; 
				break; 
		}

		return (
			<div>
				{categoryArray.map((category) => (
					<Col sm={3} md={3} key={category}>
						<Checkbox
						  id={category}
						  labelText={category}
						  className={styles["ar-checkbox-filter"]}
						  onChange={this.handleCheckboxSelect}
						/>
					</Col>
				))}
			</div>
		)
	}

	render() {
		let { activeTabIndex } = this.state; 

		return (
			<Container fluid={true}>
				<Row>
					<Col sm={12} md={12}>
						<div className={styles["ar-tab-flex-container"]}>
							<h2 className={styles["ar-tab-header"]}>View By</h2>
							{filterCategories.map((category, i) => (
								<Tab 
									key={category}
									tabIndex={i}
									tabValue={category}
									activeTabIndex={activeTabIndex}
									handleSelectTab={this.handleSelectTab}
								/>
							))}
						</div>
					</Col>
				</Row>
				<Row className={styles["ar-row-margin10"]}>
					{this.renderCategoryCheckboxes()}
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
  industryFilters: getIndustryFilters(state), 
  technologyFilters: getTechnologyFilters(state), 
  clientFilters: getClientFilters(state)
}); 

const mapDispatchToProps = (dispatch) => ({
  addAssetFilter: (filterValue) => {
    dispatch(addAssetFilter(filterValue))
  },
  removeAssetFilter: (filterValue) => {
    dispatch(removeAssetFilter(filterValue))
  },
  removeAllFilters: () => {
    dispatch(removeAllFilters())
  },
}); 

export default connect(mapStateToProps, mapDispatchToProps)(FilterTabs)