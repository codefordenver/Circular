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

  handleSelection = e => {
    e.stopPropagation();
    e.preventDefault();
    const { name } = e.target;
    const { searchedAddress, latLng } = this.props;
    if (name === 'EXISTING_CAMPAIGN') {
      this.redirectToExistingCampaign();
    } else if (name === 'NEW_CAMPAIGN') {
      this.makeNewCampaign(searchedAddress, latLng);
    }
  };

  redirectToExistingCampaign = () => {
    this.props.router.push(`/campaign/${this.props.exactMatch.campaignId}`);
  };

  makeNewCampaign = async (searchedAddress, latLng) => {
    await this.props.firebaseCreateNewCampaign(searchedAddress, latLng);
    const redirectCampaignId = await this.props.firebaseCampaigns.activeCampaign;
    // PUSH NEWLY CREATED CAMPAIGN TO ROUTER
    this.props.router.push(`/campaign/${redirectCampaignId}`);
  };

  render() {
    const { loading, loaded, nearbyCampaigns, selectedAddress, exactMatch, error } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4} mdOffset={4} className="p-0 text-white">
            {loading && <RenderLoading />}
            {!loading && error && <RenderError error={error} />}
            {/* if no longer loading and not erroring then
            render one of the following three depending
             on the status of nearby campaign */}
            {loaded &&
              exactMatch &&
              exactMatch.length !== 0 &&
              exactMatch.address && (
                <RenderCampaignAlreadyExists
                  exactMatchAddress={exactMatch.address}
                  handleSelection={this.handleSelection}
                />
              )}
            {loaded &&
              nearbyCampaigns &&
              nearbyCampaigns.length !== 0 && (
                <RenderNearbyCampaigns
                  nearbyCampaigns={nearbyCampaigns}
                  selectedAddress={selectedAddress}
                />
              )}
            {!loading &&
              !exactMatch && <RenderNewCampaign handleSelection={this.handleSelection} />}
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
    campaignsAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
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
