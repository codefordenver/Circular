import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import Loading from './ChooseCampaign/Loading';

function AuthenticatedRoutes({ auth, children, router, location }) {
  if (auth && auth.loading) {
    return <Loading />;
  } else if (auth.status !== 'SIGNED_IN') {
    router.push({
      pathname: '/login',
      state: { nextPathname: location.pathname }
    });
  }

  return children;
}

AuthenticatedRoutes.defaultProps = {
  auth: null,
  location: null
};

AuthenticatedRoutes.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    uid: PropTypes.string
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
};

export default withRouter(AuthenticatedRoutes);
