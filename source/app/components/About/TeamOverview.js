// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS 
import {Accordion, AccordionItem} from 'carbon-components-react'

// STYLING IMPORT
import styles from '../../styles/about.scss'

const TeamOverview = () => {
  return (
    <Col md={12}>
      <Row>
        <div className={styles['tl-team-bio']}>
          <label className='bx--label'>
            <h2 className={styles['tl-team-bio-title']}>CBDS AI Dev Team</h2>
          </label>
          <div className={styles['tl-team-bio-line']}></div>
            <p className={styles['example-p-style']}> 
            We are a team of engineers, hackers, and futurists who are passionate problem solvers using technology and science. We believe in being a multi disciplinary team collectively bringing the best. We are driven by using the latest and greatest Artificial Intelligence capabilities to resolve challenging business pain points. Our unique, multi-disciplinary expertise enables us to deliver excellent technological solutions for our clients. We are actively reshaping the perception of IBM GBS in the marketplace with strong internal and external eminence from our practice-wide hackathons and innovative white papers.
            </p>
        </div>
      </Row>
      <Row>
        <div className={styles['tl-team-overview']}>
        <Accordion>
          <AccordionItem 
            title="Our Mission Statement" 
            open ={false}> 
            <p>To drive Product and Engineering Eminence in our service offerings in Cognitive.</p>
          </AccordionItem>

          {/* <AccordionItem 
            title="What are our Skills?" 
            open ={false}> 
            <p>Our team comprises of skills needed to build end-to-end cognitive solutions starting from Storage, Compute, DevOps, ETL, Data Foundation, Analytical Modeling, Data Science, Machine Learning, Deep Learning, NLP, Enterprise Solution, Mobile Development, Cloud, SAS, Micro services, On-Premise, Process Transformation, Cognitive Assistant, Unsupervised AI enhancements, Mean Stack, NOSQL Databases, and FULL Stack application development.</p>
          </AccordionItem> */}

          <AccordionItem 
            title="What do we Do?" 
            open ={false}> 
            <p>
            Approach and understand the problem at the source and data level<br/>
            Create a solution stack which is agnostic and leverages the architectural design principles<br/>
            Embrace a fully agile development cycle of realization<br/>
            Operate under a co-located development model<br/>
            </p>

          </AccordionItem>
        </Accordion>
        </div>
      </Row>
  </Col>
  )
}

export default TeamOverview;