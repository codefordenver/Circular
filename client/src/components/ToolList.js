import React, { Component } from 'react';
import { Link } from 'react-router';
import CollapsePanel from './CollapsePanel';

class ToolList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultExpanded: false
    };
  }

  togglePanelExpanded = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  render() {
    return (
      <CollapsePanel
        headingStyle="bg-blue-color text-center"
        titleText="Helpful tools:"
        body={
          <ul className="tool-list-body">
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
        }
      />
    );
  }
}

export default ToolList;
