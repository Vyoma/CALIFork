// REACT
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS
import { Module, ModuleHeader, ModuleBody, Button } from 'carbon-components-react'

// ACTION CREATORS
import { setAssetTitle, setAssetType, setAssetOwner, setAssetContributor, setNextPage, setPrevPage } from '../../../state/modules/publish'

// APP COMPONENTS
import PublishAssetTitle from '../../../components/Publish/Page1/AssetTitle'
import PublishAssetType from '../../../components/Publish/Page1/AssetType'
import PublishAssetDescription from '../../../components/Publish/Page1/AssetDescription'
import PublishAssetPublisher from '../../../components/Publish/Page1/AssetPublisher'
// TODO: REFORMAT 
import PublishAssetOwner from '../../../components/Publish/Page1/AssetOwner'
import PublishAssetContributors from '../../../components/Publish/Page1/AssetContributors'
import PublishAddAssetModal from '../../../components/Publish/Page1/AssetArtifactInput'
import PublishAssetArtifactTable from '../../../components/Publish/Page1/AssetArtifactTable.js'

class PublishPage1 extends Component {
  render () {
    const { setAssetTitle, setAssetType, setAssetOwner, setAssetContributor,
      assetContributors, artifacts, setNextPage, assetTitle, assetType, assetOwner } = this.props;

    return (
      <Container fluid={true}>
      	<Row>
	        <Col md={8} offset={{md: 2}}>
	          <Module>
	            <ModuleHeader>Asset Information</ModuleHeader>
	            <ModuleBody>
                <Container fluid={true}>
  	              {/* Asset Information Section */}
  	              <PublishAssetTitle setAssetTitle={setAssetTitle} assetTitle={assetTitle} />

  	              {/* Asset Type */}
  	              <PublishAssetType setAssetType={setAssetType} assetType={assetType} />

  	              {/* Asset Description Section */}
  	              <PublishAssetDescription />

  	              {/* Asset Publisher Section */}
  	              <PublishAssetPublisher />

  	              {/* Asset Owner Section */}
  	              <PublishAssetOwner setAssetOwner={setAssetOwner} assetOwner={assetOwner} />

  	              {/* <PublishAssetContributors /> */}
  	              <PublishAssetContributors />

  	              {/* Added Asset Artifacts */}
  	              <PublishAssetArtifactTable artifacts={artifacts} />

  	              {/* Add Asset Artifacts */}
  	              <PublishAddAssetModal />
                </Container>
	            </ModuleBody>
	          </Module>
	        </Col>
      	</Row>
        <Row style={{marginTop: 20}}>
          <Col md={2} offset={{md: 9}}>
            <Button className='some-class' onClick={setNextPage}>
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  assetContributors: state.publish.assetContributors,
  artifacts: state.publish.artifacts,
  assetTitle: state.publish.assetTitle,
  assetType: state.publish.assetType,
  assetOwner: state.publish.assetOwner
})

const mapDispatchToProps = (dispatch) => ({
  setAssetTitle: (assetTitle) => {
    dispatch(setAssetTitle(assetTitle))
  },
  setAssetType: (assetType) => {
    dispatch(setAssetType(assetType))
  },
  setAssetOwner: (ownerSubType, value) => {
    dispatch(setAssetOwner(ownerSubType, value))
  },
  setAssetContributor: (contributor) => {
    dispatch(setAssetContributor(contributor))
  },
  setNextPage: () => {
    dispatch(setNextPage())
  },
  setPrevPage: () => {
    dispatch(setPrevPage())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PublishPage1)