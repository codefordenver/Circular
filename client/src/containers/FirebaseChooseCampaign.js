import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import { firebaseCreateNewCampaign } from '../redux/actions/firebaseCampaigns';
import RenderLoading from '../components/ChooseCampaign/RenderLoading';
import RenderError from '../components/ChooseCampaign/RenderError';
import RenderCampaignAlreadyExists from '../components/ChooseCampaign/RenderCampaignAlreadyExists';
import RenderNewCampaign from '../components/ChooseCampaign/RenderNewCampaign';
import RenderNearbyCampaigns from '../components/ChooseCampaign/RenderNearbyCampaigns';

class FirebaseChooseCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
  }

  handleSubmit = e => {
    e.stopPropagation();
    e.preventDefault();
    const { searchedAddress, latLng, firebaseCampaigns: { campaignsAddresses } } = this.props;
    // TODO make exisiting address unreachable
    if (campaignsAddresses.includes(searchedAddress)) {
      alert('already exists');
    } else {
      this.makeNewCampaign(searchedAddress, latLng);
    }
  };

  redirectToExistingCampaign = (e, campaignId) => {
    this.props.router.push(`/campaign/${this.props.exactMatch.campaignId}`);
  };

  makeNewCampaign = async (searchedAddress, latLng) => {
    await this.props.firebaseCreateNewCampaign(searchedAddress, latLng);
    const redirectCampaignId = await this.props.firebaseCampaigns.activeCampaign;
    // get newly Created Dispatch to push router
    this.props.router.push(`/campaign/${redirectCampaignId}`);
  };

  render() {
    const {
      loading,
      loaded,
      nearbyCampaigns,
      selectedAddress,
      searchedAddress,
      exactMatch,
      error
    } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4} mdOffset={4} className="p-0 text-white">
            <h1> hi </h1>
            {loading && <RenderLoading />}
            {!loading && error && <RenderError error={error} />}
            {/* if no longer loading and not erroring then
            render one of the following three depending
             on the status of nearby campaign */}
            {loaded &&
              exactMatch &&
              exactMatch !== null &&
              exactMatch.address && (
                <RenderCampaignAlreadyExists
                  exactMatchAddress={exactMatch.address}
                  onClick={this.redirectToExistingCampaign}
                />
              )}
            {loaded &&
              nearbyCampaigns &&
              nearbyCampaigns.length !== 0 &&
              nearbyCampaigns[0].address !== searchedAddress.formatted_address && (
                <RenderNearbyCampaigns
                  nearbyCampaigns={nearbyCampaigns}
                  selectedAddress={selectedAddress}
                />
              )}
            {!loading && <RenderNewCampaign handleSubmit={this.handleSubmit} />}
          </Col>
        </Row>
      </Grid>
    );
  }
}

FirebaseChooseCampaign.defaultProps = {
  exactMatch: null
};

FirebaseChooseCampaign.propTypes = {
  loading: PropTypes.string.isRequired,
  loaded: PropTypes.string.isRequired,
  nearbyCampaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedAddress: PropTypes.string.isRequired,
  exactMatch: PropTypes.shape({
    campaignId: PropTypes.string.isRequired
  }),
  firebaseCampaigns: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    campaignsAddresses: PropTypes.arrayOf().isRequired,
    campaigns: PropTypes.arrayOf(
      PropTypes.shape({
        address: PropTypes.string.isRequired,
        campaignId: PropTypes.string.isRequired,
        createdAt: PropTypes.shape({}).isRequired,
        latLng: PropTypes.shape({
          _lat: PropTypes.number.isRequired,
          _long: PropTypes.number.isRequired
        }).isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  router: PropTypes.shape({}).isRequired,
  searchedAddress: PropTypes.string.isRequired,
  error: PropTypes.objectOf(PropTypes.any).isRequired,
  latLng: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(
  ({ initialSearch, firebaseCampaigns }) => ({ ...initialSearch, firebaseCampaigns }),
  {
    firebaseCreateNewCampaign
  }
)(withRouter(FirebaseChooseCampaign));
