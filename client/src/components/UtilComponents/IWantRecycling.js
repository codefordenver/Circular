import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../UtilComponents/Button';

function IWantRecycling({ address }) {
  const displayAddress = address.split(',')[0];
  return (
    <Fragment>
      <div className="i-want-recycling-wrapper ">
        <div className="header">{`I WANT RECYCLING at ${displayAddress}`}</div>
      </div>
    </Fragment>
  );
}

IWantRecycling.propTypes = {
  address: PropTypes.string.isRequired
};

export default IWantRecycling;
