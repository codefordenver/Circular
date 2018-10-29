import React from 'react';
import PropTypes from 'prop-types';

const StepSelectorButton = ({ onClick, stepNum, isSelected, isHighlighted, vertical }) => {
  let classes = `step-selector-btn-${stepNum}`;
  if (isSelected) {
    classes += ' selected';
  } else {
    classes += ' not-selected';
  }
  if (isHighlighted) {
    classes += ' highlighted';
  }
  if (vertical) {
    classes += ' vertical';
  }
  return (
    <button
      className={classes}
      onClick={e => {
        onClick(stepNum);
      }}
    >
      <div className="circle">{stepNum + 1}</div>
    </button>
  );
};

StepSelectorButton.defaultProps = {
  vertical: false
};

StepSelectorButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  stepNum: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  vertical: PropTypes.bool
};

export default StepSelectorButton;
