import React from 'react';
import { Link } from 'react-router';

const PropManagerLinks = () => (
  <div className="managerlinks_wrapper">
    <div className="managerlinks_header">
      Property Managers
    </div>
    <div className="managerlinks_details">
      Provide sustainable waste management to your tenants!<br />
      Increase tenant satisfaction and boost your building's appeal by providing recycling service.
      <br />
      <br />
      Please visit the page below to estimate your required level of service and tips on
      purchasing service.
    </div>
    <div className="managerlinks_links">
      <Link to="/denver-recycling-info">
        <div className="managerlink">Tips And Resources</div>
        <div className="arrowlink" />
      </Link>
    </div>
  </div>
);

export default PropManagerLinks;
