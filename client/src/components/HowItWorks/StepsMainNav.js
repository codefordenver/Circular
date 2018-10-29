import React from 'react';
import PropTypes from 'prop-types';

// Components
import StepSelectorButton from './StepSelectorButton';
import PulsedStepSelectorButton from './PulsedStepSelectorButton';

const StepsMainNav = ({
  currentStep,
  totalNumSteps,
  vertical,
  pulseNextStep,
  pulseDelay,
  onClick
}) => {
  let containerClasses = 'step-selectors-container';
  if (vertical) {
    containerClasses += ' vertical';
  }

  const stepSelectorBtns = [];
  stepSelectorBtns.push(<div className="half-spacer" key="half-spacer-start" />);
  for (let i = 0; i < totalNumSteps; i += 1) {
    const stepSpacerClasses = i < currentStep ? 'spacer-line highlighted' : 'spacer-line';
    if (pulseNextStep && i === currentStep + 1) {
      stepSelectorBtns.push(
        <PulsedStepSelectorButton
          key={`pulsed-step-selector-${i}`}
          stepNum={i}
          pulseDelay={pulseDelay}
          onClick={e => {
            onClick(i);
          }}
          vertical={vertical}
        />
      );
    } else {
      stepSelectorBtns.push(
        <StepSelectorButton
          key={`step-selector-${i}`}
          stepNum={i}
          isSelected={i === currentStep}
          isHighlighted={i < currentStep}
          onClick={e => {
            onClick(i);
          }}
          vertical={vertical}
        />
      );
    }
    if (i !== totalNumSteps - 1) {
      stepSelectorBtns.push(<div className={stepSpacerClasses} key={`step-spacer-${i}`} />);
    }
  }
  stepSelectorBtns.push(<div className="half-spacer" key="half-spacer-end" />);

  return <div className={containerClasses}>{stepSelectorBtns}</div>;
};

StepsMainNav.defaultProps = {
  vertical: false,
  pulseNextStep: true,
  pulseDelay: 600
};

StepsMainNav.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalNumSteps: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
  pulseNextStep: PropTypes.bool,
  pulseDelay: PropTypes.number
};
export default StepsMainNav;
