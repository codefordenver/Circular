import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

const Step = props => (
  <Row className="step-container">
    <Col xs={1} className="step-emoji-icon">
      <p>{props.emojiIcon}</p>
    </Col>
    <Col xs={11}>
      <h3 className="step-title">{props.title}</h3>
      <p className="step-description">{props.description}</p>
    </Col>
  </Row>
);
Step.propTypes = {
  emojiIcon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const StepByStep = () => (
  <div>
    <Grid>
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          <Row>
            <Col xs={11} xsOffset={1}>
              <PageHeader className="step-by-step-page-header">How does this work?</PageHeader>
            </Col>
            <Step
              emojiIcon="&#x270D;"
              title="Create a campaign"
              description="Create and share a page with your neightbors."
            />
            <Step
              emojiIcon="&#x1F91D;"
              title="Recruit support"
              description="Voice and organize your support"
            />
            <Step
              emojiIcon="&#x1F64F;"
              title="Request"
              description="Request a recycling collection from your landlord by sharing your building's support page"
            />
            <Step
              emojiIcon="&#x1F64C;"
              title="Recycle!"
              description="Live in a more sustainable building!"
            />
          </Row>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default StepByStep;
