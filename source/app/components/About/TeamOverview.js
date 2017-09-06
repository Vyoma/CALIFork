// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

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
      <div className={style['tl-team-bio']}>
        <label className='bx--label'>
          <h2 className={style['tl-team-bio-title']}>CBDS AI Dev Team</h2>
        </label>
        <div className={style['tl-team-bio-line']}></div>
        <p className={style['example-p-style']}>
          Pumpkin spice Write Me A Song Country. Music Hall of Fame write a song about pumpkin spice. Cats vote for Taylor trouble Loft 89. Available at Target best dress best dress Meredith. Grey enchanted I'm on the bleachers sparkly dress girlnextdooritis Karlie. Kloss Kanye West Famous Loft 89 Emma Stone available at. Target Lily Aldridge Tribeca gym Ed Sheeran Jake Gyllenhaal Tree. Paine situation Christmas music darling I'm a nightmare. Dressed like a daydream 22 for me I think Met Gala. Romeo so basically Katy Perry mean refrigerator light. 
        </p>
      </div>
    </Row>
  </Col>
  )
}

export default TeamOverview;