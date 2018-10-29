import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

class PulsedStepSelectorButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pulseOpacity: 1.0,
      pulseColor: 'rgba(249, 199, 100, 1)'
    };
  }

  componentDidMount() {
    this.pulseInterval = setInterval(() => {
      if (this.state.pulseOpacity === 1.0) {
        this.setState({ pulseOpacity: 0.8, pulseColor: 'rgba(255,255,255,1)' });
      } else {
        this.setState({ pulseOpacity: 1.0, pulseColor: 'rgba(249,199,100,1)' });
      }
    }, this.props.pulseDelay);
  }

  componentWillUnmount() {
    clearInterval(this.pulseInterval);
  }

  render() {
    let classes = `step-selector-btn-${this.props.stepNum}`;
    if (this.props.vertical) {
      classes += ' vertical';
    }
    const animationDuration = this.state.pulseOpacity === 1.0 ? 300 : 600;
    return (
      <button
        className={classes}
        onClick={e => {
          this.props.onClick(this.props.stepNum);
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
          config={{ animationDuration, easing: Easing.linear }}
        >
          {style => (
            <animated.div className="circle" style={{ ...style }}>
              {this.props.stepNum + 1}
            </animated.div>
          )}
        </Spring>
      </button>
    );
  }
}

PulsedStepSelectorButton.defaultProps = {
  pulseDelay: 600,
  vertical: false
};

PulsedStepSelectorButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  stepNum: PropTypes.number.isRequired,
  pulseDelay: PropTypes.number,
  vertical: PropTypes.bool
};

export default PulsedStepSelectorButton;
