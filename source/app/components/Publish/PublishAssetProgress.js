// REACT
import React from 'react'
import PropTypes from 'prop-types'
import { ProgressIndicator, ProgressStep } from 'carbon-components-react'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

const PublishAssetProgress = ({ page }) => {
  return (
  	<Container fluid={true}>
	    <Row style={{marginTop: 50 }}>
	      <Col md={10} offset={{ md: 2 }} style={{textAlign: 'center'}}>
	        <ProgressIndicator currentIndex={page + 1}>
		        <ProgressStep label='' description='' />
	          <ProgressStep label='' description='' />
	          <ProgressStep label='' description='' />
	          <ProgressStep label='' description='' />
	        </ProgressIndicator>
	      </Col>
	    </Row>
    </Container>
  )
}

export default PublishAssetProgress
