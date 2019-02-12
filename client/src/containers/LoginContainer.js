import { connect } from 'react-redux';
import Login from '../components/Login';
import { firebaseSignInGoogle, firebaseSignInFacebook } from '../redux/actions/firebaseAuth';

export default connect(
  ({ auth }) => ({
    auth
  }),
  {
    firebaseSignInGoogle,
    firebaseSignInFacebook
  }
)(Login);
