// REACT
import React from 'react'
import PropTypes from 'prop-types'

// CARBON COMPONENTS
import { TextArea, Tooltip, TextInput } from 'carbon-components-react'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

const PublishAssetOwner = (props) => {
  
  const handleChangeName = (event) => {
  	let name = event.target.value; 
  	props.setAssetOwner('name', name); 
  }

  const handleChangeEmail = (event) => {
  	let email = event.target.value; 
  	props.setAssetOwner('email', email); 
  }

  return (
    <Row className='' style={{marginTop: 20}}>
      <Col md={2} offset={{md: 1}}>
         <Tooltip triggerText="Asset Owner:">
          <p>
            The lead or single point of contact for the cognitive asset.
          </p>
        </Tooltip>
      </Col>
      <Col md={2}>
        <TextInput
          className='some-class'
          id='ownerName'
          labelText=''
          value={props.assetOwner.name}
          placeholder='Asset Owner Name'
          onChange={handleChangeName}
        />
      </Col>
      <Col md={1} offset={{md: 1}}>
        <label className='bx--label'>Owner Email:</label>
      </Col>
      <Col md={2}>
        <TextInput
          className='some-class'
          id='email'
          labelText=''
          value={props.assetOwner.email}
          placeholder='Asset Owner Email'
          onChange={handleChangeEmail}
        />
      </Col>
    </Row>
  )
}

export default PublishAssetOwner