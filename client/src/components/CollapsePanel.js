import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

class CollapsePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded
    };
    this.expandPanel = this.expandPanel.bind(this);
  }

  expandPanel(e) {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { body, titleText } = this.props;
    return (
      <Panel
        bsStyle="remove-default"
        className="collapse-panel"
        onClick={this.expandPanel}
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

CollapsePanel.propTypes = {
  titleText: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired
};

export default CollapsePanel;
