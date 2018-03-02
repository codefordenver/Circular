import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

const Step = props => (
  <Col xs={12} className="step-container">
    <div className="step-emoji-icon">
      <p>{props.emojiIcon}</p>
    </div>
    <h3 className="step-title">{props.title}</h3>
    <p className="step-description">{props.description}</p>
  </Col>
);
Step.propTypes = {
  emojiIcon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const StepByStep = () => (
  <Grid fluid>
    <Row>
      <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
        <Row>
          <Col xs={12}>
            <PageHeader className="step-by-step-page-header">How does this work?</PageHeader>
          </Col>
          <Step
            emojiIcon="&#x270D;"
            title="Create a campaign"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
          />
          <Step
            emojiIcon="&#x1F91D;"
            title="Recruit support"
            description="ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat."
          />
          <Step
            emojiIcon="&#x1F64F;"
            title="Request"
            description="nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
          <Step
            emojiIcon="&#x1F64C;"
            title="Recycle!"
            description="ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam!"
          />
        </Row>
      </Col>
    </Row>
  </Grid>
);

export default StepByStep;
