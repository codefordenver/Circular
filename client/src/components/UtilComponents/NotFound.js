import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
  <div className="not-found-container">
    <div>
      <h1>You seem to have gotten lost...</h1>
    </div>
    <div>
      <i className="fa fa-4x fa-recycle loading-spinner slow-spin" />
    </div>
    <div>
      <Link className="home-section-link" to="/">
        Go back to Home Page
      </Link>
    </div>
  </div>
);

export default NotFound;
