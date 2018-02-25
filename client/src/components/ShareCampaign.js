import React from 'react';

const ShareCampaign = () => (
  <div>
    <div className="row text-center">
      <h2 className="col center-align"> SHARE YOUR CAMPAGIN: </h2>
      <div className="col">
        <button className="btn btn-primary">
          <i className="facebook icon" />
          Facebook
        </button>
      </div>
      <div className="col">
        <button className="btn btn-success">
          <i className="instagram icon" />
          Instagram
        </button>
      </div>
      <div className="col">
        <button className="btn btn-warning">
          <i className="twitter icon" />
          Twitter
        </button>
      </div>
    </div>
  </div>
);

export default ShareCampaign;
