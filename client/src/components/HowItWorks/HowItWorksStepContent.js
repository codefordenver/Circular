import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid } from 'react-bootstrap';

const buildContents = (content, lvl) => {
  const result = [];
  for (let i = 0; i < content.length; i += 1) {
    const keys = Object.keys(content[i]);
    if (keys && keys[0]) {
      const DynamicTag = `${keys[0]}`;
      const value = content[i][DynamicTag];
      if (React.isValidElement(value) || typeof value !== 'object') {
        result.push(
          <DynamicTag key={`step-content-${keys[0]}-lvl-${lvl}-component-${i}`}>{value}</DynamicTag>
        );
      } else if (Array.isArray(value)) {
        const newElem = (
          <DynamicTag key={`step-content-${keys[0]}-lvl-${lvl}-component-${i}`}>
            {buildContents(value, lvl + 1)}
          </DynamicTag>
        );
        result.push(newElem);
      }
    }
  }
  return result;
};

const HowItWorksStepContent = ({ content }) => {
  const result = buildContents(content, 0);
  return (
    <Grid>
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <div className="how-it-works-step-content-wrapper">{result}</div>
        </Col>
      </Row>
    </Grid>
  );
};

HowItWorksStepContent.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default HowItWorksStepContent;
