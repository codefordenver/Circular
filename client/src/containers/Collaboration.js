import React from 'react';

const Collaboration = () => (
  <div className="app-container about-container">
    <h1 className="about-header">Who Are We</h1>
    <p className="about-text">
      <a className="about-link" href="https://www.codefordenver.org/" alt="TODO">
        {' '}
        Code For Denver
      </a>{' '}
      is volunteer-driven, community outreach that improves people’s lives through technology.
    </p>
    <p className="about-text">
      <a className="about-link" href="https://www.ecocycle.org" alt="TODO">
        Eco-Cycle
      </a>{' '}
      is a Zero Waste non-profit based in Boulder Colorado. They started working in Denver in 2016
      as a commitment at the Denver Sustainable Summit to increase Denver’s diversion rate to 34%.
    </p>
  </div>
);

export default Collaboration;
