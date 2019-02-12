import React from 'react';

const Loading = () => (
  <div className="loader">
    <h1 className="loading-header">Searching for nearby campaigns...</h1>
    <i className="fa fa-recycle fa-4x slow-spin loading-spinner" />
  </div>
);

export default Loading;
