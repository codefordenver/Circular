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

  _buildHandleEnterKeyPress = onClick => ({ key }) => {
    if (key === 'Enter') {
      onClick();
    }
  };

  _stepSelectors() {
    const numSteps = this.props.totalNumSteps;
    const currentStep = this.props.currentStep;
    const a = [];
    a.push(<div className="half-spacer" key="half-spacer-start" />);

    for (let i = 0; i < numSteps; i += 1) {
      let stepSelectorClasses = `step-selector-${i}`;
      let stepSpacerClasses = 'spacer-line';
      if (currentStep === i) {
        stepSelectorClasses += ' selected';
      } else {
        stepSelectorClasses += ' not-selected';
      }
      if (i < currentStep) {
        stepSelectorClasses += ' highlighted';
        stepSpacerClasses += ' highlighted';
      }
      let selector;
      if (i === currentStep + 1) {
        const duration = this.state.pulseOpacity === 1.0 ? 300 : 600;
        selector = (
          <div
            className={stepSelectorClasses}
            key={`step-selector-${i}`}
            role="button"
            tabIndex="0"
            onKeyPress={this._buildHandleEnterKeyPress(e => {
              this.props.onClick(i);
            })}
            onClick={e => {
              this.props.onClick(i);
            }}
          >
            <Spring
              native
              to={{
                opacity: this.state.pulseOpacity,
                color: this.state.pulseColor,
                borderColor: this.state.pulseColor
              }}
              impl={TimingAnimation}
              config={{ duration, easing: Easing.linear }}
            >
              {style => (
                <animated.div className="circle" style={{ ...style }}>
                  {i + 1}
                </animated.div>
              )}
            </Spring>
          </div>
        );
      } else {
        selector = (
          <div
            className={stepSelectorClasses}
            key={`step-selector-${i}`}
            role="button"
            tabIndex="0"
            onKeyPress={this._buildHandleEnterKeyPress(e => {
              this.props.onClick(i);
            })}
            onClick={e => {
              this.props.onClick(i);
            }}
          >
            <div className="circle">{i + 1}</div>
          </div>
        );
      }

      a.push(selector);
      if (i !== numSteps - 1) {
        const stepSpacerLine = <div className={stepSpacerClasses} key={`step-spacer-${i}`} />;
        a.push(stepSpacerLine);
      }
    }
    a.push(<div className="half-spacer" key="half-spacer-end" />);
    return a;
  }

  render() {
    let selectorsContainerClasses = 'step-selectors-container';
    if (this.props.vertical) {
      selectorsContainerClasses += ' vertical';
    }
    return <div className={selectorsContainerClasses}>{this._stepSelectors()}</div>;
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
