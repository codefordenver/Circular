import React from 'react';
import { Link } from 'react-router';

const RecyclingInfo = () => (
  <div className="info_wrapper">
    <div className="info_header">
      Denver's recycling rate is only 20%, while the national average is 35%.
    </div>
    <div className="info_details">
      The City of Denver only provides recycling service to single-family residential homes and buildings with seven
      or fewer units. Furthermore, multi-family building managers are not mandated to provide recycling service, but you and your neighbors can
      request recycling service from your landlord today!
    </div>
    <Link to="/denver-recycling-info">
      <div className="info_footer">
        Learn More
      </div>
    </Link>
  </div>
);

export default RecyclingInfo;
