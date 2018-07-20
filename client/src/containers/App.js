import { connect } from 'react-redux';
import Application from '../components/Application';
import {
  firebaseSignInGoogle,
  firebaseSignInFacebook,
  firebaseSignOut
} from '../redux/actions/firebaseAuth';
import { fetchUserSignatures } from '../redux/actions/signature';

const mapStateToProps = ({ auth, signature, firebaseUserSignatures }) => ({
  auth,
  userSignatures: {
    ...signature.userSignatures
  },
  firebaseUserSignatures
});

export default connect(mapStateToProps, {
  fetchUserSignatures,
  firebaseSignInGoogle,
  firebaseSignInFacebook,
  firebaseSignOut
})(Application);
