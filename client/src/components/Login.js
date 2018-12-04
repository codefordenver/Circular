import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';

const Login = ({ auth, firebaseSignInGoogle, firebaseSignInFacebook, router }) => {
  if (auth.status === 'SIGNED_IN' && router.location.state.createCampaignFlow === true) {
    router.push('/create-campaign');
  }

  return (
    <div className="campaign-sign-in-container">
      <div className="title-and-signin-container">
        <h1 className="create-a-login-title">CREATE A LOG-IN</h1>
        <div className="sign-in-container">
          SIGN WITH:{' '}
          <Button bsStyle="primary" className="google-login-btn" onClick={firebaseSignInGoogle}>
            Google
          </Button>
          OR
          <Button bsStyle="primary" className="facebook-login-btn" onClick={firebaseSignInFacebook}>
            Facebook
          </Button>{' '}
        </div>
      </div>
      <div className="sign-in-explaination">
        <h2 className="sign-up-campaign-title">Sign up to create a campaign</h2>
        <p className="sign-up-campaign-body">As a campaign supporter,</p>
        <p className="sign-up-campaign-body">your account lets you access your</p>
        <p className="sign-up-campaign-body">campaign and make progress.</p>
        <p className="sign-up-campaign-body">You can only sign one campaign</p>
        <p className="sign-up-campaign-body">at a time.</p>
      </div>
    </div>
  );
};

Login.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired,
  router: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Login);
