import React, { Component } from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';

class ToolList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.defaultProps.defaultExpanded
    };
  }

  togglePanelExpanded = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  render() {
    return (
      <div
        className="tool-panel-wrapper"
        onToggle={this.togglePanelExpanded}
        expanded={this.state.expanded}
      >
        <Panel className="tool-panel">
          <Panel.Toggle className="tool-panel-toggle">
            <Panel.Heading className="bg-blue-color">
              <Panel.Title className="tool-panel-title" toggle>
                Helpful tools:
                <i className="fa fa-chevron-down float-right" />
              </Panel.Title>
            </Panel.Heading>
          </Panel.Toggle>
          <Panel.Collapse>
            <Panel.Body>
              <ul>
                <li>
                  <Link className="toolList" to="/tips-for-requesting">
                    Tips for Approaching your Landlord
                  </Link>
                </li>
                <li>
                  <Link className="toolList" to="/denver-learn-more">
                    Denver Recycling Facts
                  </Link>
                </li>
              </ul>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

ToolList.defaultProps = {
  defaultExpanded: false
};

export default ToolList;
