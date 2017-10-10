import React from 'react';
import { connect } from 'react-redux';
import { OAuthSignInButton } from "redux-auth/default-theme";
// import { Link } from 'react-router';

const SignPetition = () => (
  <div className="sign-petition-wrapper">
    <h2>Show your support!</h2>
    <OAuthSignInButton provider="google">Google</OAuthSignInButton>
    <OAuthSignInButton provider="facebook">Facebook</OAuthSignInButton>
  </div>
);

export default connect(
  ({ auth }) => ({ auth }))(SignPetition);