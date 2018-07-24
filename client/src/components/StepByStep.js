import React from 'react';
import { PageHeader } from 'react-bootstrap';

const StepByStep = () => (
  <div className="stepbystep-wrapper">
    <PageHeader className="home-section-page-header info-graphic-header">
      HOW DOES THIS WORK?
    </PageHeader>
    <div className="info-graphic">
      <div className="box">
        <i className="fa fa-bullhorn" />
        <p>1. CREATE</p>
      </div>
      <div className="box">
        <i className="fa fa-users" />
        <p>2. RECRUIT</p>
      </div>
      <div className="box">
        <i className="fa fa-comment" />
        <p>3. REQUEST</p>
      </div>
      <div className="box">
        <i className="fa fa-recycle" />
        <p>4. RECYCLE</p>
      </div>
    </div>
  </div>
);

export default StepByStep;
