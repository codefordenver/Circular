import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

class StepsMainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pulseOpacity: 1.0,
      pulseColor: 'rgba(249, 199, 100, 1)'
    };
  }

  componentDidMount() {
    if (this.props.pulseNextStep) {
      this.pulseInterval = setInterval(() => {
        if (this.state.pulseOpacity === 1.0) {
          this.setState({ pulseOpacity: 0.8, pulseColor: 'rgba(255,255,255,1)' });
        } else {
          this.setState({ pulseOpacity: 1.0, pulseColor: 'rgba(249,199,100,1)' });
        }
      }, this.props.pulseDelay);
    }
  }

  componentWillUnmount() {
    if (this.props.pulseNextStep) {
      clearInterval(this.pulseInterval);
    }
  }

  _createStepSelector(stepNum, isSelected, isHighlighted, isPulsing) {
    let classes = `step-selector-${stepNum}`;
    const animationDuration = this.state.pulseOpacity === 1.0 ? 300 : 600;
    if (isSelected) {
      classes += ' selected';
    } else {
      classes += 'not-selected';
    }
    if (isHighlighted) {
      classes += ' highlighted';
    }
    return (
      <button
        className={classes}
        key={`step-selector-${stepNum}`}
        onClick={e => {
          this.props.onClick(stepNum);
        }}
      >
        {isPulsing ? (
          <Spring
            native
            to={{
              opacity: this.state.pulseOpacity,
              color: this.state.pulseColor,
              borderColor: this.state.pulseColor
            }}
            impl={TimingAnimation}
            config={{ animationDuration, easing: Easing.linear }}
          >
            {style => (
              <animated.div className="circle" style={{ ...style }}>
                {stepNum + 1}
              </animated.div>
            )}
          </Spring>
        ) : (
          <div className="circle">{stepNum + 1}</div>
        )}
      </button>
    );
  }

  _createStepSelectors() {
    const numSteps = this.props.totalNumSteps;
    const currentStep = this.props.currentStep;
    const a = [];
    a.push(<div className="half-spacer" key="half-spacer-start" />);

    for (let i = 0; i < numSteps; i += 1) {
      const stepSpacerClasses = i < currentStep ? 'spacer-line highlighted' : 'spacer-line';
      a.push(
        this._createStepSelector(i, i === currentStep, i < currentStep, i === currentStep + 1)
      );
      if (i !== numSteps - 1) {
        a.push(<div className={stepSpacerClasses} key={`step-spacer-${i}`} />);
      }
    }

    a.push(<div className="half-spacer" key="half-spacer-end" />);
    return a;
  }

  render() {
    let containerClasses = 'step-selectors-container';
    if (this.props.vertical) {
      containerClasses += ' vertical';
    }
    return <div className={containerClasses}>{this._createStepSelectors()}</div>;
  }
}

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
