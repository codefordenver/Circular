import React from 'react';
import PropTypes from 'prop-types';

const SignatureList = props => (
  <div className="sign-campaign-wrapper">
    <h2>Signatures</h2>
    <ul>{props.signatures && props.signatures.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>
  </div>
);

SignatureList.defaultProps = {
  signatures: []
};

SignatureList.propTypes = {
  signatures: PropTypes.arrayOf(PropTypes.object)
};

export default SignatureList;
