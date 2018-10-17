import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Grid } from 'react-bootstrap';

import Steps from './HowItWorks/Steps';

const StepByStep = () => (
  <Grid fluid className="step-by-step-container">
    <Row className="tinted">
      <Col xs={12} lg={10} lgOffset={1}>
        <h2 className="home-section-title">HOW DOES THIS WORK?</h2>
      </Col>
    </Row>

    <Row className="tinted">
      <Col xs={12} lg={10} lgOffset={1} className="pad-bottom">
        <Steps vertical pulseNextStep autoSlide height={400}>
          {/* ----------- STEP 1 ------------*/}

          <div className="inner-content-container">
            <div>
              <div className="step-icon-and-title-container">
                <i className="fa fa-bullhorn how-icon" />
                <h3>
                  <span className="number">1.</span> Create or Join a Campaign
                </h3>
              </div>
              <p>
                Look up your address{' '}
                <Link
                  className="more-step-details-link"
                  to={{ pathname: 'how-does-this-work', state: { selectedStep: 0 } }}
                >
                  {' '}
                  here{' '}
                </Link>{' '}
                to create a new recycling campaign for your building or join an existing one!
              </p>
            </div>
            <Link
              className="more-step-details-link"
              to={{ pathname: 'how-does-this-work', state: { selectedStep: 0 } }}
            >
              More Details
            </Link>
          </div>

          {/* ----------- STEP 2 ------------*/}

          <div className="inner-content-container">
            <div>
              <div className="step-icon-and-title-container">
                <i className="fa fa-users how-icon" />
                <h3>2. Recruit Your Neighbors</h3>
              </div>
              <p>
                We provide you with the resources to gather the support of your building community.
              </p>
            </div>
            <Link
              className="more-step-details-link"
              to={{ pathname: 'how-does-this-work', state: { selectedStep: 1 } }}
            >
              More Details
            </Link>
          </div>

          {/* ----------- STEP 3 ------------*/}

          <div className="inner-content-container">
            <div>
              <div className="step-icon-and-title-container">
                <i className="fa fa-comment how-icon" />
                <h3>3. Request Recyling From Your Landlord</h3>
              </div>
              <p>Submit your petition for recycling to your landlord and hope for the best!</p>
            </div>
            <Link
              className="more-step-details-link"
              to={{ pathname: 'how-does-this-work', state: { selectedStep: 2 } }}
            >
              More Details
            </Link>
          </div>

          {/* ----------- STEP 4 ------------*/}

          <div className="inner-content-container">
            <div>
              <div className="step-icon-and-title-container">
                <i className="fa fa-recycle how-icon" />
                <h3>4. Recycle!</h3>
              </div>
              <p>
                That's it! Hopefully your landlord agrees to provide recycling services for you and
                your community. Enjoy your convenient recycling!
              </p>
            </div>
            <Link
              className="more-step-details-link"
              to={{ pathname: 'how-does-this-work', state: { selectedStep: 3 } }}
            >
              More Details
            </Link>
          </div>
        </Steps>
      </Col>
    </Row>
  </Grid>
);

export default StepByStep;
