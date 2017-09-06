// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS 
import {Accordion, AccordionItem} from 'carbon-components-react'

const placeholderImage = 'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg'; 

// STYLING IMPORT
import styles from '../../styles/about.scss'

const TeamOverview = () => {
  return (
    <Col md={12}>
      <Row>
        <img src={placeholderImage}/>
      </Row>
      <Row>
        <div className={styles['tl-team-bio']}>
          <label className='bx--label'>
            <h2 className={styles['tl-team-bio-title']}>CBDS AI Dev Team</h2>
          </label>
          <div className={styles['tl-team-bio-line']}></div>
            <p className={styles['example-p-style']}> 
              Pumpkin spice Write Me A Song Country. Music Hall of Fame write a song about pumpkin spice. Cats vote for Taylor trouble Loft 89. Available at Target best dress best dress Meredith. Grey enchanted I'm on the bleachers sparkly dress girlnextdooritis Karlie. Kloss Kanye West Famous Loft 89 Emma Stone available at. Target Lily Aldridge Tribeca gym Ed Sheeran Jake Gyllenhaal Tree. Paine situation Christmas music darling I'm a nightmare. Dressed like a daydream 22 for me I think Met Gala. Romeo so basically Katy Perry mean refrigerator light. 
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

          <AccordionItem 
            title="Who are We?" 
            open ={false}> 
            <p>We are a team of engineers, hackers, and futurists who are passionate problem solvers using technology and science. We believe in being a multi disciplinary team collectively bringing the best. We are driven by using the latest and greatest Artificial Intelligence capabilities to resolve challenging business pain points. Our unique, multi-disciplinary expertise enables us to deliver excellent technological solutions for our clients. We are actively reshaping the perception of IBM GBS in the marketplace with strong internal and external eminence from our practice-wide hackathons and innovative white papers.</p>
          </AccordionItem>

          <AccordionItem 
            title="What are our Skills?" 
            open ={false}> 
            <p>Our team comprises of skills needed to build end-to-end cognitive solutions starting from Storage, Compute, DevOps, ETL, Data Foundation, Analytical Modeling, Data Science, Machine Learning, Deep Learning, NLP, Enterprise Solution, Mobile Development, Cloud, SAS, Micro services, On-Premise, Process Transformation, Cognitive Assistant, Unsupervised AI enhancements, Mean Stack, NOSQL Databases, and FULL Stack application development.</p>
          </AccordionItem>

          <AccordionItem 
            title="What do we Do?" 
            open ={false}> 
            <p>
              <ul>
                <li>Approach and understand the problem at the source and data level</li>
                <li>Create a solution stack which is agnostic and leverages the architectural design principles</li>
                <li>Embrace a fully agile development cycle of realization</li>
                <li>Operate under a co-located development model</li>
              </ul>
            </p>
          </AccordionItem>
        </Accordion>
        </div>
      </Row>
  </Col>
  )
}

export default TeamOverview;