import React from 'react';
import { Link } from 'react-router';

const RecyclingInfo = () => (
  <div className="info_wrapper">
    <div className="info_header">
      Denver's recycling rate is only 20%, while the national average is 35%.
    </div>
    <div className="info_details">
      The City of Denver does not provide recycling collection service to multi-family buildings with 8 or more units;
      nor does the City mandate that multi-family building managers provide the service to their tenants. You and your neighbors
      must persuade your landlord to provide recycling collection service. Use this tool to organize and collectively request recycling
      collection!
    </div>
    <Link to="/denver-recycling-info">
      <div className="info_footer">
        Learn more about recycling in Denver!
      </div>
    </Link>
  </div>
);

export default RecyclingInfo;