// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// APP COMPONENTS
import PublishAssetProgress from '../../components/Publish/PublishAssetProgress'
import PublishPage1 from './Pages/PublishPage1'
import PublishPage2 from './Pages/PublishPage2'
import PublishPage3 from './Pages/PublishPage3'

// ACTION CREATORS
import { initializeAssetConditional } from '../../state/modules/publish'

class PublishPage extends Component {
  static PropTypes = {
    page: PropTypes.number.isRequired,
    initializeAssetConditional: PropTypes.func.isRequired, 
  }

  componentWillMount = () => {
    const { initializeAssetConditional } = this.props; 
    initializeAssetConditional(); 
  }

  render() {
    const { page } = this.props; 

  	return (
  		<Container fluid={true}>
        <Helmet
          title="Project CALI"
        />
  			<Row>
  				<Col md={12}>
            <PublishAssetProgress page={page} />
            {page === 0 && <PublishPage1 />}
            {page === 1 && <PublishPage2 />}
            {page === 2 && <PublishPage3 />}
  				</Col>
  			</Row>
  		</Container>
  	)
  }
}

const mapStateToProps = (state, ownProps) => ({
  page: state.publish.page,
})

const mapDispatchToProps = (dispatch) => ({
  initializeAssetConditional: () => {
    dispatch(initializeAssetConditional())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PublishPage)
