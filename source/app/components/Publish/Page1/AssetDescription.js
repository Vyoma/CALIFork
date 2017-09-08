// REACT
import React from 'react'
import PropTypes from 'prop-types'

// CARBON COMPONENTS
import { TextArea, Tooltip} from 'carbon-components-react'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

const PublishAssetDescription = ({ validateInput, assetDescription, setAssetDescription, onBlur }) => {

  const handleChange = (event) => {
    setAssetDescription(event.target.value)
  }

  const assetDescLengthLimit = 500;
  const isWithinLengthLimit = (assetDescription && (assetDescription.length <= assetDescLengthLimit))

  return (
    <Row className='nt-publishAssetDesc' style={{marginTop: 20}}>
      <Col md={2} offset={{md: 1}}>
        <Tooltip triggerText="Asset Description:">
          <p>
            Please provide a short synopsis of the cognitive assets, up to 200 words.
            This will be displayed as the description of the asset in CALI.
          </p>
        </Tooltip>
      </Col>
      <Col md={8}>
        <TextArea
          className='some-class'
          labelText=''
          invalid={(assetDescription === '' && validateInput) || !isWithinLengthLimit}
          invalidText={'Please provide an asset description, must be less than 500 characters'}
          value={assetDescription}
          onChange={handleChange}
          onBlur={onBlur}
        />
      </Col>
    </Row>
  )
}

export default PublishAssetDescription