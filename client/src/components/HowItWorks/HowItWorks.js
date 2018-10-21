import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import AutoSuggestInput from '../AutoSuggestInput';
import {
  firebaseSearchAddressFlow,
  clearInitialSearchResults
} from '../../redux/actions/firebaseInitialSearch';

// import screenShot from '../../images/screen-shot.png';
// import list from '../../images/list.png';
// import letter from '../../images/letter.png';
// import smallList from '../../images/small-list.png';
// import guideline1 from '../../images/guildline1.png';
// import guideline2 from '../../images/guideline2.png';

import HeroCTA from '../HeroCTA';
import Steps from './Steps';
import Footer from '../Footer/Footer';

let stepsRef = null;

const prevStepBtnDisabled = (
  <div className="step-nav prev disabled">
    <i className="fa fa-angle-left arrow-btn" />
  </div>
);

const nextStepBtnDisabled = (
  <div className="step-nav next disabled">
    <i className="fa fa-angle-right arrow-btn" />
  </div>
);

const prevStepBtn = (
  <div className="step-nav prev">
    <i
      className="fa fa-angle-left arrow-btn"
      role="button"
      tabIndex="-1"
      onClick={() => {
        if (stepsRef != null) {
          stepsRef.prevStep();
        }
      }}
    />
  </div>
);

const nextStepBtn = (
  <div className="step-nav next">
    <i
      className="fa fa-angle-right arrow-btn"
      role="button"
      tabIndex="-1"
      onClick={() => {
        if (stepsRef != null) {
          stepsRef.nextStep();
        }
      }}
    />
  </div>
);

const HowItWorks = props => {
  let selectedStep = 0;
  if (props.location.state && props.location.action === 'PUSH') {
    selectedStep = props.location.state.selectedStep;
  }

  return (
    <div className="how-it-works-container">
      <HeroCTA />
      <div className="how-it-works-banner">
        <div>
          <h1 className="blue-color" style={{ marginLeft: '1em' }}>
            Follow these easy steps!
          </h1>
        </div>
      </div>

      <Steps
        pulseNextStep
        selectedStep={selectedStep}
        ref={steps => {
          stepsRef = steps;
        }}
      >
        {/* ----------- SECTION 1 ------------*/}
        <Grid>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <div className="step-header">
                {prevStepBtnDisabled}
                <div className="step-icon-and-title-container">
                  <i className="fa fa-bullhorn how-icon" />
                  <h2>1. Create or Join a Campaign</h2>
                </div>
                {nextStepBtn}
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <div className="">
                <h3>Start by searching for your condo or apartment building address</h3>
                <p>
                  Enter your condo or apartment building address in the search bar below to find out
                  if there is a recycling campaign already active for your building. Then, follow
                  the on screen instructions to either create a brand new campaign or sign the
                  online petition for an existing one.
                </p>
              </div>
            </Col>
          </Row>
        </Grid>

        {/* ----------- SECTION 2 ------------*/}
        <Grid>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <div className="step-header">
                {prevStepBtn}
                <div className="step-icon-and-title-container">
                  <i className="fa fa-users how-icon" />
                  <h2>2. Recruit Your Neighbors</h2>
                </div>
                {nextStepBtn}
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <div>
                <h3>Power in Numbers</h3>
                <p>
                  Now it's time to spread the word about your building's new recycling campaign to
                  your neighbors. Gathering signatures from your fellow tenants let's your landlord
                  know just how important recycling services are to your community!
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <div>
                <h3>Tools</h3>
                <ul>
                  <li>
                    Print and post this petition in a public space in your apartment building, such
                    as a laundry or mail room.
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Grid>

        {/* ----------- SECTION 3 ------------*/}
        <Grid>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <div className="step-header">
                {prevStepBtn}
                <div className="step-icon-and-title-container">
                  <i className="fa fa-comment how-icon" />
                  <h2>3. Request Recyling From Your Landlord</h2>
                </div>
                {nextStepBtn}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <div className="">
                <p>
                  Submit the letter to your landlord along with the petition signatures. If
                  possible, bring other neighbors along; there is great strength in numbers.
                </p>
              </div>
            </Col>
          </Row>
        </Grid>

        {/* ----------- SECTION 4 ------------*/}
        <Grid>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <div className="step-header">
                {prevStepBtn}
                <div className="step-icon-and-title-container">
                  <i className="fa fa-recycle how-icon" />
                  <h2>4. Recycle!</h2>
                </div>
                {nextStepBtnDisabled}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
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
        </Grid>
      </Steps>

      <Grid className="search-container">
        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            <h3 className="call-to-action">Ready? Enter your address!</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            <div style={{ textAlign: 'center' }}>
              Start a campaign to bring recycling to your property! Search your address below to get
              started.
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            <AutoSuggestInput
              firebaseSearchAddressFlow={props.firebaseSearchAddressFlow}
              clearInitialSearchResults={props.clearInitialSearchResults}
              router={props.router}
            />
          </Col>
        </Row>
      </Grid>

      <Footer />
    </div>
  );
};

HowItWorks.defaultProps = {
  location: {
    state: {
      selectedStep: 0
    }
  }
};

HowItWorks.propTypes = {
  router: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedStep: PropTypes.number
    }).isRequired,
    action: PropTypes.shape({}).isRequired
  }).isRequired,
  firebaseSearchAddressFlow: PropTypes.func.isRequired,
  clearInitialSearchResults: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    firebaseSearchAddressFlow,
    clearInitialSearchResults
  }
)(HowItWorks);
