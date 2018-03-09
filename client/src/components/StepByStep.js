import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, PageHeader } from 'react-bootstrap';

const Step = props => (
  <Col xs={12} className="step-container">
    <div className="step-emoji-icon">
      <p>{props.emojiIcon}</p>
    </div>
    <h3 className="home-section-title">{props.title}</h3>
    <p className="home-section-description">{props.description}</p>
  </Col>
);
Step.propTypes = {
  emojiIcon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const StepByStep = () => (
  <div>
    <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
      <Row>
        <Col xs={12}>
          <PageHeader className="home-section-page-header">How does this work?</PageHeader>
        </Col>
        <Step
          emojiIcon="&#x270D;"
          title="Create a campaign"
          description="Create and share your Multi-family Complex (MFC's) campaign page with your neighbors."
        />
        <Step
          emojiIcon="&#x1F4CB;"
          title="Recruit support"
          description="Voice and organize your support."
        />
        <Step
          emojiIcon="&#x1F64F;"
          title="Request"
          description="Request recycling services from your landlord by sharing your building's campaign page."
        />
        <Step
          emojiIcon="&#x1F64C;"
          title="Recycle!"
          description="Recycle and live in a more sustainable building."
        />
      </Row>
    </Col>
  </div>
);

export default StepByStep;
