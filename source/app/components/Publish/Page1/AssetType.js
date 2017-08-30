// REACT
import React from 'react'
import PropTypes from 'prop-types'

// CARBON COMPONENTS
import { Select, SelectItem, Tooltip } from 'carbon-components-react'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

const ToolTipSpan = () => (
  <span style={{marginTop: 15}}>
    <Tooltip triggerText="Asset Type:">
      <p className="bx--tooltip__label">
        Art of the Possible
      </p>
      <p>
        A collection of ideas about a solution for which no demonstrable artifacts that execute the capabilities of the solution exist.
      </p>
      <p className="bx--tooltip__label">
        Prototype
      </p>
      <p>A demonstrable asset at the Proof of Concept or Minimum Viable Product level. 
        This is a level above the Art of the Possible, as this has executed the idea at the code level. 
        Does not yet reside in a client's system.
      </p>
      <p className="bx--tooltip__label">
        Offering
      </p>
      <p>
        Fully demonstrable artifacts, has already been deployed into a client's system.
      </p>
    </Tooltip>
  </span>
)

const PublishAssetType = (props) => {
  const handleChange = (event) => {
    props.setAssetType(event.target.value)
  }

  return (
    <Row className=''style={{marginTop: 20}}>
      <Col md={2} offset={{md: 1}}>
        <ToolTipSpan />        
      </Col>
      <Col md={4}>
        <Select className='some-class' labelText='' id='select-1' value={props.assetType} defaultValue='placeholder-item' onChange={handleChange}>
          <SelectItem disabled hidden value='placeholder-item' text='Select Asset Type' />
          <SelectItem value='Art of the Possible' text='Art Of The Possible' />
          <SelectItem value='Prototype' text='Prototype' />
          <SelectItem value='Offering' text='Offering' />
        </Select>
      </Col>
    </Row>
  )
}

export default PublishAssetType
