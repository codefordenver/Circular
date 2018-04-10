import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

class CollapsePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.defaultExpanded
    };
  }

  togglePanelExpanded = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  render() {
    const { body, titleText } = this.props;
    return (
      /* eslint-disable */
      <div onClick={this.togglePanelExpanded}>
        {/* eslint-enable */}
        <Panel
          /*
          bsStyle="remove-default" causes an console error but it
          is the correct way to remove react-bootstrap defaults.
          the console error is react-bootstraps fault.
        */
          bsStyle="remove-default"
          className="collapse-panel"
          expanded={this.state.expanded}
        >
          <Panel.Toggle className="collapse-panel-toggle">
            <Panel.Heading className={this.props.headingStyle}>
              <Panel.Title className="collapse-panel-title" toggle>
                {titleText}
                <i className="fa fa-chevron-down float-right" />
              </Panel.Title>
            </Panel.Heading>
          </Panel.Toggle>
          <Panel.Collapse>
            <Panel.Body className="text-black ">{body}</Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

CollapsePanel.defaultProps = {
  defaultExpanded: false,
  headingStyle: 'bg-green-color'
};

CollapsePanel.propTypes = {
  titleText: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired,
  defaultExpanded: PropTypes.bool,
  headingStyle: PropTypes.string
};

export default CollapsePanel;
