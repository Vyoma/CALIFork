// REACT
import React from 'react'
import PropTypes from 'prop-types'

// CARBON COMPONENTS
import { TextInput, Tooltip } from 'carbon-components-react'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING


const PublishAssetTitle = ({ assetTitle, setAssetTitle }) => {
  const handleChange = (event) => {
    setAssetTitle(event.target.value)
  }

  return (
    <Row className='nt-AssetTitleRow'>
      <Col md={2} offset={{md: 1}}>
        <Tooltip triggerText="Asset Title">
          <p>
            A searchable title for the cognitive asset.
          </p>
        </Tooltip>
      </Col>
      <Col md={4}>
        <TextInput
          className='some-class'
          id='test2'
          labelText=''
          value={assetTitle}
          placeholder='Asset Title'
          onChange={handleChange} 
        />
      </Col>
    </Row>
  )
}

export default PublishAssetTitle