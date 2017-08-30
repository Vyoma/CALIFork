// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS
import { Tooltip, Button, Table, TableHead, TableRow, TableHeader, TableBody, TableData} from 'carbon-components-react'

// APP COMPONENTS
import ModalWrapper from './ModalWrapper.js'
import SelectArtifactType from './SelectArtifactType'

// ACTION CREATORS
import { deleteArtifact } from '../../../state/modules/publish'

class AssetArtifactTable extends Component {
  static PropTypes = {
    deleteArtifact: PropTypes.func.isRequired, 
  }
  
  mapArtifacts = () => {
    const { artifacts } = this.props; 
    let displayTable = artifacts.length > 0; 

    if (displayTable) {
      return (
        artifacts.map((artifact, index) => {
          return (
            <TableRow key={index}>
              <TableData>{artifact.name}</TableData>
              <TableData>{artifact.type}</TableData>
              {artifact.url && <TableData>{artifact.url}</TableData>}
              {artifact.fileName && <TableData>{artifact.fileName}</TableData>}
              <TableData>
                <Button
                  kind='ghost'
                  icon='delete'
                  iconDescription='Delete'
                  style={{margin: 3}}
                  onClick={()=>{
                    deleteArtifact(index)
                  }}
                />
              </TableData>
            </TableRow>
          )
        })
      )
    }
  }

  render () {
    const artifactRows = this.mapArtifacts(); 

    return (
      <Row className='' style={{marginTop: 20}}>
        <Col md={12} offset={{md: 1}}>
          <Tooltip triggerText="Asset Artifacts:">
            <p>
              Please click the "Upload Artifact" button to upload files and provide information about the artifacts related to the cognitive asset.  
              You are encouraged to upload as many artifacts as will enable your fellow practitioners.
            </p>
            <p className="bx--tooltip__label">
              Guidance
            </p>
            <p>
              For extended guidance on uploading artifacts, please see FAQS.
            </p>
          </Tooltip>
        </Col>
        <Col md={10} offset={{md: 1}}>
          <Table>
            <TableHead>
              <TableRow header>
                <TableHeader>Artifact Name</TableHeader>
                <TableHeader>Artifact Type</TableHeader>
                <TableHeader>FileName/URL</TableHeader>
                <TableHeader />
              </TableRow>
            </TableHead>
            <TableBody>
              {artifactRows}
            </TableBody>
          </Table>
        </Col>
      </Row>
      )
    }
}


const mapDispatchToProps = (dispatch) => ({
  deleteArtifact: (index) => {
    dispatch(deleteArtifact(index))
  },
})

export default connect(null, mapDispatchToProps)(AssetArtifactTable)