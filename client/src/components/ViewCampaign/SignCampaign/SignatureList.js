import React from 'react';
import PropTypes from 'prop-types';

const SignatureList = ({ activeCampaignSignatures }) => (
  <div>
    {activeCampaignSignatures.length > 0 ? (
      <h2>
        ({activeCampaignSignatures.length}) Signature{activeCampaignSignatures.length > 1
          ? 's'
          : ''}
        on the list!
      </h2>
    ) : (
      <h2>Be the First!</h2>
    )}
    <ul>{activeCampaignSignatures.map(signer => <li key={signer}>{signer}</li>)}</ul>
  </div>
);

SignatureList.defaultProps = {
  activeCampaignSignatures: []
};

SignatureList.propTypes = {
  activeCampaignSignatures: PropTypes.arrayOf(PropTypes.string)
};

export default SignatureList;
