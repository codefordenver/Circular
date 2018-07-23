import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/Navigation/Navbar';

const Application = ({
  auth,
  firebaseSignInGoogle,
  firebaseSignInFacebook,
  firebaseSignOut,
  userSignatures,
  ...props
}) => (
  <div className="app-container">
    <NavBar
      auth={auth}
      firebaseSignOut={firebaseSignOut}
      firebaseSignInGoogle={firebaseSignInGoogle}
      firebaseSignInFacebook={firebaseSignInFacebook}
      userSignatures={userSignatures}
      {...props}
    />
    {props.children}
  </div>
);

Application.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequried
  }).isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired,
  firebaseSignOut: PropTypes.func.isRequired,
  children: PropTypes.shape({}).isRequired,
  userSignatures: PropTypes.shape({}).isRequired,
  fetchUserSignatures: PropTypes.func.isRequired
};

export default Application;
