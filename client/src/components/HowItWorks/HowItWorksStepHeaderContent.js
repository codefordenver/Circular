import React from 'react';
import PropTypes from 'prop-types';

const HowItWorksStepHeaderContent = ({ title, icon, stepIndex, priority, stacked }) => {
  const classes = stacked ? 'step-header-content stacked' : 'step-header-content';
  const HeaderTag = `h${priority}`;
  return (
    <div className={classes}>
      {icon}
      <HeaderTag>{`${stepIndex + 1}. ${title}`}</HeaderTag>
    </div>
  );
};

HowItWorksStepHeaderContent.defaultProps = {
  icon: null,
  stacked: true,
  priority: 2
};

HowItWorksStepHeaderContent.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  stepIndex: PropTypes.number.isRequired,
  priority: PropTypes.number,
  stacked: PropTypes.bool
};

export default HowItWorksStepHeaderContent;
