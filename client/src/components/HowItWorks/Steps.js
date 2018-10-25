import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

// Components
import StepsMainNav from './StepsMainNav';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: props.currentStep,
      autoSlide: props.autoSlide
    };
  }

  componentDidMount() {
    if (this.state.autoSlide) {
      this.autoSlideInterval = setInterval(() => {
        if (this.state.autoSlide) {
          const nextStep = (this.state.currentStep + 1) % this.props.children.length;
          this.setState({ currentStep: nextStep });
        }
      }, this.props.autoSlideDelay);
    }
  }

  componentWillUnmount() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  goToStep(i, stopAutoSliding = true) {
    if (i < this.props.children.length && i > -1) {
      if (stopAutoSliding) {
        this.setState({ currentStep: i, autoSlide: false });
      } else {
        this.setState({ currentStep: i });
      }
    }
  }

  nextStep(stopAutoSliding = true) {
    if (this.state.currentStep + 1 < this.props.children.length) {
      if (stopAutoSliding) {
        this.setState({ currentStep: this.state.currentStep + 1, autoSlide: false });
      } else {
        this.setState({ currentStep: this.state.currentStep + 1 });
      }
    }
  }

  prevStep(stopAutoSliding = true) {
    if (this.state.currentStep - 1 > -1) {
      if (stopAutoSliding) {
        this.setState({ currentStep: this.state.currentStep - 1, autoSlide: false });
      } else {
        this.setState({ currentStep: this.state.currentStep - 1 });
      }
    }
  }

  _renderChildren(vertical) {
    const wrappedChildren = [];
    const currentStep = this.state.currentStep;
    for (let i = 0; i < this.props.children.length; i += 1) {
      let springTo = { opacity: 0.2 };
      let springFrom = { opacity: 1 };
      if (!vertical) {
        springTo.height = 0;
        springFrom.height = 'auto';
      }
      if (currentStep === i) {
        springTo = { opacity: 1 };
        springFrom = { opacity: 0.2 };
        if (!vertical) {
          springTo.height = 'auto';
          springFrom.height = 200;
        }
      }
      const wrappedChild = (
        <Spring
          native
          from={springFrom}
          to={springTo}
          key={`animated-step-content-${i}`}
          impl={TimingAnimation}
          config={{ duration: 900, easing: Easing.out(Easing.cubic) }}
        >
          {style => (
            <animated.div className="single-step-content" style={{ ...style }}>
              {this.props.children[i]}
            </animated.div>
          )}
        </Spring>
      );
      wrappedChildren.push(wrappedChild);
    }
    return wrappedChildren;
  }

  render() {
    const vertical = this.props.vertical;

    let containerClasses = 'steps-container';
    let springTo;
    if (vertical) {
      containerClasses += ' vertical';
      springTo = { left: 0, top: `-${this.state.currentStep * 100}%` };
    } else {
      springTo = { left: `-${this.state.currentStep * 100}%`, top: 0 };
    }

    return (
      <div className={containerClasses} style={{ height: this.props.height }}>
        <StepsMainNav
          currentStep={this.state.currentStep}
          totalNumSteps={this.props.children.length}
          onClick={this.goToStep.bind(this)}
          vertical={this.props.vertical}
          pulseNextStep={this.props.pulseNextStep}
        />

        <Spring
          native
          to={springTo}
          impl={TimingAnimation}
          config={{ duration: 625, easing: Easing.out(Easing.cubic) }}
        >
          {style => (
            <animated.div className={'steps-content-container'} style={{ ...style }}>
              {this._renderChildren(vertical)}
            </animated.div>
          )}
        </Spring>

        {vertical ? <div className="centering-space" /> : null}
      </div>
    );
  }
}

Steps.defaultProps = {
  currentStep: 0,
  vertical: false,
  pulseNextStep: false,
  autoSlide: false,
  autoSlideDelay: 4000,
  height: 'auto'
};

Steps.propTypes = {
  currentStep: PropTypes.number,
  vertical: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pulseNextStep: PropTypes.bool,
  autoSlide: PropTypes.bool,
  autoSlideDelay: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default Steps;
