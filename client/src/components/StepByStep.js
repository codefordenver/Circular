import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Row, Col, Grid } from 'react-bootstrap';
import Steps from './HowItWorks/Steps';
import HowItWorksStepHeaderContent from './HowItWorks/HowItWorksStepHeaderContent';
import HowItWorksStepContent from './HowItWorks/HowItWorksStepContent';

const shortStepsData = [
  {
    title: 'Create or Join a Campaign',
    icon: <i className="fa fa-bullhorn how-icon" />,
    content: [
      {
        div: (
          <p>
            Look up your address{' '}
            <Link
              className="more-step-details-link"
              to={{ pathname: 'how-does-this-work', state: { currentStep: 0 } }}
            >
              {' '}
              here{' '}
            </Link>{' '}
            to create a new recycling campaign for your building or join an existing one!
          </p>
        )
      }
    ]
  },
  {
    title: 'Recruit Your Neighbors',
    icon: <i className="fa fa-users how-icon" />,
    content: [
      {
        p: 'We provide you with the resources to gather the support of your building community.'
      }
    ]
  },
  {
    title: 'Request Recyling From Your Landlord',
    icon: <i className="fa fa-comment how-icon" />,
    content: [
      {
        p: 'Submit your petition for recycling to your landlord and hope for the best!'
      }
    ]
  },
  {
    title: 'Recycle!',
    icon: <i className="fa fa-recycle how-icon" />,
    content: [
      {
        p:
          "That's it! Hopefully your landlord agrees to provide recycling services for you and " +
          'your community. Enjoy your convenient recycling!'
      }
    ]
  }
];

const HowItWorksVerticalStep = ({ title, icon, content, stepIndex }) => (
  <div className="inner-content-container">
    <div>
      <HowItWorksStepHeaderContent
        title={title}
        icon={icon}
        stepIndex={stepIndex}
        priority={3}
        stacked={false}
      />
      <HowItWorksStepContent content={content} />
    </div>
    <Link
      className="more-step-details-link"
      to={{ pathname: 'how-does-this-work', state: { currentStep: stepIndex } }}
    >
      More Details
    </Link>
  </div>
);

HowItWorksVerticalStep.defaultProps = {
  icon: null
};

HowItWorksVerticalStep.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  stepIndex: PropTypes.number.isRequired
};

const StepByStep = () => {
  const steps = shortStepsData.map((stepData, index) => {
    const data = { ...stepData, stepIndex: index };
    return {
      content: <HowItWorksVerticalStep {...data} />
    };
  });
  return (
    <Grid fluid className="step-by-step-container">
      <Row className="tinted">
        <Col xs={12} lg={10} lgOffset={1}>
          <h2 className="home-section-title">HOW DOES THIS WORK?</h2>
        </Col>
      </Row>

      <Row className="tinted">
        <Col xs={12} lg={10} lgOffset={1} className="pad-bottom">
          <Steps vertical pulseNextStep autoSlide height={400} steps={steps} />
        </Col>
      </Row>
    </Grid>
  );
};

export default StepByStep;
