import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Tool = props => (
  <li className="tools" key={props.title}>
    <i className="fa fa-circle" aria-hidden="true" />
    <Link to={props.to}>{props.title}</Link>
  </li>
);

Tool.PropTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

const ToolList = () => (
  <div className="tool-list-wrapper">
    <h4>Helpful tools: </h4>
    <ul className="toolList">
      <Tool title="Tips for Approaching your Landlord" to="/tips-for-requesting" />
    </ul>
    <ul className="toolList">
      <Tool title="Denver Recycling Facts" to="/denver-recycling-info" />
    </ul>
  </div>
);

export default ToolList;
