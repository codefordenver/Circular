import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/Navbar';

const Application = ({ auth, signInFacebook, signInGoogle, signOut, userSignatures, ...props }) => (
  <div className="app-container">
    <NavBar
      auth={auth}
      signOut={signOut}
      signInGoogle={signInGoogle}
      signInFacebook={signInFacebook}
      location={'/'}
      userSignatures={userSignatures}
    />
    {props.children}
  </div>
);

Application.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequried
  }).isRequired,
  signInGoogle: PropTypes.func.isRequired,
  signInFacebook: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  children: PropTypes.shape({}).isRequired,
  userSignatures: PropTypes.shape({}).isRequired,
  fetchUserSignatures: PropTypes.func.isRequired
};

export default Application;
