import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';

import Steps from './HowItWorks/Steps';

// const StepByStep = () => (
//   <div className="stepbystep-wrapper">
//     <PageHeader className="home-section-page-header info-graphic-header">
//       HOW DOES THIS WORK?
//     </PageHeader>
//     <div className="info-graphic">
//       <div className="box">
//         <i className="fa fa-bullhorn" />
//         <p>1. CREATE</p>
//       </div>
//       <div className="box">
//         <i className="fa fa-users" />
//         <p>2. RECRUIT</p>
//       </div>
//       <div className="box">
//         <i className="fa fa-comment" />
//         <p>3. REQUEST</p>
//       </div>
//       <div className="box">
//         <i className="fa fa-recycle" />
//         <p>4. RECYCLE</p>
//       </div>
//     </div>
//   </div>
// );

const StepByStep = () => (
  <div className="step-by-step-container">
    <h2 className="home-section-title">HOW DOES THIS WORK?</h2>
    <Steps showPrevNextButtons={false} vertical height={340}>
      {/* ----------- STEP 1 ------------*/}
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Row>
            <Col xs={12} className="no-right-pad">
              <div className="inner-content-container">
                <div className="step-icon-and-title-container">
                  <i className="fa fa-bullhorn how-icon" />
                  <h3>1. Create or Join a Campaign</h3>
                </div>
                <p>
                  Look up your address in the search bar above to create a new recycling campaign
                  for your building or join an existing one!
                </p>
                <Link
                  className="more-step-details-link"
                  to={{ pathname: 'how-does-this-work', state: { selectedStep: 0 } }}
                >
                  More Details
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* ----------- STEP 2 ------------*/}
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Row>
            <Col xs={12}>
              <div className="inner-content-container">
                <div className="step-icon-and-title-container">
                  <i className="fa fa-users how-icon" />
                  <h3>2. Recruit Your Neighbors</h3>
                </div>
                <p>
                  We provide you with the resources to gather the support of your building
                  community.
                </p>
                <Link
                  className="more-step-details-link"
                  to={{ pathname: 'how-does-this-work', state: { selectedStep: 1 } }}
                >
                  More Details
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* ----------- STEP 3 ------------*/}
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Row>
            <Col xs={12}>
              <div className="inner-content-container">
                <div className="step-icon-and-title-container">
                  <i className="fa fa-comment how-icon" />
                  <h3>3. Request Recyling From Your Landlord</h3>
                </div>
                <p>Submit your petition for recycling to your landlord and hope for the best!</p>
                <Link
                  className="more-step-details-link"
                  to={{ pathname: 'how-does-this-work', state: { selectedStep: 2 } }}
                >
                  More Details
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* ----------- STEP 4 ------------*/}
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Row>
            <Col xs={12}>
              <div className="inner-content-container">
                <div className="step-icon-and-title-container">
                  <i className="fa fa-recycle how-icon" />
                  <h3>4. Recycle!</h3>
                </div>
                <p>
                  That's it! Hopefully your landlord agrees to provide recycling services for you
                  and your community. Enjoy your convenient recycling!
                </p>
                <Link
                  className="more-step-details-link"
                  to={{ pathname: 'how-does-this-work', state: { selectedStep: 3 } }}
                >
                  More Details
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Steps>
  </div>
);

export default StepByStep;
