import { connect } from 'react-redux';
import AuthenticatedRoutes from '../components/AuthenticatedRoutes';

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps)(AuthenticatedRoutes);
