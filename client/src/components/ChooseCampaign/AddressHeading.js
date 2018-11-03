import React from 'react';
import PropTypes from 'prop-types';

const AddressHeading = ({ headingTitle, subTitle }) => (
  <div className="py-15 text-center">
    <h1 className="new-address-heading py-15">{headingTitle}</h1>
    {subTitle && <h2 className="new-address-sub-heading py-15">{subTitle}</h2>}
  </div>
);

AddressHeading.propTypes = {
  headingTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
};

export default AddressHeading;
