import React from 'react';
import { Link } from 'react-router';

const PropManagerLinks = () => (
  <div className="managerlinks_wrapper">
    <div className="managerlinks_header">
      Property Managers
    </div>
    <div className="managerlinks_details">
      Boost tenant retention and building appeal by providing sustainable waste disposal to your tenants!
    </div>
    <div className="managerlinks_links">
      <Link to="/denver-recycling-info">
        <div className="managerlink">Tips And Resources</div>
        <div className="arrowlink" />
      </Link>
      <Link to="/denver-recycling-info">
        <div className="managerlink">Cost and Service Estimator</div>
        <div className="arrowlink" />
      </Link>
      <Link to="/denver-recycling-info">
        <div className="managerlink">FAQ</div>
        <div className="arrowlink" />
      </Link>
    </div>
  </div>
);

export default PropManagerLinks;