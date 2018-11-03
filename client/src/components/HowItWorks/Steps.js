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
  }

  componentDidMount() {
    const { autoSlide, currentStep } = this.state;
    const { steps, autoSlideDelay } = this.props;
    if (autoSlide) {
      this.autoSlideInterval = setInterval(() => {
        if (autoSlide) {
          const nextStep = (currentStep + 1) % steps.length;
          this.setState({ currentStep: nextStep });
        }
      }, autoSlideDelay);
    }
  }

  componentWillUnmount() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  goToStep = (i, stopAutoSliding = true) => {
    if (i < this.props.steps.length && i > -1) {
      if (stopAutoSliding) {
        this.setState({ currentStep: i, autoSlide: false });
      } else {
        this.setState({ currentStep: i });
      }
    }
  };

  createSteps = () => {
    const { vertical, steps } = this.props;
    const numSteps = steps.length;
    const stepsComponents = [];
    const currentStep = this.state.currentStep;
    for (let i = 0; i < numSteps; i += 1) {
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
                {steps[i].prevStepBtn && (
                  <StepHeaderNavButton
                    isReachableByKeyboard={i === currentStep}
                    isDisabled={i === 0}
                    targetStep={i - 1}
                    onClick={this.goToStep}
                  >
                    {steps[i].prevStepBtn}
                  </StepHeaderNavButton>
                )}

                {steps[i].headerContent}

                {steps[i].nextStepBtn && (
                  <StepHeaderNavButton
                    isReachableByKeyboard={i === currentStep}
                    isDisabled={i === numSteps - 1}
                    targetStep={i + 1}
                    onClick={this.goToStep}
                  >
                    {steps[i].nextStepBtn}
                  </StepHeaderNavButton>
                )}
              </div>

              {steps[i].content}
            </animated.div>
          )}
        </Spring>
      );
      stepsComponents.push(step);
    }
    return stepsComponents;
  };

  render() {
    let containerClasses = 'steps-container';
    let springTo;
    const { currentStep } = this.state;
    const { height, pulseNextStep, vertical, steps } = this.props;
    if (vertical) {
      containerClasses += ' vertical';
      springTo = { left: 0, top: `-${currentStep * 100}%` };
    } else {
      springTo = { left: `-${currentStep * 100}%`, top: 0 };
    }
    return (
      <div className={containerClasses} style={{ height }}>
        <StepsMainNav
          currentStep={currentStep}
          totalNumSteps={steps.length}
          onClick={this.goToStep}
          vertical={vertical}
          pulseNextStep={pulseNextStep}
        />

        <Spring
          native
          to={springTo}
          impl={TimingAnimation}
          config={{ duration: 625, easing: Easing.out(Easing.cubic) }}
        >
          {style => (
            <animated.div className={'steps-content-container'} style={{ ...style }}>
              {this.createSteps()}
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
