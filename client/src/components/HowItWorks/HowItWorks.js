import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import AutoSuggestInput from '../AutoSuggestInput';
import SectionSlice from './SectionSlice';
import '../../stylesheets/components/_HowItWorks.scss';
import Footer from '../Footer/Footer';
import screenShot from '../../images/screen-shot.png';
import list from '../../images/list.png';
import letter from '../../images/letter.png';
import smallList from '../../images/small-list.png';
import guideline1 from '../../images/guildline1.png';
import guideline2 from '../../images/guideline2.png';

const HowItWorks = () => (
  <div className="how-it-works-container">
    <div className="how-it-works-banner">
      <div>
        <h1 className="blue-color" style={{ marginLeft: '1em' }}>
          HOW DOES IT WORK ?
        </h1>
      </div>
    </div>
    <div className="how-it-works-content-section">
      <Grid>
        {/* ----------- SECTION 1 ------------*/}
        <Row>
          <Col sm={12} md={2}>
            <div className="how-it-works-logo">
              <center>
                <i className="fa fa-bullhorn" style={{ width: '100%', fontSize: '2em' }} />
              </center>
              <h1> 1. Create a Campaign </h1>
            </div>
          </Col>
          <Col className="slices-container" sm={12} md={4}>
            <SectionSlice
              header="Share your campaign"
              description="Print a flier, post in a public place, like laundry or mail room, or share via social media"
            />
            <SectionSlice header="Time Feature" description="You can have extra time if you need" />
            <SectionSlice
              header="Tools"
              description="Access resources like recycling guidelines, tip for approaching your lanloard, data documentation and more"
            />
          </Col>
          <Col sm={12} md={6} style={{ marginTop: '2em' }}>
            <SectionSlice
              center
              header="Explore"
              description="Click on the map to explore other campaigns"
            />
            <Image src={screenShot} responsive />
          </Col>
        </Row>
        {/* ----------- SECTION 2 ------------*/}
        <Row
          style={{ marginTop: '3em', marginRight: 0, marginLeft: 0 }}
          className="how-it-works-content-section-grey"
        >
          <Col sm={12} md={2}>
            <div className="how-it-works-logo-grey">
              <center>
                <i className="fa fa-users blue-color" style={{ width: '100%', fontSize: '2em' }} />
              </center>
              <h1 className="blue-color"> 2. RECRUIT SUPPORT FROM NEIGHBOBRS </h1>
            </div>
          </Col>
          <Col sm={12} md={10}>
            <Row sm={12} md={12}>
              <h3 className="blue-color" style={{ textAlign: 'center', fontWeight: 500 }}>
                This will let your lanloard know others support recycling in your building, too! You
                are not alone! Signing will also show your lanloard people pledge to use recycling
                services correctly.
              </h3>
            </Row>
            <Row sm={12} md={12}>
              <Col sm={12} md={5}>
                <div className="top-spacing">
                  <SectionSlice
                    center
                    color
                    header="Gather Signatures"
                    description="Post this is a public place so that neighbors can sign the petition with their unit number"
                  />
                </div>
              </Col>
              <Col sm={12} md={2}>
                <Image style={{ marginTop: '2em' }} src={list} responsive />
              </Col>
              <Col sm={12} md={5}>
                <div className="top-spacing">
                  <SectionSlice
                    color
                    center
                    header="Get the word out!"
                    description="Go door to door to let your neighbors know, host a community meeting, announce this at your next HOA meeting, host a recycling party!"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* ----------- SECTION 3------------*/}
        <div style={{ marginBottom: '2em' }}>
          <Row className="how-it-works-content-section">
            <Col sm={12} md={2}>
              <div className="how-it-works-logo">
                <center>
                  <i className="fa fa-comment" style={{ width: '100%', fontSize: '2em' }} />
                </center>
                <h1> 3. Request Recycling From lanloard </h1>
              </div>
            </Col>
            <Col sm={12} md={10}>
              <Col sm={12} md={6}>
                <Row size={12}>
                  <div className="top-spacing">
                    <SectionSlice
                      center
                      header="Now you have signatures"
                      description="Submit the letter to your landloard along with the petition signatures. If possible bring other neighbors along, there is strength in numbers."
                    />
                  </div>
                </Row>
                <Row sm={12}>
                  <Col sm={5}>
                    <Image src={letter} responsive />
                  </Col>
                  <Col sm={1} style={{ marginTop: '2em' }}>
                    <h2 style={{ fontSize: 70 }}>
                      <center>+</center>
                    </h2>
                  </Col>
                  <Col sm={5}>
                    <Image style={{ marginTop: '2em' }} src={smallList} responsive />
                  </Col>
                </Row>
              </Col>

              <Col sm={12} md={6}>
                <Row>
                  <div className="top-spacing">
                    <SectionSlice
                      center
                      header="Now, it's up to them"
                      description="It my take them one week or longer to get beck to you. They may have to check with thier current waste provider to request quotes for recycling services."
                    />
                  </div>
                </Row>
                <Row sm={12}>
                  <center>
                    <div>
                      <h2> Did you get service?</h2>
                    </div>
                  </center>
                </Row>
                <Row sm={12}>
                  <Col sm={6}>
                    <div className="top-spacing">
                      <SectionSlice center header="Yes" description="Congraduations!" />
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="top-spacing">
                      <SectionSlice
                        center
                        header="No"
                        description="Tell us why. We want to gather data on why landloard deny their tenants service."
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </div>
        {/* ----------- SECTION 4 ------------*/}
        <Row className="how-it-works-content-section-grey">
          <Col sm={12} md={2}>
            <div className="how-it-works-logo-grey" style={{ paddingTop: '1em' }}>
              <center>
                <i
                  className="fa fa-recycle blue-color"
                  style={{ width: '100%', fontSize: '2em' }}
                />
              </center>
              <h1 className="blue-color"> 4. Recycle </h1>
            </div>
          </Col>
          <Col sm={12} md={5}>
            <div className="top-spacing">
              <SectionSlice
                color
                center
                header="Recycling Guidelines"
                description={`Congraduations for getting recycling! Best practice shows that posting guildelines will help your neighbors recycle correctly. ${'\n'} ${'\n'}
                    When a recycling bin is too contaminated your complex will be either given 1 week to clean out the recycling bin or will be charged extra to take it to a landfill as trash.
                    Common contaminants in the recycing bin include plastic bags because they jamb up the machine and dispable ware such as red solo cups, disposable cutlery and disposable plates.`}
              />
            </div>
          </Col>
          <Col sm={12} md={5}>
            <Col sm={12} md={6}>
              <Image src={guideline2} responsive />
            </Col>
            <Col sm={12} md={6}>
              <Image src={guideline1} responsive />
            </Col>
          </Col>
        </Row>
        {/* ----------- SECTION 5 ------------*/}
        <Row style={{ marginBottom: '2em' }}>
          <center>
            <h1>Ready? Active your campaign! </h1>
          </center>
          <AutoSuggestInput />
        </Row>
      </Grid>
      <Footer />
    </div>
  </div>
);

export default HowItWorks;
