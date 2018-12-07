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
import HowItWorksStepHeaderContent from './HowItWorksStepHeaderContent';
import HowItWorksStepContent from './HowItWorksStepContent';

const stepsData = [
  {
    title: 'Create or Join a Campaign',
    icon: <i className="fa fa-bullhorn how-icon" />,
    prevStepBtn: <i className="fa fa-angle-left" style={{ fontSize: '5rem' }} />,
    nextStepBtn: <i className="fa fa-angle-right" style={{ fontSize: '5rem' }} />,
    content: [
      { h3: 'Start by searching for your condo or apartment building address' },
      {
        p:
          `Enter your condo or apartment building address in the search bar below to find out${' '}` +
          `if there is a recycling campaign already active for your building. Then, follow${' '}` +
          `the on screen instructions to either create a brand new campaign or sign the${' '}` +
          'online petition for an existing one.'
      }
    ]
  },
  {
    title: 'Recruit Your Neighbors',
    icon: <i className="fa fa-users how-icon" />,
    prevStepBtn: <i className="fa fa-angle-left" style={{ fontSize: '5rem' }} />,
    nextStepBtn: <i className="fa fa-angle-right" style={{ fontSize: '5rem' }} />,
    content: [
      { h3: 'Power in Numbers' },
      {
        p:
          `Now it's time to spread the word about your building's new recycling campaign to${' '}` +
          `your neighbors. Gathering signatures from your fellow tenants let's your landlord${' '}` +
          'know just how important recycling services are to your community!'
      },
      { h3: 'Tools' },
      {
        ul: [
          {
            li:
              `Print and post this petition in a public space in your apartment building, such${' '}` +
              'as a laundry or mail room.'
          }
        ]
      }
    ]
  },
  {
    title: 'Request Recyling From Your Landlord',
    icon: <i className="fa fa-comment how-icon" />,
    prevStepBtn: <i className="fa fa-angle-left" style={{ fontSize: '5rem' }} />,
    nextStepBtn: <i className="fa fa-angle-right" style={{ fontSize: '5rem' }} />,
    content: [
      {
        p:
          `Submit the letter to your landlord along with the petition signatures. If${' '}` +
          'possible, bring other neighbors along; there is great strength in numbers.'
      }
    ]
  },
  {
    title: 'Recycle!',
    icon: <i className="fa fa-recycle how-icon" />,
    prevStepBtn: <i className="fa fa-angle-left" style={{ fontSize: '5rem' }} />,
    nextStepBtn: <i className="fa fa-angle-right" style={{ fontSize: '5rem' }} />,
    content: [
      {
        p:
          `Congratulations for getting recycling services for your building! Best practice${' '}` +
          `shows that posting guidelines will help your neighbors recycle correctly. When a${' '}` +
          `recycling bin is too contaminated your complex will either be given 1 week to${' '}` +
          `clean out the recycling bin or be charged extra to take it to a landfill as trash.${' '}` +
          `Common contaminants in the recycing bin include plastic bags because they jam up${' '}` +
          `the machine and disposable ware such as red solo cups, disposable cutlery and${' '}` +
          'disposable plates.'
      }
    ]
  }
];

const HowItWorks = props => {
  let currentStep = 0;
  if (props.location.state && props.location.action === 'PUSH') {
    currentStep = props.location.state.currentStep;
  }

  const steps = stepsData.map((stepData, index) => ({
    headerContent: (
      <HowItWorksStepHeaderContent
        title={stepData.title}
        icon={stepData.icon}
        stepIndex={index}
        priority={2}
        stacked
      />
    ),
    content: <HowItWorksStepContent content={stepData.content} />,
    prevStepBtn: stepData.prevStepBtn,
    nextStepBtn: stepData.nextStepBtn
  }));

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

      <Steps pulseNextStep currentStep={currentStep} steps={steps} />

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
      currentStep: 0
    }
  }
};

HowItWorks.propTypes = {
  router: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      currentStep: PropTypes.number
    }),
    action: PropTypes.string.isRequired
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
