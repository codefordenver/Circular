import React from 'react';

const CampaignStatus = () => (
  <div>
    <div className="row text-center">
      <h4 className="col text-center">
        Create Campaign
        <ul className="complete">
          <li>
            <i className="fa fa-dot-circle-o" aria-hidden="true" />
          </li>
        </ul>
      </h4>
      <h4 className="col">
        Gather Signature
        <ul className="pending">
          <li>
            <i className="fa fa-dot-circle-o" aria-hidden="true" />
          </li>
        </ul>
      </h4>
      <h4 className="col">
        Tell All the Neighbors
        <ul className="pending">
          <li>
            <i className="fa fa-dot-circle-o" aria-hidden="true" />
          </li>
        </ul>
      </h4>
      <h4 className="col">
        Contact Property Manager
        <ul className="pending">
          <li>
            <i className="fa fa-dot-circle-o" aria-hidden="true" />
          </li>
        </ul>
      </h4>
    </div>
  </div>
);

export default CampaignStatus;

{
  /* <div>
    <div className="row ml-auto flexy">
      <h4 className="col-3">
        Create Campaign
        <ul className="complete">
          <li />
        </ul>
      </h4>
      <h4 className="col-3">
        Gather Signature
        <ul className="pending">
          <li> test </li>
        </ul>
      </h4>
      <h4 className="col-3">
        Test
        <ul className="pending">
          <li> test </li>
        </ul>
      </h4>
      <h4 className="col-3">
        Test
        <ul className="pending">
          <li> test </li>
        </ul>
      </h4>
    </div>
  </div> */
}
