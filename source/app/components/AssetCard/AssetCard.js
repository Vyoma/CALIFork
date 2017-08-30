// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// STYLES
import styles from '../../styles/styles.scss'

class AssetCard extends Component {
	static propTypes = {
	  handleSelectAsset: PropTypes.func.isRequired, 
	}

	handleSelectAsset = (assetID) => {
		const { handleSelectAsset } = this.props; 
		handleSelectAsset(assetID)
	}

	renderCognitiveTags = (cognitiveTags, renderCognitiveTagsBoolean) => {
		if (renderCognitiveTagsBoolean) {
			return (
				<Row>
					<Col md={12}>
						<div className={styles["ar-tag-flexbox-footer"]}>
							{cognitiveTags.map((tag) => {
								if (tag !== '') {
									return (
										<div key={tag} className={styles["ar-tag-div"]}>
											<h4 className={styles["ar-tag-text"]}>{tag}</h4>
										</div>
									)
								}
							})}
						</div>
					</Col>
				</Row>
			)
		}
	}

	render() {
		const { assetID, assetTitle, assetOneLiner, handleSelectAsset, technologyStack, cognitiveTags, assetCardImage } = this.props; 
		const cardImage = assetCardImage ? assetCardImage : imageUrl; 
		const renderCognitiveTagsBoolean = cognitiveTags.length > 0; 
		const cardDescriptionClass = (renderCognitiveTagsBoolean) ? styles["ar-card-desc-div"] : styles["ar-card-desc-div-expand"]
		const oneLinerString = assetOneLiner; 
		const followUp = renderCognitiveTagsBoolean ? (<div style={{display: 'none'}}></div>) : (<div className={styles["ar-card-more-div"]}><button className={styles["ar-card-button-more"]} onClick={handleSelectAsset}>See More...</button></div>); 

		return (
			<Container key={assetID} fluid={true} className={styles["ar-card"]}>
				<img src={'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg'} className={styles["ar-card-img"]} />
				<Row>
					<Col sm={10} md={10}>
						<div className={styles["ar-card-title-div"]} onClick={handleSelectAsset}>
							<p className={styles["ar-card-title-text"]}>{assetTitle}</p>
						</div>
					</Col>
					<Col sm={2} md={2}>
						<div className={styles["ar-card-title-div"]}>
							<Link className={styles["ar-card-action-button"]} to={`/asset/${assetID}`}>
								<svg width='16' height='16' viewBox='-3 5 16 16' fillRule='evenodd'><path d='M11 19H-1V9h3V5h-5v16h16v-5h-2z'></path><path d='M4.7 14.7L11 8.4V13h2V5H5v2h4.6l-6.3 6.3z'></path></svg>
							</Link>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={12} md={12}>
						<div className={cardDescriptionClass}>
							<p className={styles["ar-card-desc-text"]}>
								{oneLinerString}
							</p>
						</div>
						{followUp}
					</Col>
				</Row>
				{this.renderCognitiveTags(cognitiveTags, renderCognitiveTagsBoolean)}
			</Container> 
		)
	}
}

export default AssetCard; 