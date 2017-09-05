// REACT
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS
import { Module, ModuleHeader, ModuleBody, Button } from 'carbon-components-react'

// APP COMPONENTS
import PublishReviewInfo from '../../../components/Publish/Page3/PublishReviewInfo.js'

// ACTION CREATORS
import { setPrevPage, publishAssetThunk } from '../../../state/modules/publish'
import { Route, Redirect } from 'react-router-dom';

class PublishPage3 extends Component {
	static PropTypes = {
		publishAssetThunk: PropTypes.func.isRequired, 
	}

	handlePublishAsset = () => {
		// TODO: DEFINE PUBLISH ASSET ACTION
		// -> CALL TO ROOT SERVICE
		const { publishAssetThunk } = this.props; 
		console.log("PUBLISHING ASSET")
		publishAssetThunk(); 
	}

  render () {
    const { setPrevPage, assetID, assetTitle, assetOwner, assetType, assetContributors, artifacts, technologyTags, industryTags, clientTags, publishedAssetBool } = this.props

    // HANDLE NAVIGATION TO ASSET PAGE
    if (publishedAssetBool) {
    	return <Redirect from="/publish" to="/publishedasset"/>
    }

    return (
      <Container fluid={true}>
	      <Row>
	        <Col md={2} offset={{md: 2}}>
	          <Button className='some-class' onClick={setPrevPage}>
		          Back
	          </Button>
	        </Col>
	      </Row>
	      <Row>
	        <Col md={10} offset={{ md: 2 }}>
	          <Module>
	            <ModuleHeader>Review</ModuleHeader>
	            <ModuleBody>
	               <PublishReviewInfo 
	                assetTitle={assetTitle} 
	                assetType={assetType} 
	                assetOwner={assetOwner}
	                assetContributors={assetContributors}
	                artifacts={artifacts}
	                clientTags={clientTags}
	                industryTags={industryTags}
	                technologyTags={technologyTags}
	                />
	            </ModuleBody>
	          </Module>
	        </Col>
	      </Row>
	     	<Row>
		      <Col md={2} offset={{md: 2}}>
            <Button className='some-class' onClick={setPrevPage}>
		          Back
	          </Button>
          </Col>
          <Col md={2} offset={{md: 5}}>
            <Button className='some-class' onClick={this.handlePublishAsset}>
		          Publish
	          </Button>
          </Col>
	     	</Row>
      </Container>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  assetTitle: state.publish.assetTitle,
  assetType: state.publish.assetType,
  assetOwner: state.publish.assetOwner,
  assetContributors: state.publish.assetContributors,
  artifacts:state.publish.artifacts,
  clientTags: state.publish.clientTags,
  industryTags: state.publish.industryTags,
  technologyTags: state.publish.technologyTags,
  publishedAssetBool: state.publish.publishedAssetBool
})

const mapDispatchToProps = (dispatch) => ({
  setPrevPage: () => {
    dispatch(setPrevPage())
  },
  publishAssetThunk: () => {
    dispatch(publishAssetThunk())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PublishPage3)