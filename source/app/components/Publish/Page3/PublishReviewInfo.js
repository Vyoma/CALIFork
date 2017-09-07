// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS
import { Table, TableData, TableHead, TableHeader, TableRow, TableBody, Tag } from 'carbon-components-react'

// ACTION CREATORS
import { getAssetTags, addAssetArtifact, startFileLoad } from '../../../state/modules/publish'

// SELECTORS 
import { getUniqueIndustries, getUniqueTechnologies, getUniqueClients } from '../../../state/selectors/publish'

const LOCAL_AssetDetailRow = ({label, value}) => {
	return (
		<Row>
		  <Col md={3} offset={{md:1}}>
		    <label className="bx--label">{`${label}:`}</label>
		  </Col>
		  <Col md={3}>
		    <p>{value}</p>
		  </Col>
		</Row>
	)
}

class PublishReviewInfo extends Component {
	static PropTypes = {
		assetContributors: PropTypes.arr,
	}

	reviewContributors = (assetContributors) => {
	  let displayTable = assetContributors.length > 0
	  if (displayTable) {
	    return (
        assetContributors.map((contributor, index) => {
          return (
            <TableRow key={index}>
              <TableData>{contributor.name}</TableData>
              <TableData>{contributor.role}</TableData>
              <TableData>{contributor.email}</TableData>
            </TableRow>
          )
        })
	    )
	  }
	}

	reviewArtifacts = (artifacts)=>{
	  let displayArtifactTable = artifacts.length > 0
	  if (displayArtifactTable) {
	    return (
	        artifacts.map((artifact, index) => {
	        	const { artifactTitle, artifactType, artifactURL } = artifact; 
	          return (
	            <TableRow key={index}>
	              <TableData>{artifactTitle}</TableData>
	              <TableData>{artifactType}</TableData>
	              <TableData>{artifactURL}</TableData>
	            </TableRow>
	          )
	        })
	    )
	  }
	}

	reviewTags = (tags)=> {
	  let displayTagTable = tags.length > 0
	  if (displayTagTable) {
	    return (
	        tags.map((tag, index) => {
	          return (
	            <Tag className='some-class' type='beta' key={index}>{tag}</Tag> 
	          )
	        })
	    )
	  }
	}

	render() {
		const { assetTitle, assetType, assetOwner, assetContributors, artifacts, clientTags, industryTags, technologyTags } = this.props; 
		
		return (
			<div>
				<LOCAL_AssetDetailRow label={'Asset Title'} value={assetTitle} />
				<LOCAL_AssetDetailRow label={'Asset Type'} value={assetType} />
				<LOCAL_AssetDetailRow label={'Asset Owner'} value={assetOwner.name} />
				<Row>
				  <Col md={3} offset={{md: 1}}>
				    <label className="bx--label">Asset Contributors:</label>
				  </Col>
				</Row>
				<Row>
				  <Col md={10} offset={{md: 1}}>
				    <Table>
				      <TableHead>
				        <TableRow header>
				          <TableHeader>Name</TableHeader>
				          <TableHeader>Role</TableHeader>
				          <TableHeader>Email</TableHeader>
				        </TableRow>
				      </TableHead>
				      <TableBody>
				        {this.reviewContributors(assetContributors)}
				      </TableBody>
				    </Table>
				  </Col>
				</Row>
				

				{/* Artifacts*/}
				<Row>
				 <Col md={3} offset={{md: 1}}>
				  <label className="bx--label">Asset Artifacts:</label>
				  </Col>
				</Row>
				<Row>
				  <Col md={10} offset={{md: 1}}>
				    <Table>
				      <TableHead>
				        <TableRow header>
				          <TableHeader>Artifact Name</TableHeader>
				          <TableHeader>Artifact Type</TableHeader>
				          <TableHeader>Artifact FileName/URL</TableHeader>
				        </TableRow>
				      </TableHead>
				      <TableBody>
				        {this.reviewArtifacts(artifacts)}
				      </TableBody>
				    </Table>
				  </Col>
				</Row>

				{/* Tags*/}
				<Row>
				  {/* Industry tags: */}
				  <Row style={{marginTop: 20}}>
				    <Col md={2} offset={{md: 1}}>
				      <label className='bx--label'>Industry:</label>
				    </Col>
				    <Col md={8} offset={{md: 1}}>
				      {this.reviewTags(industryTags)}
				     </Col>
				  </Row>
				  <Row style={{marginTop: 20}}>
				    <Col md={2} offset={{md: 1}}>
				      <label className='bx--label'>Technology:</label>
				    </Col>
				    <Col md={8} offset={{md: 1}}>
				      {this.reviewTags(technologyTags)}
				     </Col>
				  </Row>
				  <Row style={{marginTop: 20}}>
				    <Col md={2} offset={{md: 1}}>
				      <label className='bx--label'>Client:</label>
				    </Col>
				    <Col md={8} offset={{md: 1}}>
				      {this.reviewTags(clientTags)}
				     </Col>
				  </Row>
				</Row>
			</div>	
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
  assetTitle: state.publish.assetTitle,
  assetType: state.publish.assetType,
  assetOwner: state.publish.assetOwner,
  assetContributors: state.publish.assetContributors,
  artifacts: state.publish.artifacts,
  // clientTags: state.publish.clientTags,
  // industryTags: state.publish.industryTags,
  // technologyTags: state.publish.technologyTags,
  industryTags: getUniqueIndustries(state), 
  technologyTags: getUniqueTechnologies(state), 
  clientTags: getUniqueClients(state),
})

const mapDispatchToProps = (dispatch) => ({
  setPrevPage: () => {
    dispatch(setPrevPage())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PublishReviewInfo)