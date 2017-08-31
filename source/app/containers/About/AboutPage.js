// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS
import { Module, ModuleBody } from 'carbon-components-react'


// APP COMPONENTS
import TeamOverview from '../../components/About/TeamOverview.js'
import TeamBios from '../../components/About/TeamBios.js'

const About = () => {
  return (
    <Container fluid={true}>
	    <Row>
	      <Col md={8} offset={{md:2}}>
	        <Module 
	          size='double'
	          className="some-class">
	        <ModuleBody>
	        <Row>
	          <TeamOverview />
	        </Row>
	        <Row style={{marginTop:20}}>
	          <TeamBios />
	        </Row>
	        </ModuleBody>
	        </Module>
	      </Col>
	    </Row>
    </Container>
  )
}

export default About;