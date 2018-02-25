import React from 'react';

const Tools = () => (
  <div className="main-tools col-5">
    <ul className="list-group align-middle text-left">
      <li className="list-group-item d-flex justify-content-left align-items-center">
        <span className="col-10 tool-list">
          <i className="fa fa-circle fa-md" aria-hidden="true" />
          Download a Flyer
        </span>
        <span className="col-1">
          <i className="fa fa-file-pdf-o" aria-hidden="true" />
        </span>
      </li>
      <li className="list-group-item d-flex justify-content-left align-items-center">
        <span className="col-10 tool-list">
          <i className="fa fa-circle fa-md" aria-hidden="true" />
          Level of Service Estimate
        </span>
        <span className="col-1 pull-left">
          <i className="fa fa-bar-chart" aria-hidden="true" />
        </span>
      </li>
      <li className="list-group-item d-flex justify-content-left align-items-center">
        <span className="col-10 tool-list">
          <i className="fa fa-circle fa-md" aria-hidden="true" />
          Approaching your landlord
        </span>
        <span className="col-1">
          <i className="fa fa-info" aria-hidden="true" />
        </span>
      </li>
      <li className="list-group-item d-flex justify-content-left align-items-center">
        <span className="col-10 tool-list">
          <i className="fa fa-circle fa-md" aria-hidden="true" />
          Denver recycling facts and policies
        </span>
        <span className="col-1">
          <i className="fa fa-recycle" aria-hidden="true" />
        </span>
      </li>
    </ul>
  </div>
);

export default Tools;
