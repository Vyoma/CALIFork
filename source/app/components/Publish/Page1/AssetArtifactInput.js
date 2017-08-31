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

const initialState = {
  type: '',
  url: '',
  name: '',
  // fileName: '',
  description: '',
  confidential: false, 
  open: false,
  file: null, 
}

const initialTestState = {
  type: 'Whitepaper',
  url: '',
  name: 'Test Whitepaper-v2',
  // fileName: '',
  description: 'I am testing the upload for a document',
  confidential: false, 
  open: false,
  file: null, 
}

class PublishAddAssetModal extends Component {
	state = initialTestState

  handleChangeType = (event) => {
  	const type = event.target.value
    this.setState({ type }); 
  }

  handleChangeName = (event) => {
  	const name = event.target.value
    this.setState({ name }); 
  }

  handleChangeUrl = (event) => {
  	const url = event.target.value
    this.setState({ url }); 
  }

  handleChangeDescription = (event) => {
		const description = event.target.value
	  this.setState({ description }); 
  }

  handleToggle = (event) => {
  	let { confidential } = this.state; 
  	this.setState({ confidential: !confidential }); 
  }

  // handleUpload = (event) => {
  //   event.stopPropagation();    
  //   let files = event.target.files
  //   console.log('files', files)
  //   this.props.startFileLoad()
  //   if (files.length > 0) {
  //     let singleFile = files[0]
  //     this.setState({fileName: singleFile.name})
  //     this.props.getAssetTags(files)
  //   }

  //   // TODO: TRIGGER UPLOAD THUNK 
  //   // -> SET LOAD
  //   // -> SEND TO BARAK
  // }

  handleUpload = (event) => {
    event.stopPropagation(); 
    // ERROR HANDLING FOR FILE ATTACHED
    let files = event.target.files
    if (files.length === 0) {
      return; 
    }

    // 
    const { getAssetTagsThunk } = this.props; 
    let file = files[0]
    getAssetTagsThunk(file); 
    this.setState({ file }); 
  }

  handleSubmit = (event) => {
    console.log('FIRING SUBMIT')
    event.preventDefault(); 
    const { addAssetArtifactThunk } = this.props; 

    // ERROR HANDLING FOR BLANK FIELDS 
    const { name, type, description, url, file } = this.state; 
    if (!name || !type || !description || (!url && !file)) {
      return; 
    }

    addAssetArtifactThunk(this.state)

    // RESET TO INITIAL STATE AND CLOSE MODAL
    this.setState({
      type: '',
      name: '',
      url: '',
      // fileName: '',
      description: '',
      confidential: false,
      file: null, 
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
    let { type } = this.state; 
    const renderInterface = type !== ''; 

    // ESCAPE IF WE HAVEN"T SELECTED A TYPE; 
    if (!renderInterface) {
      return; 
    }

    // DETERMINE TYPE 
    const links = ['Demo Video Link','Code Repo','Reference Website']
    const interfaceType = links.includes(type) ? 'link' : 'file'; 
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
		          value={this.state.url}
		          onChange={this.handleChangeUrl}
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
    let { type, open } = this.state; 

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
          >
            <LOCAL_ModalHeaderComponent />
            {/* Artifact Type Picker */}
            <SelectArtifactType
              type={type}
              handleChangeType={this.handleChangeType}
            />
            {/* Artifact File Name Text Input */}
            <TextInput
              labelText='Artifact Name:'
              id='FileName'
              placeholder='Artifact Name to be displayed'
              value={this.state.name}
              onChange={this.handleChangeName}
            />
            {this.renderConditionalArtifactInterface()}
            <TextArea
              labelText='Artifact Description:'
              placeholder='Short description of artifact uploaded'
              disabled={false}
              value={this.state.description}
              onChange={this.handleChangeDescription}
            />
            <Toggle onToggle={this.handleToggle} className="some-class" id="toggle-1" toggled={this.state.confidential}/>
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