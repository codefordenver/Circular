import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';

const NavBarSignIn = ({ auth, firebaseSignInGoogle, firebaseSignInFacebook, router }) => {
  if (auth.status === 'SIGNED_IN' && router.location.state.createCampaignFlow === true) {
    router.push('/create-campaign');
  }

  return (
    <div>
      To continue please sign in:{' '}
      <Button bsStyle="primary" onClick={firebaseSignInFacebook}>
        Sign in With Facebook
      </Button>{' '}
      <Button bsStyle="primary" onClick={firebaseSignInGoogle}>
        Sign in With Google
      </Button>
    </div>
  );
};

NavBarSignIn.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired,
  router: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(NavBarSignIn);
