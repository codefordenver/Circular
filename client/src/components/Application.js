import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';

const Application = ({
  auth,
  closeMap,
  firebaseSignInGoogle,
  firebaseSignInFacebook,
  firebaseSignOut,
  userSignatures,
  ...props
}) => (
  <div className="app-container">
    <NavBar
      auth={auth}
      closeMap={closeMap}
      firebaseSignOut={firebaseSignOut}
      firebaseSignInGoogle={firebaseSignInGoogle}
      firebaseSignInFacebook={firebaseSignInFacebook}
      userSignatures={userSignatures}
      {...props}
    />
    {props.children}
    <Footer />
  </div>
);

Application.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequried
  }).isRequired,
  children: PropTypes.shape({}).isRequired,
  closeMap: PropTypes.func.isRequired,
  firebaseSignInGoogle: PropTypes.func.isRequired,
  firebaseSignInFacebook: PropTypes.func.isRequired,
  firebaseSignOut: PropTypes.func.isRequired,
  fetchUserSignatures: PropTypes.func.isRequired,
  userSignatures: PropTypes.shape({}).isRequired
};

export default Application;
