// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS
import { Tooltip, TextInput, Button, Table, TableHead, TableRow, TableHeader, TableBody, TableData} from 'carbon-components-react'

// APP COMPONENTS 
import AssetContributorInput from './AssetContributorInput'

// ACTION CREATORS
import { setAssetContributor, deleteContributor } from '../../../state/modules/publish'

const ToolTipComponent = () => (
  <Tooltip triggerText="Contributors:">
    <p>
      Please add the full name, role, and email addresses of the contributors to the asset. 
    </p>
    <p className="bx--tooltip__label">
      Guidance:
    </p>
    <p>
      After entering the required info, please click the "+" button to add them to the Contributors table.
      If there is an error, click the trash icon to remove the contributor.
    </p>
  </Tooltip>
)

class PublishAssetContributors extends Component {
  state = {
  	name: '',
  	role: '',
  	email: ''
  }

  handleInput = (event) => {
    if (event.target.id === 'name') {
      this.setState({
        name: event.target.value
      })
    } else if (event.target.id === 'role') {
      this.setState({
        role: event.target.value
      })
    } else {
      this.setState({
        email: event.target.value
      })
    }
  }

  handleAdd = () => {
  	const { setAssetContributor } = this.props; 
    setAssetContributor(this.state)
    this.setState({
      name: '',
      role: '',
      email: ''
    })
  }

  render () {
  	const { assetContributors } = this.props; 
  	let { name, email, role } = this.state; 
    // const tableRows = listContributors(this.props.assetContributors); 
    return (
      <Row className="" style={{marginTop: 20}}>
        <Col md={12} offset={{md: 1}}>
          <ToolTipComponent />
        </Col>
        <Col md={10} offset={{md: 1}}>
          <Table>
            <TableHead>
              <TableRow header>
                <TableHeader>Name</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader />
              </TableRow>
            </TableHead>
            <TableBody>
              {assetContributors.map((contributor, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{contributor.name}</TableData>
                    <TableData>{contributor.role}</TableData>
                    <TableData>{contributor.email}</TableData>
                    <TableData>
                      <Button
                        kind='ghost'
                        icon='delete'
                        iconDescription='Delete'
                        style={{margin:5}}
                        onClick={()=>{
                          this.props.deleteContributor(index)
                        }}
                      />
                    </TableData>
                  </TableRow>
                )
              })} 
              <AssetContributorInput 
                name={name}
                role={role}
                email={email}
                handleAdd={this.handleAdd}
                handleInput={this.handleInput}
              />
            </TableBody>
          </Table>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  assetContributors: state.publish.assetContributors,
})

const mapDispatchToProps = (dispatch) => ({
	setAssetContributor: (contributor) => {
	  dispatch(setAssetContributor(contributor))
	},
  deleteContributor: (index) => {
    dispatch(deleteContributor(index))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PublishAssetContributors)