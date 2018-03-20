import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

class CollapsePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.defaultExpanded
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
      <Panel
        className="collapse-panel remove-default"
        onClick={this.togglePanelExpanded}
        expanded={this.state.expanded}
      >
        <Panel.Toggle className="collapse-panel-toggle">
          <Panel.Heading className="bg-green-color">
            <Panel.Title className="collpase-panel-title" toggle>
              {titleText}
              <i className="fa fa-chevron-down float-right" />
            </Panel.Title>
          </Panel.Heading>
        </Panel.Toggle>
        <Panel.Collapse>
          <Panel.Body className="text-black ">{body}</Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

CollapsePanel.defaultProps = {
  defaultExpanded: false
};

CollapsePanel.propTypes = {
  titleText: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired,
  defaultExpanded: PropTypes.bool
};

export default CollapsePanel;
