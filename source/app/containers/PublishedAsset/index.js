// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// ACTION CREATORS 
import { fetchAssetThunk } from '../../state/assets' 

// STYLING
import styles from '../../styles/assetPage.scss'

class PublishedAssetPage extends Component {
	// static fetchData(store, params) {
	// 	let { assetID } = params
	// 	if (assetID) {
	// 	  return store.dispatch(fetchAssetThunk(assetID));		
	// 	}
	// }

  static propTypes = {
    assetObject: PropTypes.object.isRequired, 
  }

  renderTechnologiesTags = () => {
	 	const { assetObject } = this.props;
		const { technologies } = assetObject; 
		let renderTechnologies = technologies[0] !== 'None Submitted';
  	if (renderTechnologies) {
  		return (
  			<div>
		  		<Col md={12}>
		  	   	<h2 className={styles["tl-asset-secondary-title"]}>Asset Technology Stack</h2>
		  	   	<div className={styles["tl-tech-stack"]} style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
		  	     	{technologies.map((tech) => (
		  	       	<div className={styles["ar-tag-div-margin5"]} key={tech}>
		  	         	<h4>{tech}</h4>
		  	       	</div>
		  	     	))}
		  	   	</div>
		  	 	</Col>
		  	 	<Col md={12} className={styles["horizontal-border-col"]}>
		  	 	  <div className={styles["horizontal-border-div"]}>
		  	 	  </div>
		  	 	</Col>
	  	 	</div>
  	 	)
  	}
  }

  renderIndustriesTags = () => {
  	const { assetObject } = this.props;
 		const { industries, clients } = assetObject; 
 		let renderIndustries = industries.length > 0; 
 		let renderClientList = clients.length > 0; 

 		if (renderIndustries && renderClientList) {
 			return (
				<Col md={6} className={styles["vertical-border-col"]}>
			  	<h2 className={styles["tl-asset-secondary-title"]}>Asset Industries</h2>
			  	<div className={styles["tl-tech-stack"]} style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
			      {industries.map((industry) => (
			        <div className={styles["ar-tag-div-margin5-industry"]} key={industry}>
			          <h4>{industry}</h4>
			        </div>
			      ))}
			   	</div>
			 	</Col>
 			)
 		} else if (renderIndustries) {
 			return (
 				<Col md={12}>
 			  	<h2 className={styles["tl-asset-secondary-title"]}>Asset Industries</h2>
 			  	<div className={styles["tl-tech-stack"]} style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
 			      {industries.map((industry) => (
 			        <div className={styles["ar-tag-div-margin5-industry"]} key={industry}>
 			          <h4>{industry}</h4>
 			        </div>
 			      ))}
 			   	</div>
 			 	</Col>
 			)
 		}
  }

  renderClientListTags = () => {
  	const { assetObject } = this.props;
 		const { industries, clients } = assetObject; 
 		let renderIndustries = industries.length > 0; 
 		let renderClientList = clients.length > 0; 

 		if (renderIndustries && renderClientList) {
 			return (
				<Col md={6}>
			  	<h2 className={styles["tl-asset-secondary-title"]}>Asset Client List</h2>
			  	<div className={styles["tl-tech-stack"]} style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
			      {clients.map((client) => (
			        <div className={styles["ar-tag-div-margin5-client"]} key={client}>
			          <h4>{client}</h4>
			        </div>
			      ))}
			   	</div>
			 	</Col>
 			)
 		} else if (renderClientList) {
 			return (
 				<Col md={12}>
 			  	<h2 className={styles["tl-asset-secondary-title"]}>Asset Client List</h2>
 			  	<div className={styles["tl-tech-stack"]} style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
 			      {clientList.map((client) => (
 			        <div className={styles["ar-tag-div-margin5-client"]} key={client}>
 			          <h4>{client}</h4>
 			        </div>
 			      ))}
 			   	</div>
 			 	</Col>
 			)
 		}
 	}

 	renderConditionalDivider = () => {
	 	const { assetObject } = this.props;
		const { industries, clients } = assetObject; 
		let renderIndustries = industries.length > 0; 
		let renderClients = clients.length > 0; 

		if (renderIndustries || renderClients) {
			return (
				<Col md={12} className={styles["horizontal-border-col"]}>
				  <div className={styles["horizontal-border-div"]}>
				  </div>
				</Col>
			)
		}
 	}

  render () {
    const { assetObject } = this.props;
    const { assetTitle, assetOneLiner, assetDescription, assetContributors, assetPageImage, technologies, industries, clients, artifacts } = assetObject; 

    // ASSET IMAGE IF IT EXISTS
    const assetImage = assetPageImage; 

    // HANDLE ASSET BORDER BETWEEN DESC / TEAM 
    const teamHeightConst = assetContributors.length * 80; 
    const infoHeightConst = assetDescription.length / 90 * 16; 
    const teamBorderConst = teamHeightConst > infoHeightConst; 
    const infoBorder = teamBorderConst ? 'vertical-border-col-none' : 'vertical-border-col-right'
    const teamBorder = teamBorderConst ? 'vertical-border-col-left' : 'vertical-border-col-none'; 
    console.log(infoBorder); 
    console.log(teamBorder); 
    console.log(styles[teamBorder]); 
		console.log(styles["test-class"]);
    // HANDLE RENDERING VALID ROWS OF MEDIA ELEMENTS 
    let mediaElements = artifacts; 
    mediaElements = mediaElements.filter((media) => media.hasOwnProperty('title')); 
    const mediaElementRow1 = mediaElements.slice(0, 3); 
    const mediaElementRow2 = mediaElements.slice(3); 
    // console.log(mediaElementRow1);
    // console.log(mediaElementRow2); 
    return (
      <Container fluid={true}>
        <Row> 
          <Col md={10} offset={{ md: 1 }} style={{ marginTop: 15}}>
	          <Row className={styles["ar-asset-floating-row"]} style={{padding: 0}}>
	          	<img src={assetImage} className={styles["ar-asset-header-img"]} />
	          	<Col md={12} style={{ marginTop: 15}} className={styles["test-class"]}>
		          	<h1 className={styles["tl-asset-title"]}>{assetTitle}</h1>
		          	<p className={styles["tl-asset-body-text"]}>{assetOneLiner}</p>
	          	</Col>
	            <Col md={12} className={styles["horizontal-border-col"]}>
	              <div className={styles["horizontal-border-div"]}>
	              </div>
	            </Col>
	            <Col md={8} className={styles[infoBorder]}>
	              <h2 className={styles["tl-asset-secondary-title"]}>Detailed Information</h2>
	              <p>{assetDescription}</p>
	            </Col>
	            <Col md={4} className={styles[teamBorder]}>
	              <h2 className={styles["tl-asset-secondary-title"]}>Asset Contributors</h2>
	              {assetContributors.map((contributor) => {
	                const { name, role, email } = contributor; 
	                return (
	                  <div className={styles["tl-asset-roles"]} key={name} style={{marginTop: 10, marginBottom: 10}}>
	                    <h2 className={styles["tl-asset-member-name"]}>{name}</h2>
	                    <h2 className={styles["tl-asset-member-body-text"]}>{role}</h2>
	                    <p className={styles["tl-asset-member-body-text"]}>{email}</p>
	                  </div>
	                )
	              })}
	            </Col>
	            <Col md={12} className={styles["horizontal-border-col"]}>
	              <div className={styles["horizontal-border-div"]}>
	              </div>
	            </Col>
             	{this.renderTechnologiesTags()}
             	{this.renderIndustriesTags()}
             	{this.renderClientListTags()}
             	{this.renderConditionalDivider()}
	            <Col md={12}>
	              <h2 className={styles["tl-asset-secondary-title"]}>Asset Documentation</h2>
	            </Col>
	            {mediaElementRow1.map((media, i) => {
	            	if (media.hasOwnProperty('title')) {
	            		const { title, type, url } = media; 
		            	return (
		            		<Col md={4} key={i + '' + title} style={{ minHeight: 80, marginTop: 5, marginBottom: 10}}>
		            			<Row>	
		            				<Col md={10}>
		            					<h2 className={styles["tl-asset-member-body-text"]}>{type}</h2>
		            					<a className={styles["ar-asset-member-name"]} target="_blank" href={url}>
		            						{title}
		            					</a>
		            				</Col>
		            			</Row>
		            		</Col>
		            	)
		            }
	            })}
	            {mediaElementRow2.map((media, i) => {
	            	if (media.hasOwnProperty('title')) {
	            		const { title, type, url } = media; 
		            	return (
		            		<Col md={4} key={i + '' + title} style={{ minHeight: 80}}>
		            			<Row>	
		            				<Col md={10}>
		            					<h2 className={styles["tl-asset-member-body-text"]}>{type}</h2>
		            					<a className={styles["ar-asset-member-name"]} target="_blank" href={url}>
		            						{title}
		            					</a>
		            				</Col>
		            			</Row>
		            		</Col>
		            	)
	            	}
	            })}
	            <Col md={12}>
	              <div style={{height: 50}}>
	              </div>
	            </Col>
	          </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  assetObject: state.assets.publishAssetObject
}); 

const mapDispatchToProps = (dispatch) => ({
  fetchAssetThunk: (assetID) => {
    dispatch(fetchAssetThunk(assetID))
  },
}); 

export default connect(mapStateToProps, mapDispatchToProps)(PublishedAssetPage)