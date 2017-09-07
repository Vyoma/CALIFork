// REACT
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-grid-system'


// CARBON COMPONENTS
import { Module, ModuleHeader, ModuleBody, Button,
  TextInput, Tag, Dropdown, DropdownItem } from 'carbon-components-react'

  // ACTION CREATORS
import { addTechnologyTag, addClientTag, addIndustryTag, 
  deleteTechnologyTag, deleteClientTag, deleteIndustryTag } from '../../../state/modules/publish'

// SELECTORS 
import { getUniqueIndustries, getUniqueTechnologies, getUniqueClients } from '../../../state/selectors/publish'

const industryArray = [
  "Aerospace & Defense",
  "Automotive",
  "Banking",
  "Chemical & Petroleum",
  "Consumer Products",
  "Education",
  "Electronics",
  "Energy and Utilities",
  "Financial Markets",
  "Government",
  "Healthcare & Life Sciences",
  "Industrial Products",
  "Insurance",
  "Media & Entertainment",
  "Retail",
  "Telecommunications",
  "Travel & Transportation",
  "Wholesale Distribution & Services",
]
  // APP COMPONENTS

const listTags = (tags) => {
  let displayTable = tags.length > 0
  if (displayTable) {
    return (
      tags.map((tag, index) => {
        return (
            <Tag className='some-class' type='beta' key={index} >{tag}</Tag>
        )
      })
    )
  }
}

const editTags = (tags, deleteCategoryTag) => {
  let displayTable = tags.length > 0
  if (displayTable) {
    return (
      tags.map((tag, index) => {
        return (
          <Button 
            kind='ghost' 
            href='#' 
            className='some-class' 
            key={'delete'+index} 
            icon='delete' 
            iconDescription='delete'
            onClick={()=>{
              deleteCategoryTag(index)
            }}
            small>{tag}</Button>
        )
      })
    )
  }
}


class PublishAssetTags extends Component {
  state = {
    technology: '',
    industry: '',
    client: '',
    editTechnology: false,
    editIndustry: false,
    editClient: false
  }

  handleEditTag = (event) => {
    console.log(event)
    if (event.hasOwnProperty('target')) {
      if (event.target.id === 'technology') {
        this.setState({
          technology: event.target.value
        })
      } else if (event.target.id === 'client') {
        this.setState({
          client: event.target.value
        })
      }
    } else {
      this.setState({
        industry: event.value
      })
    }
  }

  handleAddIndustryTag = () => {
    // console.log('in add industry', this.state.industry)
    const { industry } = this.state; 
    if (industry === '') {
      return; 
    }

    this.props.addIndustryTag(this.state.industry)     
    this.setState({
      industry: ''
    })
  }
  handleAddTechnologyTag = () => {
    const { technology } = this.state; 
    if (technology === '') {
      return; 
    }

    this.props.addTechnologyTag(this.state.technology)     
    this.setState({
      technology: ''
    })
  }
  handleAddClientTag = () => {
    const { client } = this.state; 
    if (client === '') {
      return; 
    }

    this.props.addClientTag(this.state.client)     
    this.setState({
      client: ''
    })
  }
  toggleEditTechnology = (event) => {
    event.preventDefault()
    this.setState({
      editTechnology: true
    })
  }
  toggleSaveTechnology = (event) => {
    event.preventDefault()
    this.setState({
      editTechnology: false
    })
  }
  toggleEditIndustry = (event) => {
    event.preventDefault()
    this.setState({
      editIndustry: true
    })
  }
  toggleSaveIndustry = (event) => {
    event.preventDefault()
    this.setState({
      editIndustry: false
    })
  }
  toggleEditClient = (event) => {
    event.preventDefault()
    this.setState({
      editClient: true
    })
  }
  toggleSaveClient = (event) => {
    event.preventDefault()
    this.setState({
      editClient: false
    })
  }



  render () {
    const { industryTags, technologyTags, clientTags } = this.props
    {/* Tag Category Buttons */}
    let tagIndustryButton = null
    if (this.state.editIndustry === false) {
      tagIndustryButton = <Button kind='ghost' onClick={this.toggleEditIndustry} href='#' className='some-class' icon='edit--glyph' iconDescription='edit' small />
    } else {
      tagIndustryButton = <Button kind='ghost' onClick={this.toggleSaveIndustry} href='#' className='some-class' icon='checkmark' iconDescription='checkmark' small />
    }

    let tagTechnologyButton = null
    if (this.state.editTechnology === false) {
      tagTechnologyButton = <Button kind='ghost' onClick={this.toggleEditTechnology} href='#' className='some-class' icon='edit--glyph' iconDescription='edit' small />
    } else {
      tagTechnologyButton = <Button kind='ghost' onClick={this.toggleSaveTechnology} href='#' className='some-class' icon='checkmark' iconDescription='checkmark' small />
    }

    let tagClientButton = null
    if (this.state.editClient === false) {
      tagClientButton = <Button kind='ghost' onClick={this.toggleEditClient} href='#' className='some-class' icon='edit--glyph' iconDescription='edit' small />
    } else {
      tagClientButton = <Button kind='ghost' onClick={this.toggleSaveClient} href='#' className='some-class' icon='checkmark' iconDescription='checkmark' small />
    }


    return (
      <div>
        {/* User Message about generated tags */}
        <Row>
          <Col md={8} offset={{md: 2}}>
            {/* Industry tags: */}
            <Row style={{marginTop: 20}}>
              <Col md={1}>
                {tagIndustryButton}
              </Col>
              <Col md={1}>
                <label className='bx--label'>Industry:</label>
              </Col>
              <Col md={6} offset={{md: 1}}>
                {this.state.editIndustry && editTags(industryTags, this.props.deleteIndustryTag)}
                {!this.state.editIndustry && listTags(industryTags)}
                
                {/*<Button kind='ghost' href='#' className='some-class' icon='edit--glyph' iconDescription='edit' small /> */}
              </Col>
            </Row>
            {/* Edit Industry This will be visible once the user clicks the "edit" button, and the edit button should disappear */}
            {this.state.editIndustry && <Row style={{marginTop: 20}}>
              <Col md={6} offset={{md: 1}}>
                <Dropdown onChange={this.handleEditTag}
                  className='some-class'
                  id='industry'
                  value={this.state.industry}
                  defaultText='Add Industry'>
                  {industryArray.map((i) => (
                    <DropdownItem key={i} itemText={i} value={i} />
                  ))}
                </Dropdown>
              </Col>
              <Col md={2}>
                <Button kind='ghost' href='#' id='industryAdd' onClick={this.handleAddIndustryTag} className='some-class' icon='add' iconDescription='add' />
              </Col>
              
            </Row>}
            
            
              
            
            {/* Technology tags: */}
            <Row style={{marginTop: 20}}>
              <Col md={1}>
                {tagTechnologyButton}
              </Col>
              <Col md={1}>
                <label className='bx--label'>Technology:</label>
              </Col>
              <Col md={6} offset={{md: 1}}>
                {this.state.editTechnology && editTags(technologyTags, this.props.deleteTechnologyTag)}
                {!this.state.editTechnology && listTags(technologyTags)}
              </Col>
            </Row>
            {/* Edit Technology: will be visible once the user clicks the "edit" button, and the edit button should disappear */}
             {this.state.editTechnology && <Row>
              <Col md={3} offset={{md: 1}}>
               <TextInput className='some-class' id='technology' labelText='' placeholder='Add Technology' value={this.state.technology} onChange={this.handleEditTag} />
              </Col>
              <Col md={2}>
                <Button kind='ghost' href='#' id='technologyAdd' className='some-class' icon='add' onClick={this.handleAddTechnologyTag} iconDescription='add' />
              </Col>
            </Row>}

            {/* Client tags: */}
            <Row style={{marginTop: 20}}>
              <Col md={1}>
                {tagClientButton}
              </Col>
              <Col md={1}>
                <label className='bx--label'>Clients:</label>
              </Col>
              <Col md={6} offset={{md: 1}}>
                {this.state.editClient && editTags(clientTags,this.props.deleteClientTag)}
                {!this.state.editClient && listTags(clientTags)}
              </Col>
            </Row>
            {this.state.editClient && <Row>
              <Col md={3} offset={{md: 1}}>
                <TextInput className='some-class' id='client' labelText='' placeholder='Add Client' value={this.state.client} onChange={this.handleEditTag}/>
              </Col>
              <Col md={2}>
                <Button kind='ghost' href='#' id='clientAdd' className='some-class' icon='add' onClick={this.handleAddClientTag} iconDescription='add' />
              </Col>
            </Row>}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  // industryTags: state.publish.industryTags,
  // technologyTags: state.publish.technologyTags,
  // clientTags: state.publish.clientTags,
  industryTags: getUniqueIndustries(state), 
  technologyTags: getUniqueTechnologies(state), 
  clientTags: getUniqueClients(state),
})

const mapDispatchToProps = (dispatch) => ({
  addClientTag: (tag) => {
    dispatch(addClientTag(tag))
  },
  addIndustryTag: (tag) => {
    dispatch(addIndustryTag(tag))
  },
  addTechnologyTag: (tag) => {
    dispatch(addTechnologyTag(tag))
  },
  deleteClientTag: (tag) => {
    dispatch(deleteClientTag(tag))
  },
  deleteIndustryTag: (tag) => {
    dispatch(deleteIndustryTag(tag))
  },
  deleteTechnologyTag: (tag) => {
    dispatch(deleteTechnologyTag(tag))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PublishAssetTags)
