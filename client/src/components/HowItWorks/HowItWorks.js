import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import AutoSuggestInput from '../AutoSuggestInput';
// import SectionSlice from './SectionSlice';
// import '../../stylesheets/components/_HowItWorks.scss';

import screenShot from '../../images/screen-shot.png';
import list from '../../images/list.png';
import letter from '../../images/letter.png';
import smallList from '../../images/small-list.png';
import guideline1 from '../../images/guildline1.png';
import guideline2 from '../../images/guideline2.png';

import Steps from './Steps';
import Footer from '../Footer/Footer';

const HowItWorks = () => (
  <div className="how-it-works-container">
    <div className="how-it-works-banner">
      <div>
        <h1 className="blue-color" style={{ marginLeft: '1em' }}>
          HOW DOES IT WORK ?
        </h1>
      </div>
    </div>

    <Steps>
      {/* ----------- SECTION 1 ------------*/}
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Row>
            <Col xs={12}>
              <div className="step-icon-and-title-container">
                <i className="fa fa-bullhorn how-icon" />
                <h2>1. Create or Join a Campaign</h2>
              </div>
            </Col>

            <Col xs={12}>
              <div className="">
                <h3>Discover Your Building's Campaign Status</h3>
                <p>
                  Enter your apartment building's address in the search bar below (or on our
                  homepage) to find out if there is a recycling campaign already active in your
                  building. Then, follow the steps to create a brand new campaign or sign the online
                  petition for an existing one.
                </p>
                <AutoSuggestInput />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* ----------- SECTION 2 ------------*/}
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Row>
            <Col xs={12}>
              <div className="step-icon-and-title-container">
                <i className="fa fa-users how-icon" />
                <h2>2. Recruit Your Neighbors</h2>
              </div>
            </Col>

            <Col xs={12}>
              <div className="">
                <h3>Power in Numbers</h3>
                <p>
                  Now it's time to spread the word about your building's new recycling campaign to
                  your neighbors. Gathering signatures from your fellow tenants let's your landlord
                  know just how important recycling services are to your community!{' '}
                  {/* Each signature also shows a tenant's pledge to 
                                        make <em> proper </em> use of any provided recycling services. */}
                </p>
              </div>
            </Col>

            <Col xs={12}>
              <div className="">
                <h3>Tools</h3>
                <ul>
                  <li>
                    Print and post this petition in a public space in your apartment building, such
                    as a laundry or mail room.
                    <a
                      className=""
                      href={`${process.env.PUBLIC_URL}/flyer.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      SignatureSheet.pdf
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* ----------- SECTION 3 ------------*/}
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Row>
            <Col xs={12}>
              <div className="step-icon-and-title-container">
                <i className="fa fa-comment how-icon" />
                <h2>3. Request Recyling From Your Landlord</h2>
              </div>
            </Col>

            <Col xs={12}>
              <div className="">
                <p>
                  Submit the letter to your landlord along with the petition signatures. If
                  possible, bring other neighbors along; there is great strength in numbers.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* ----------- SECTION 4 ------------*/}
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Row>
            <Col xs={12}>
              <div className="step-icon-and-title-container">
                <i className="fa fa-recycle how-icon" />
                <h2>4. Recycle!</h2>
              </div>
            </Col>

            <Col xs={12}>
              <div className="">
                <p>
                  Congraduations for getting recycling services for your building! Best practice
                  shows that posting guildelines will help your neighbors recycle correctly. When a
                  recycling bin is too contaminated your complex will either be given 1 week to
                  clean out the recycling bin or be charged extra to take it to a landfill as trash.
                  Common contaminants in the recycing bin include plastic bags because they jam up
                  the machine and disposable ware such as red solo cups, disposable cutlery and
                  disposable plates.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Steps>
    <Footer />
  </div>
);

export default HowItWorks;
