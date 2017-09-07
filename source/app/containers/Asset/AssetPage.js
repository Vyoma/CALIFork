// // REACT
// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

// // REACT-GRID-SYSTEM
// import { Container, Row } from 'react-grid-system'
// import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// // ACTION CREATORS 
// // import { fetchAssetThunk } from '../../state/assets' 

// class AssetPage extends Component {
// 	// static fetchData(store, params) {
// 	// 	let { assetID } = params
// 	// 	if (assetID) {
// 	// 	  return store.dispatch(fetchAssetThunk(assetID));		
// 	// 	}
// 	// }

//   static propTypes = {
//     selectedAssetObject: PropTypes.object.isRequired, 
//   }

//   renderTechnologiesTags = () => {
// 	 	const { selectedAssetObject } = this.props;
// 		const { technologyStack } = selectedAssetObject; 
// 		let renderTechnologies = technologyStack[0] !== 'None Submitted';
//   	if (renderTechnologies) {
//   		return (
//   			<div>
// 		  		<Col md={12}>
// 		  	   	<h2 className="tl-asset-secondary-title">Asset Technology Stack</h2>
// 		  	   	<div className="tl-tech-stack" style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
// 		  	     	{technologyStack.map((tech) => (
// 		  	       	<div className="ar-tag-div-margin5" key={tech}>
// 		  	         	<h4>{tech}</h4>
// 		  	       	</div>
// 		  	     	))}
// 		  	   	</div>
// 		  	 	</Col>
// 		  	 	<Col md={12} className="horizontal-border-col">
// 		  	 	  <div className="horizontal-border-div">
// 		  	 	  </div>
// 		  	 	</Col>
// 	  	 	</div>
//   	 	)
//   	}
//   }

//   renderIndustriesTags = () => {
//   	const { selectedAssetObject } = this.props;
//  		const { industries, clientList } = selectedAssetObject; 
//  		let renderIndustries = industries.length > 0; 
//  		let renderClientList = clientList.length > 0; 

//  		if (renderIndustries && renderClientList) {
//  			return (
// 				<Col md={6} className="vertical-border-col">
// 			  	<h2 className="tl-asset-secondary-title">Asset Industries</h2>
// 			  	<div className="tl-tech-stack" style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
// 			      {industries.map((industry) => (
// 			        <div className="ar-tag-div-margin5 industry" key={industry}>
// 			          <h4>{industry}</h4>
// 			        </div>
// 			      ))}
// 			   	</div>
// 			 	</Col>
//  			)
//  		} else if (renderIndustries) {
//  			return (
//  				<Col md={12}>
//  			  	<h2 className="tl-asset-secondary-title">Asset Industries</h2>
//  			  	<div className="tl-tech-stack" style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
//  			      {industries.map((industry) => (
//  			        <div className="ar-tag-div-margin5 industry" key={industry}>
//  			          <h4>{industry}</h4>
//  			        </div>
//  			      ))}
//  			   	</div>
//  			 	</Col>
//  			)
//  		}
//   }

//   renderClientListTags = () => {
//   	const { selectedAssetObject } = this.props;
//  		const { industries, clientList } = selectedAssetObject; 
//  		let renderIndustries = industries.length > 0; 
//  		let renderClientList = clientList.length > 0; 

//  		if (renderIndustries && renderClientList) {
//  			return (
// 				<Col md={6}>
// 			  	<h2 className="tl-asset-secondary-title">Asset Client List</h2>
// 			  	<div className="tl-tech-stack" style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
// 			      {clientList.map((client) => (
// 			        <div className="ar-tag-div-margin5 client" key={client}>
// 			          <h4>{client}</h4>
// 			        </div>
// 			      ))}
// 			   	</div>
// 			 	</Col>
//  			)
//  		} else if (renderClientList) {
//  			return (
//  				<Col md={12}>
//  			  	<h2 className="tl-asset-secondary-title">Asset Client List</h2>
//  			  	<div className="tl-tech-stack" style={{display: 'flex', marginTop: 10, flexWrap: 'wrap'}}>
//  			      {clientList.map((client) => (
//  			        <div className="ar-tag-div-margin5 client" key={client}>
//  			          <h4>{client}</h4>
//  			        </div>
//  			      ))}
//  			   	</div>
//  			 	</Col>
//  			)
//  		}
//  	}

//  	renderConditionalDivider = () => {
// 	 	const { selectedAssetObject } = this.props;
// 		const { industries, clientList } = selectedAssetObject; 
// 		let renderIndustries = industries.length > 0; 
// 		let renderClientList = clientList.length > 0; 

// 		if (renderIndustries || renderClientList) {
// 			return (
// 				<Col md={12} className="horizontal-border-col">
// 				  <div className="horizontal-border-div">
// 				  </div>
// 				</Col>
// 			)
// 		}
//  	}

//   render () {
//     const { selectedAssetObject } = this.props;
//     const { assetTitle, assetOneLiner, assetDescription, assetTeam, technologyStack, assetPageImage, whitepaper, demoVideo, assetCode, useCases, sampleArchitecture, assetImplementation, clientList, industries } = selectedAssetObject; 

//     // ASSET IMAGE IF IT EXISTS
//     const assetImage = assetPageImage ? assetPageImage : placeholderImageUrl; 

//     // HANDLE ASSET BORDER BETWEEN DESC / TEAM 
//     const teamHeightConst = assetTeam.length * 80; 
//     const infoHeightConst = assetDescription.length / 90 * 16; 
//     const teamBorderConst = teamHeightConst > infoHeightConst; 
//     const infoBorder = teamBorderConst ? 'vertical-border-col-none' : 'vertical-border-col-right'
//     const teamBorder = teamBorderConst ? 'vertical-border-col-left' : 'vertical-border-col-none'; 

//     // HANDLE RENDERING VALID ROWS OF MEDIA ELEMENTS 
//     let mediaElements = [whitepaper, demoVideo, assetCode, useCases, sampleArchitecture, assetImplementation ]; 
//     mediaElements = mediaElements.filter((media) => media.hasOwnProperty('mediaTitle')); 
//     const mediaElementRow1 = mediaElements.slice(0, 3); 
//     const mediaElementRow2 = mediaElements.slice(3); 
//     // console.log(mediaElementRow1);
//     // console.log(mediaElementRow2); 
//     return (
//       <Container fluid={true}>
//         <Row> 
//           <Col md={10} offset={{ md: 1 }} style={{ marginTop: 15}}>
// 	          <Row className="ar-asset-floating-row" style={{padding: 0}}>
// 	          	<img src={assetImage} className="ar-asset-header-img" />
// 	          	<Col md={12} style={{ marginTop: 15}}>
// 		          	<h1 className="tl-asset-title">{assetTitle}</h1>
// 		          	<p className="tl-asset-body-text">{assetOneLiner}</p>
// 	          	</Col>
// 	            <Col md={12} className="horizontal-border-col">
// 	              <div className="horizontal-border-div">
// 	              </div>
// 	            </Col>
// 	            <Col md={8} className={infoBorder}>
// 	              <h2 className="tl-asset-secondary-title">Detailed Information</h2>
// 	              <p>{assetDescription}</p>
// 	            </Col>
// 	            <Col md={4} className={teamBorder}>
// 	              <h2>Creator Information</h2>
// 	              {assetTeam.map((teamMember) => {
// 	                const { teamMemberName, teamMemberRole, teamMemberEmail } = teamMember; 
// 	                return (
// 	                  <div className="tl-asset-roles" key={teamMemberName} style={{marginTop: 10, marginBottom: 10}}>
// 	                    <h2 className="tl-asset-member-name">{teamMemberName}</h2>
// 	                    <h2 className="tl-asset-member-body-text">{teamMemberRole}</h2>
// 	                    <p className="tl-asset-member-body-text">{teamMemberEmail}</p>
// 	                  </div>
// 	                )
// 	              })}
// 	            </Col>
// 	            <Col md={12} className="horizontal-border-col">
// 	              <div className="horizontal-border-div">
// 	              </div>
// 	            </Col>
//              	{this.renderTechnologiesTags()}
//              	{this.renderIndustriesTags()}
//              	{this.renderClientListTags()}
//              	{this.renderConditionalDivider()}
// 	            <Col md={12}>
// 	              <h2 className="tl-asset-secondary-title">Asset Documentation</h2>
// 	            </Col>
	  
// 	            {mediaElementRow1.map((media, i) => {
// 	            	if (media.hasOwnProperty('mediaTitle')) {
// 	            		const { mediaTitle, mediaType, mediaLink } = media; 
// 		            	return (
// 		            		<Col md={4} key={mediaTitle} style={{ minHeight: 80}}>
// 		            			<Row>	
// 		            				<Col md={10}>
// 		            					<h2 className="tl-asset-member-body-text">{mediaType}</h2>
// 		            					<a className="ar-asset-member-name" target="_blank" href={mediaLink}>
// 		            						{mediaTitle}
// 		            					</a>
// 		            				</Col>
// 		            			</Row>
// 		            		</Col>
// 		            	)
// 		            }
// 	            })}
// 	            {mediaElementRow2.map((media, i) => {
// 	            	if (media.hasOwnProperty('mediaTitle')) {
// 	            		const { mediaTitle, mediaType, mediaLink } = media; 
// 		            	return (
// 		            		<Col md={4} key={mediaTitle} style={{ minHeight: 80}}>
// 		            			<Row>	
// 		            				<Col md={10}>
// 		            					<h2 className="tl-asset-member-body-text">{mediaType}</h2>
// 		            					<a className="ar-asset-member-name" target="_blank" href={mediaLink}>
// 		            						{mediaTitle}
// 		            					</a>
// 		            				</Col>
// 		            			</Row>
// 		            		</Col>
// 		            	)
// 	            	}
// 	            })}
// 	            <Col md={12}>
// 	              <div style={{height: 50}}>
// 	              </div>
// 	            </Col>
// 	          </Row>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => ({
//   selectedAssetObject: state.assets.fetchedAssetObject
// }); 

// const mapDispatchToProps = (dispatch) => ({
//   // fetchAssetThunk: (assetID) => {
//   //   dispatch(fetchAssetThunk(assetID))
//   // },
// }); 

// export default connect(mapStateToProps, mapDispatchToProps)(AssetPage)