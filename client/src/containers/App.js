import { connect } from "react-redux";
import Application from "../components/Application";
import {
  firebaseSignInGoogle,
  firebaseSignInFacebook,
  firebaseSignOut
} from "../redux/actions/firebaseAuth";
import { closeMap } from "../redux/actions/googleMap";
import { fetchUserSignatures } from "../redux/actions/signature";

const mapStateToProps = ({ auth, signature, firebaseUserSignatures }) => ({
  auth,
  closeMap,
  userSignatures: {
    ...signature.userSignatures
  },
  firebaseUserSignatures
});

export default connect(
  mapStateToProps,
  {
    closeMap,
    fetchUserSignatures,
    firebaseSignInGoogle,
    firebaseSignInFacebook,
    firebaseSignOut
  }
)(Application);
