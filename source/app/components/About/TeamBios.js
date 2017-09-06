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

const placeholderImage = 'http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg'; 

const TeamBios = () => {
  const profStyle = {
    borderRadius: '50%',
    width: '125px',
    height: '125px'
  };
  return (
    <div>
      <Col md={12}>   
        <Row>
          <div className={styles['tl-team-bio']}>
            <label className='bx--label'>
              <h2 className={styles['tl-team-bio-title']}>Work with Us</h2>
            </label>
            <div className={styles['tl-team-bio-line']}></div>
              <p className={styles['example-p-style']}> 
              Our team comprises of skills needed to build end-to-end cognitive solutions starting from Storage, Compute, DevOps, ETL, Data Foundation, Analytical Modeling, Data Science, Machine Learning, Deep Learning, NLP, Enterprise Solution, Mobile Development, Cloud, SAS, Micro services, On-Premise, Process Transformation, Cognitive Assistant, Unsupervised AI enhancements, Mean Stack, NOSQL Databases, and FULL Stack application development.
              </p>
          </div>
        </Row>
          <Row>
            <div className={styles['tl-team-overview']}>
            <Accordion>
              <AccordionItem 
                title="Priya Vijayarajendran | CBDS CTO" 
                open ={false}> 
                <p>
                  Email: Priya.Vijayarajendran@ibm.com <br/>
                  LinkedIn: https://www.linkedin.com/in/priyavijayarajendran<br/>
                  Twitter: @vcPriya <br/>
                  Fun Fact: I have travelled around the world except Antarctica and I have done around the world trip in 7 days.
                </p>     
              </AccordionItem>

              <AccordionItem 
                title="Manoj Gaddam | Solution Architect" 
                open ={false}> 
                <p>
                  Email: Manoj.Gaddam@ibm.com <br/>
                  LinkedIn: https://www.linkedin.com/in/manojkgaddam 
                </p> 
              </AccordionItem>



              <AccordionItem 
                title="Anatoly Tulchinsky | Head of Development &amp; Technical Leader" 
                open ={false}> 
                <p>
                  Email: Anatoly.Tulchinsky@ca.ibm.com <br/>
                  LinkedIn: https://www.linkedin.com/in/anatoly-tulchinsky
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Ali Khanafer | Data Scientist" 
                open ={false}> 
                <p>
                  Email: Ali.Khanafer@ca.ibm.com <br/>
                  LinkedIn: https://www.linkedin.com/in/alikhanafer<br/> 
                  Twitter: @thealikhanafer<br/>
                  Fun Fact: I got married in Lebanon, honeymooned in Italy, and my three kids were born in Canada.
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Brian Woodsworth | Solution Architect" 
                open ={false}> 
                <p>
                  Email: Brian.Woodsworth@ca.ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/brianwoodsworth<br/> 
                  Twitter: @@BrianWoodsworth 
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Nareen Rayapati" 
                open ={false}> 
                <p>
                  Email: rayapati@ca.ibm.com<br/>
                  
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Evan Chapman | Managing Consultant" 
                open ={false}> 
                <p>
                  Email: epchapma@us.ibm.com <br/>
                  LinkedIn: https://www.linkedin.com/in/evan-chapman-4a319339<br/> 
                  Twitter: @ChapmanEvan <br/>
                  Fun Fact: Spent two weeks immersed in Argentinian and Uruguayan culture while backpacking in South America with a friend.
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Sonali Guleria | Data Scientist" 
                open ={false}> 
                <p>
                  Email: Sonali.Guleria@ibm.com <br/>
                  LinkedIn: https://www.linkedin.com/in/sonali-guleria<br/>
                  Fun Fact: I had six animals when I was a kid (no, I did not live on a farm) and one of my aims in life is to keep seven dogs at once!
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Vyoma Gajjar | Data/Software Engineer" 
                open ={false}> 
                <p>
                  Email: vgajjar@us.ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/vyomagajjar<br/> 
                  Twitter: @vyomagajjar
                  
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Haroun Ahmed | Senior Consultant" 
                open ={false}> 
                <p>
                  Email: hahmed@us.ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/haroun-ahmed<br/> 
                  
                  Fun Fact: My three favorite things in life are traveling, learning, and playing &amp; watching basketball!
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Karen Huang | Consultant" 
                open ={false}> 
                <p>
                  Email: KarenHuang@ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/karen-huang-93755bb7<br/> 
                  
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Shilpee Magoo | Managing Consultant" 
                open ={false}> 
                <p>
                  Email: smagoo@us.ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/shilpee-magoo-60a40b6<br/> 
                  Fun Fact: I love to play any and all racquet sports. You name it and I can play it! (Squash, tennis, table tennis, badminton, racquetball)
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Dennis Noto | Executive Architect" 
                open ={false}> 
                <p>
                  Email: Dennis.Noto@us.ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/dennisfnoto <br/> 
                  Twitter: @dennisnoto
                
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Jessica Bock | Managing Consultant" 
                open ={false}> 
                <p>
                  Email: jfbock@us.ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/jessicafbock<br/> 
                  Twitter: @jesscabock  <br/>
                  Fun Fact: I am a duel citizen and hold a US and a German passport.
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Nancy Thornton | Senior Consultant" 
                open ={false}> 
                <p>
                  Email: njthornt@us.ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/nancyjthornton<br/> 
                  Twitter: @nancyjacq <br/>
                  Fun Fact: Before joining IBM, I was a professional dancer and choreographer.  You can (try) to tell its me as the dance double for the Step Up 2 lead.
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Brian Balagot | Data Scientist, Cognitive Apps Engineer" 
                open ={false}> 
                <p>
                  Email: Brian.Balagot@ibm.com <br/>
                  LinkedIn: https://www.linkedin.com/in/briancbalagot<br/>
                  Fun Fact: I love applied mathematics, data science, powerlifting, cooking, building things that don't break, and bringing the future to the present through cognitive computing.
                </p>   
              </AccordionItem>

              <AccordionItem 
                title="Barak Krakauer | Data Scientist, Cognitive App Developer" 
                open ={false}> 
                <p>
                  Email: Barak.Krakauer@ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/barak-krakauer<br/> 
                  Twitter: @barak_krakauer<br/>
                  Fun Fact: I used to be a professor and taught philosophy.
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Sandhya Iyer | Senior Consultant" 
                open ={false}> 
                <p>
                  Email: Sandhya.R.Iyer@ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/iyersandhya<br/> 
                 
                  Fun Fact: At school I was fondly known as Lord Varys! ( Ignore the negative streak)
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Asad Qureshi | Software Engineer" 
                open ={false}> 
                <p>
                  Email: asquresh@us.ibm.com<br/>
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Layne Miao | Software Engineer" 
                open ={false}> 
                <p>
                  Email: Layne.Miao@ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/layne-miao<br/> 
                  Twitter: @laynemiao <br/>
                  Fun Fact: I like traveling, snowboarding and New England Patriots. The coolest place I've traveled is Osaka.
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Aljosha Novakovic | Full Stack Software Engineer" 
                open ={false}> 
                <p>
                  Email: Aljosha.Novakovic@ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/aljosha-novakovic<br/> 
                  Twitter: @yoshcode<br/>
                  Fun Fact: A life goal of mine has always been to purchase a small Caribbean island. Work would mainly involve writing a few lines of code from the beach, and collecting coconuts.
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Austin Riedel | Full Stack Software Engineer" 
                open ={false}> 
                <p>
                  Email: Austin.Riedel@ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/austin-riedel<br/> 
                 
                  Fun Fact: I went swimming with sharks in Hawaii.
                </p>
              </AccordionItem>

              <AccordionItem 
                title="Trinh Le | Frontend Developer &amp; UX Specialist" 
                open ={false}> 
                <p>
                  Email: Trinh.Le@ibm.com<br/>
                  LinkedIn: https://www.linkedin.com/in/trinh-le<br/> 
                  Twitter: @uyentrinh194 <br/>
                  Fun Fact: Before I joined IBM, I programmed and controlled a robot to mediate conflict between children ages 3-6.
                </p>
              </AccordionItem>





            

            </Accordion>
            </div>
          </Row>
        </Col>
      

   </div>
    )
}



export default TeamBios;