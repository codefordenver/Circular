import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

// Components
import StepsMainNav from './StepsMainNav';
import StepHeaderNavButton from './StepHeaderNavButton';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: props.currentStep,
      autoSlide: props.autoSlide
    };
    this.goToStep = this.goToStep.bind(this);
  }

  componentDidMount() {
    if (this.state.autoSlide) {
      this.autoSlideInterval = setInterval(() => {
        if (this.state.autoSlide) {
          const nextStep = (this.state.currentStep + 1) % this.props.steps.length;
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
    if (i < this.props.steps.length && i > -1) {
      if (stopAutoSliding) {
        this.setState({ currentStep: i, autoSlide: false });
      } else {
        this.setState({ currentStep: i });
      }
    }
  }

  _createSteps() {
    const numSteps = this.props.steps.length;
    const stepsComponents = [];
    const currentStep = this.state.currentStep;
    for (let i = 0; i < numSteps; i += 1) {
      let springTo = { opacity: 0.2 };
      let springFrom = { opacity: 1 };
      if (!this.props.vertical) {
        springTo.height = 0;
        springFrom.height = 'auto';
      }
      if (currentStep === i) {
        springTo = { opacity: 1 };
        springFrom = { opacity: 0.2 };
        if (!this.props.vertical) {
          springTo.height = 'auto';
          springFrom.height = 200;
        }
      }
      const step = (
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
              <div className="step-header-wrapper">
                {this.props.steps[i].prevStepBtn && (
                  <StepHeaderNavButton
                    isReachableByKeyboard={i === currentStep}
                    isDisabled={i === 0}
                    targetStep={i - 1}
                    onClick={this.goToStep}
                  >
                    {this.props.steps[i].prevStepBtn}
                  </StepHeaderNavButton>
                )}

                {this.props.steps[i].headerContent}

                {this.props.steps[i].nextStepBtn && (
                  <StepHeaderNavButton
                    isReachableByKeyboard={i === currentStep}
                    isDisabled={i === numSteps - 1}
                    targetStep={i + 1}
                    onClick={this.goToStep}
                  >
                    {this.props.steps[i].nextStepBtn}
                  </StepHeaderNavButton>
                )}
              </div>

              {this.props.steps[i].content}
            </animated.div>
          )}
        </Spring>
      );
      stepsComponents.push(step);
    }
    return stepsComponents;
  }

  render() {
    let containerClasses = 'steps-container';
    let springTo;
    if (this.props.vertical) {
      containerClasses += ' vertical';
      springTo = { left: 0, top: `-${this.state.currentStep * 100}%` };
    } else {
      springTo = { left: `-${this.state.currentStep * 100}%`, top: 0 };
    }

    return (
      <div className={containerClasses} style={{ height: this.props.height }}>
        <StepsMainNav
          currentStep={this.state.currentStep}
          totalNumSteps={this.props.steps.length}
          onClick={this.goToStep}
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
              {this._createSteps()}
            </animated.div>
          )}
        </Spring>

        {this.props.vertical ? <div className="centering-space" /> : null}
      </div>
    );
  }
}

Steps.defaultProps = {
  currentStep: 0,
  vertical: false,
  pulseNextStep: true,
  autoSlide: false,
  autoSlideDelay: 4000,
  height: 'auto',
  steps: {
    prevStepBtn: null,
    nextStepBtn: null,
    headerContent: null
  }
};

Steps.propTypes = {
  currentStep: PropTypes.number,
  vertical: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pulseNextStep: PropTypes.bool,
  autoSlide: PropTypes.bool,
  autoSlideDelay: PropTypes.number,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.node.isRequired,
      headerContent: PropTypes.node,
      prevStepBtn: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      nextStepBtn: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
    })
  ).isRequired
};

export default Steps;
