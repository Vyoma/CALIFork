// REACT
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// REACT-GRID-SYSTEM
import { Container, Row } from 'react-grid-system'
import Col from '../../components/Column' // CUSTOM COLUMN -> OPTIMIZED FOR SERVERS SIDE RENDERING

// CARBON COMPONENTS 
import {Accordion, AccordionItem} from 'carbon-components-react'

const placeholderImage = 'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg'; 

const TeamBios = () => {
  const profStyle = {
    borderRadius: '50%',
    width: '125px',
    height: '125px'
  };
  return (
    <div>
      <Accordion>
        <AccordionItem 
          title="Priya Vijayarajendran | CBDS CTO" 
          open ={true}> 
            <img src={placeholderImage} style={profStyle}/> 
            <br/>
            
            <br/>
            <label className='bx--label'>
            Expertise:
            </label>
            <p>Banjo some indie record that's much. Cooler than mine wonderstruck December pumpkin spice Loki I would. Very much like to be 1989 ex 13 Jake.
            </p>
             <br/>
            <label className='bx--label'>
              Fun Fact:
            </label>
            <p>
            2 a.m. cat stickers cheer captain genius no chill. Vote for Taylor banana quinoa muffin. Shellback Scott Swift banana quinoa muffin Jaime King crop tops.
            </p>
            <a href='https://w3.ibm.com/bluepages/profile.html?uid=6G1808897'>Bluepages</a>
            <br/>
        </AccordionItem>
        <AccordionItem 
          title="Manoj Gaddam | AI Dev Solution Architect" > 
            <img src={placeholderImage} style={profStyle}/> 
            <br/>
            <br/>
            <label className='bx--label'>
            Expertise:
            </label>
            <p>I'm on the bleachers breakup cat. Stickers club red Taylor Nation dear John 13 Management. Enchanted banjo mean sparks fly 13 Management eff sewing machines.
            </p>
             <br/>
            <label className='bx--label'>
              Fun Fact:
            </label>
            <p>
            Awkward iHeart Radio the struggle is real fearless banana quinoa muffin. Banana quinoa muffin scottish fold Lily Aldridge take me. Somewhere we can be alone.
            </p>
            <a href='https://w3.ibm.com/bluepages/profile.html?uid=6G1808897'>Bluepages</a>
            <br/>
        </AccordionItem>
      </Accordion>
   </div>
    )
}



export default TeamBios;