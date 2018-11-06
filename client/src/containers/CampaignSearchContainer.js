import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { firebaseCreateNewCampaign } from '../redux/actions/firebaseCampaigns';
import Loading from '../components/ChooseCampaign/Loading';

const CampaignSearch = ({ location, firebaseInitialSearch, router }) => {
  const { exactMatch, loading, loaded } = firebaseInitialSearch;
  if (loading || !loaded) {
    return <Loading />;
  }
  if (
    // Is this logic really right?
    exactMatch &&
    exactMatch.length !== 0 &&
    exactMatch.address &&
    exactMatch.address === location.state.searchedAddress
  ) {
    router.replace('/existing-campaign');
  }

  if (!exactMatch) {
    router.replace('/new-campaign');
  }

  return null;
};

CampaignSearch.defaultProps = {
  location: { state: { isNewCampaign: '' } }
};

CampaignSearch.propTypes = {
  firebaseInitialSearch: PropTypes.shape({
    exactMatch: PropTypes.shape({
      campaignId: PropTypes.string.isRequired
    }),
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      isNewCampaign: PropTypes.bool
    })
  }),
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default connect(
  ({ firebaseInitialSearch }) => ({
    firebaseInitialSearch
  }),
  {
    firebaseCreateNewCampaign
  }
)(withRouter(CampaignSearch));
