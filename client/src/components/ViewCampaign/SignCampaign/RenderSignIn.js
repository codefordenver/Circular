import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import GoogleButton from 'react-google-button';

const RenderSignIn = ({ firebaseSignInFacebook, firebaseSignInGoogle }) => (
  <div>
    <h4>Sign In With:</h4>
    <div className="login-button-signature">
      <Button
        bsStyle="remove-default"
        onClick={firebaseSignInFacebook}
        className="btn btn-facebook btn-login"
        block
      >
        <i className="fa fa-facebook-square" />Login with Facebook
      </Button>
    </div>
    <h5 className="content text-center">OR</h5>
    <div className="login-button-signature">
      <GoogleButton onClick={firebaseSignInGoogle} className="btn-google btn-login" />
    </div>
  </div>
);

RenderSignIn.propTypes = {
  firebaseSignInFacebook: PropTypes.func.isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired
};

export default RenderSignIn;
