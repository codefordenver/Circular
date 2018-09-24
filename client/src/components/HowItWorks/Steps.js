import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
// import { Transition, animated } from 'react-spring';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStep: props.selectedStep || 0
    };
  }

  _goToStep(i) {
    this.setState({ selectedStep: i });
  }

  _nextStep() {
    if (this.state.selectedStep + 1 < this.props.children.length) {
      this.setState({ selectedStep: this.state.selectedStep + 1 });
    }
  }

  _prevStep() {
    if (this.state.selectedStep - 1 > -1) {
      this.setState({ selectedStep: this.state.selectedStep - 1 });
    }
  }

  _renderStepSelectors() {
    const numSteps = this.props.children.length;
    const selectedStep = this.state.selectedStep;
    const a = [];
    let halfSpacerClasses = 'half-spacer';
    if (this.props.vertical) {
      halfSpacerClasses += ' vertical';
    }
    a.push(<div className={halfSpacerClasses} key={'halfSpacer-start'} />);

    for (let i = 0; i < numSteps; i++) {
      let stepSelectorClasses = `step-selector-${i}`;
      let stepSpacerClasses = 'spacer-line';
      if (this.props.vertical) {
        stepSpacerClasses += ' vertical';
        stepSelectorClasses += ' vertical';
      }
      if (selectedStep === i) {
        stepSelectorClasses += ' selected';
      } else {
        stepSelectorClasses += ' not-selected';
      }
      if (i < selectedStep) {
        stepSelectorClasses += ' highlighted';
        stepSpacerClasses += ' highlighted';
      }

      const selector = (
        <div
          className={stepSelectorClasses}
          key={`step-selector-${i}`}
          onClick={() => {
            this._goToStep(i);
          }}
        >
          <div className="circle">{i + 1}</div>
        </div>
      );
      a.push(selector);

      if (i !== numSteps - 1) {
        const stepSpacerLine = <div className={stepSpacerClasses} key={`step-spacer-${i}`} />;
        a.push(stepSpacerLine);
      }
    }
    a.push(<div className={halfSpacerClasses} key={'halfSpacer-end'} />);
    return a;
  }

  _renderChildren() {
    const wrappedChildren = [];
    for (let i = 0; i < this.props.children.length; i++) {
      const wrappedChild = (
        <div className="single-step-content" key={`step-content-${i}`}>
          <div className="container">{this.props.children[i]}</div>
        </div>
      );
      wrappedChildren.push(wrappedChild);
    }
    return wrappedChildren;
  }

  render() {
    let prevStepBtnClassNames = 'step-button prev';
    if (this.state.selectedStep === 0) {
      prevStepBtnClassNames += ' disabled';
    }

    let nextStepBtnClassNames = 'step-button next';
    if (this.state.selectedStep === this.props.children.length - 1) {
      nextStepBtnClassNames += ' disabled';
    }

    const vertical = this.props.vertical ? this.props.vertical : false;
    console.log(this.props);
    console.log(vertical);

    let containerClasses = 'steps-container';
    let selectorsContainerClasses = 'step-selectors-container';
    let stepsContentPositioningStyles;
    if (vertical) {
      containerClasses += ' vertical';
      selectorsContainerClasses += ' vertical';
      stepsContentPositioningStyles = {
        left: '0px',
        top: `-${this.state.selectedStep * 100}%`
      };
    } else {
      stepsContentPositioningStyles = {
        left: `-${this.state.selectedStep * 100}%`,
        top: '0px'
      };
    }

    return (
      <div className={containerClasses} style={{ height: this.props.height }}>
        <div className={selectorsContainerClasses}>{this._renderStepSelectors()}</div>

        <div className={'steps-content-container'} style={stepsContentPositioningStyles}>
          {this._renderChildren()}
        </div>

        {this.props.showPrevNextButtons && (
          <div className="container">
            <Row>
              <Col xs={12} md={10} mdOffset={1}>
                <div className="step-end-buttons">
                  <div
                    className={prevStepBtnClassNames}
                    onClick={() => {
                      this._prevStep();
                    }}
                  >
                    PREVIOUS
                  </div>
                  <div className="take-space" />
                  <div
                    className={nextStepBtnClassNames}
                    onClick={() => {
                      this._nextStep();
                    }}
                  >
                    NEXT
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default Steps;
