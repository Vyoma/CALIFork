// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS
import { Toggle, Modal, Select, SelectItem, TextInput, TextArea, Button, FileUploader, Loading } from 'carbon-components-react'

// APP COMPONENTS
import ModalWrapper from './ModalWrapper.js'
import SelectArtifactType from './SelectArtifactType'

// ACTION CREATORS
import { getAssetTagsThunk, addAssetArtifactThunk, startFileLoad } from '../../../state/modules/publish'

const LOCAL_ModalHeaderComponent = () => (
	<div>
		<label className="bx--label">Guidance: </label>
		<p style={{marginBottom: 15}}>
		  Please select the best match for your artifact type.  
		  All files must be uploaded from your local machine.  
		  The "Code Repo", "Reference Website", and "Demo Videos" accept URLs rather than files.  
		</p>
	</div>
)

// NOTE: SAVING IN CASE WE NEED TO EXPAND THE EXPLANATION OF THE TOGGLE
const LOCAL_ToggleConfidential = ({ confidential, handleToggle}) => (
  <Container fluid={true}>
    <Row>
      <Col md={8}>
      </Col>
      <Col md={4}>
        <p>{confidential ? 'IBM CONFIDENTIAL' : 'IBM SHAREABLE'}</p>
      </Col>
    </Row>
  </Container>
)

const initialState = {
  artifactType: '',
  artifactTitle: '',
  artifactURL: '',
  artifactDescription: '',
  confidential: false, 
  open: false,
  file: null,
  validateInput: false,  
}

class PublishAddAssetModal extends Component {
	state = initialState

  handleChangeType = (event) => {
  	const artifactType = event.target.value
    console.log(artifactType); 
    this.setState({ artifactType }); 
  }

  handleChangeTitle = (event) => {
  	const artifactTitle = event.target.value
    this.setState({ artifactTitle }); 
  }

  handleChangeUrl = (event) => {
  	const artifactURL = event.target.value
    this.setState({ artifactURL }); 
  }

  handleChangeDescription = (event) => {
		const artifactDescription = event.target.value
	  this.setState({ artifactDescription }); 
  }

  handleToggle = (event) => {
  	let { confidential } = this.state; 
  	this.setState({ confidential: !confidential }); 
  }

  handleUpload = (event) => {
    event.stopPropagation(); 
    // ERROR HANDLING FOR FILE ATTACHED
    let files = event.target.files
    if (files.length === 0) {
      return; 
    }

    const { getAssetTagsThunk } = this.props; 
    let file = files[0]
    getAssetTagsThunk(file); 
    this.setState({ file }); 
  }

  handleSubmit = (event) => {
    event.preventDefault(); 
    const { addAssetArtifactThunk } = this.props; 

    // ERROR HANDLING FOR BLANK FIELDS 
    const { artifactTitle, artifactType, artifactDescription, artifactURL, file } = this.state; 
    if (!artifactTitle || !artifactType || !artifactDescription || (!artifactURL && !file)) {
      console.log('ABORTING SUBMIT DUE TO MISSING PARAMETERS')
      this.setState({ validateInput: true }); 
      return; 
    }

    // CALL ADD THUNK 
    addAssetArtifactThunk(this.state)

    // RESET TO INITIAL STATE AND CLOSE MODAL
    this.setState({
      file: null, 
      artifactTitle: '',
      artifactType: '',
      artifactURL: '',
      artifactDescription: '',
      confidential: false,
      validateInput: false, 
    })
    this.handleCloseModal()
  }

  handleOpenModal = () => {
    this.setState({ open: true })
  }

  handleCloseModal = () => {
    this.setState({ open: false, type: '' })
  }

  isLink = (type) => {
    const links = ['Demo Video Link','Code Repo','Reference Website']
    return links.includes(type)
  }

  renderConditionalArtifactInterface = () => {
    let { artifactType, artifactURL } = this.state; 
    const renderInterface = artifactType !== ''; 

    // ESCAPE IF WE HAVEN"T SELECTED A TYPE; 
    if (!renderInterface) {
      return; 
    }

    // DETERMINE TYPE 
    const links = ['Demo Video Link','Code Repo','Reference Website']
    const interfaceType = links.includes(artifactType) ? 'link' : 'file'; 
    let interfaceComponent; 


    if (interfaceType === 'file') {
    	interfaceComponent = (
    		<Row>
    			<Col md={8}>
		    		<FileUploader
		          labelTitle='Asset Artifacts'
		          buttonLabel='Upload Artifacts'
		          filenameStatus='edit'
		          onChange={this.handleUpload}
		        />
    			</Col>
    			<Col md={4}>
    				{this.props.loading && (
    					<Loading className="some-class" small withOverlay={false} active={this.props.loading}>Loading</Loading>
    				)}
    			</Col>
    		</Row>
    	)
    } else {
    	interfaceComponent = (
    		<Row>
    			<Col md={8}>
		    		<TextInput
		          labelText='URL:'
		          id='URL'
		          value={artifactURL}
		          onChange={this.handleChangeUrl}
              invalid={artifactURL === '' && validateInput}
              invalidText='Please provide a link to this artifact'
		        />
		      </Col>
		    </Row>
    	)
    }

    return (
    	<Container fluid={true}>
    		{interfaceComponent}
    	</Container>
    )
  }

  render () {
    let { artifactTitle, artifactType, artifactDescription, confidential, open, validateInput } = this.state; 

    return (
      <Row style={{marginTop: 20}}>
        <Col md={2} offset={{md: 9}}>
          <ModalWrapper
            buttonTriggerText='Upload Artifact'
            modalHeading='Upload Artifact'
            modalLabel=''
            open={open}
            handleSubmit={this.handleSubmit}
            handleOpen={this.handleOpenModal}
            handleClose={this.handleCloseModal}
            styles={{maxHeight: '90%'}}
          >
            <LOCAL_ModalHeaderComponent />
            {/* Artifact Type Picker */}
            <SelectArtifactType
              type={artifactType}
              invalid={artifactType === '' && validateInput}
              handleChangeType={this.handleChangeType}
            />
            {/* Artifact File Name Text Input */}
            <TextInput
              labelText='Artifact Title:'
              id='FileName'
              placeholder='Artifact Title to be displayed'
              value={artifactTitle}
              onChange={this.handleChangeTitle}
              invalid={artifactTitle === '' && validateInput}
              invalidText='Please enter a title for this artifact'
            />
            <TextArea
              labelText='Artifact Description:'
              placeholder='Short description of artifact uploaded'
              disabled={false}
              value={artifactDescription}
              onChange={this.handleChangeDescription}
              invalid={artifactDescription === '' && validateInput}
              invalidText='Please enter a description for this artifact'
              rows={2}
            />
            {this.renderConditionalArtifactInterface()}
            <Toggle id="toggle-1" labelA="IBM Shareable" labelB="Confidential" onToggle={this.handleToggle}/>
          </ModalWrapper>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  assetContributors: state.publish.assetContributors,
  artifacts: state.publish.artifacts,
  loading: state.publish.loading,
})

const mapDispatchToProps = (dispatch) => ({
  getAssetTagsThunk: (assetTitle) => {
    dispatch(getAssetTagsThunk(assetTitle))
  },
  addAssetArtifactThunk: (artifact) => {
    dispatch(addAssetArtifactThunk(artifact))
  },
  startFileLoad: () => {
    dispatch(startFileLoad())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PublishAddAssetModal)