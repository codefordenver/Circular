import React from 'react';
import PropTypes from 'prop-types';

const StepHeaderNavButton = ({
  children,
  onClick,
  targetStep,
  isReachableByKeyboard,
  isDisabled
}) => {
  const classes = isDisabled ? 'step-header-nav disabled' : 'step-header-nav';
  if (!children) {
    return null;
  }
  return (
    <button
      className={classes}
      disabled={isDisabled}
      tabIndex={isReachableByKeyboard ? 0 : -1}
      onClick={() => {
        onClick(targetStep);
      }}
    >
      {children}
    </button>
  );
};

StepHeaderNavButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  onClick: PropTypes.func.isRequired,
  targetStep: PropTypes.number.isRequired,
  isReachableByKeyboard: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default StepHeaderNavButton;
