// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS 
import { Icon, Button } from 'carbon-components-react'

// SEARCH ICON
// import searchIcon from '../../resources/search-icon.svg'
// STYLES
import styles from '../../styles/styles.scss'

class Autocomplete extends Component {
	static propTypes = {
	  searchSuggestions: PropTypes.array, 
	  // version: PropTypes.number, 
	}

	handleSubmit = () => {
		const { onSubmit } = this.props; 
		onSubmit(); 
	}

	handleSearchInput = (e) => {
		const { onChange } = this.props; 
		onChange(e)
	}

	handleSelectSuggestion = (selection) => {
		const { onSelect } = this.props; 
		onSelect(selection); 
	}

	handleSelectAsset = (assetID) => {
		const { onSelectAsset } = this.props; 
		onSelectAsset(assetID); 
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { onSubmit } = this.props; 
		console.log('SUBMIT!'); 
		onSubmit(); 
	}

	// TODO: IMPLEMENT BLUR FUNCTIONALITY FOR AUTOCOMPLETE BAR
	// handleBlur = (e) => {
	// 	const blurTargetClassName = e.target.className; 
	// 	const { onBlur } = this.props; 
	// 	if (blurTargetClassName === 'bx--text-input' || blurTargetClassName === 'bx--dropdown-link') {
	// 		this.handleSelectSuggestion(e.target.id)
	// 	}
	// 	onBlur(); 
	// }

	// handleFocus = () => {
	// 	const { onFocus } = this.props; 
	// 	onFocus(); 
	// }

	renderDropdown = () => {
		const { searchParameter, searchSuggestions, dropdownOpen } = this.props; 

		if (searchParameter === '' && dropdownOpen) {
			return (
				<div className={styles["ar-autocomplete-suggestion-div"]}>
					<p className={styles["ar-autocomplete-suggestion-text"]}>Suggested Inputs: Keywords, Asset Title, Name</p>
				</div>
			)
		} else if (searchSuggestions && dropdownOpen) {
			return (
				<ul className="bx--dropdown bx--dropdown--open">
					<ul className="bx--dropdown-list">
						{searchSuggestions.map((suggestion, i) => {
							const { suggestionText, suggestionType, assetID } = suggestion; 
							if (suggestionType === 'asset') {
								return (
									<Link 
										key={assetID} 
										className="bx--dropdown-link" 
										to={`/asset/${assetID}`}
										onClick={() => this.handleSelectAsset(assetID)}>
									>
										{suggestionText}
									</Link>
								)
							// HANDLE THE DIVIDERS
							} else if (suggestionType === 'divider') {
								return (
									<li 
										key={`${i}-${suggestionText}`} 
										className={styles["ar-dropdown-divider"]}>
										<p className={styles["ar-dropdown-divider-text"]}>{suggestionText}</p>
										<div className={styles["ar-dropdown-divider-div"]}></div>
									</li>
								)
							// HANDLE NORMAL SEARCH FUNCTIONALITY
							} else {
								let modifiedSuggestionText; 
								if (suggestionType === 'industry') {
									modifiedSuggestionText = (<p>Projects in the <strong className="ar-bold-span">{suggestionText}</strong> Industry</p>);
								} else {
									modifiedSuggestionText = (<p>Projects utilizing <strong>{suggestionText}</strong></p>);
								}
								return (
									<li 
										key={`${i}-${suggestionText}`} 
										className="bx--dropdown-link" 
										onClick={() => this.handleSelectSuggestion(suggestionText)}>
										{modifiedSuggestionText}
									</li>
								)
							}
						})}
					</ul>
				</ul>
			)
		}
	}

	render() {
		const { searchParameter, searchSuggestions, dropdownOpen } = this.props; 

		return (
			<Container fluid={true}>
				<Row style={{marginTop: 40}}>
					<Col md={6} offset={{md: 3}}>
						<div>
							<form className="bx--form-item" onSubmit={this.handleSubmit} autoComplete="off">
							  <input 
							  	id="text1" 
							  	type="text" 
							  	className="bx--text-input" 
							  	placeholder="Search for Cognitive Projects" 
							  	value={searchParameter}
							  	onChange={this.handleSearchInput}
							  />
							  <Icon className={styles["ar-search-icon"]} name="search" />
						  </form>
						</div>
						{this.renderDropdown()}
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Autocomplete; 