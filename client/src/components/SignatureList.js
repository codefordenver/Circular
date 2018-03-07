import React from 'react';
import PropTypes from 'prop-types';

const SignatureList = ({ signatures }) => (
  <div className="signature-wrapper">
    {signatures.length ? (
      <h2>
        ({signatures.length}) Signature{signatures.length > 1 ? 's' : ''} on the list!
      </h2>
    ) : (
      <h2>Be the First!</h2>
    )}
    <ul>{signatures && signatures.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
  </div>
);

SignatureList.defaultProps = {
  signatures: []
};

SignatureList.propTypes = {
  signatures: PropTypes.arrayOf(PropTypes.object)
};

export default SignatureList;
