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
import { setPrevPage, setNextPage } from '../../../state/modules/publish'

  // APP COMPONENTS
import PublishAssetTags from '../../../components/Publish/Page2/PublishAssetTags.js'

class PublishPage2 extends Component {
  render () {
    const { setPrevPage, setNextPage } = this.props
    return (
      <Container fluid={true}>
        <Row>
          <Col md={2} offset={{md: 2}}>
            <Button className='some-class' onClick={setPrevPage}>
              Back
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={8} offset={{md: 2}}>
            <Module>
              <ModuleHeader>Cognitive Asset Tags</ModuleHeader>
              <ModuleBody>We have auto-generated the below tags based on the materials and context provided so far.  Please validate the tags as applicable, and add more tags if needed.
                <PublishAssetTags />
              </ModuleBody>
            </Module>
          </Col>
        </Row>
        <Row>
          <Col md={2} offset={{md: 2}}>
            <Button className='some-class' onClick={setPrevPage}>
              Back
            </Button>
          </Col>
          <Col md={2} offset={{md: 5}}>
            <Button className='some-class' onClick={setNextPage}>
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  setNextPage: () => {
    dispatch(setNextPage())
  },
  setPrevPage: () => {
    dispatch(setPrevPage())
  }
})

export default connect(null, mapDispatchToProps)(PublishPage2)
