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
  <div className="StepByStep">
    <PageHeader className="home-section-page-header info-graphic-header">
      HOW DOES THIS WORK?
    </PageHeader>
    <div className="info-graphic">
      <div className="box">
        <i className="fa fa-bullhorn" />
        <p>1. CREATE</p>
      </div>
      <div className="box">
        <i className="fa fa-users" />
        <p>2. RECRUIT</p>
      </div>
      <div className="box">
        <i className="fa fa-comment" />
        <p>3. REQUEST</p>
      </div>
      <div className="box">
        <i className="fa fa-recycle" />
        <p>4. RECYCLE</p>
      </div>
    </div>
  </div>
);

export default StepByStep;
