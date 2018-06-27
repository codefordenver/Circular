import { connect } from 'react-redux';
import Application from '../components/Application';
import { signInGoogle, signInFacebook, signOut } from '../redux/actions/firebaseAuth';
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
  signInFacebook,
  signInGoogle,
  signOut
})(Application);
