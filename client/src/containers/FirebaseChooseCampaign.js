import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, browserHistory } from "react-router";
import { Grid, Row, Col } from "react-bootstrap";
import { firebaseCreateNewCampaign } from "../redux/actions/firebaseCampaigns";
import RenderLoading from "../components/ChooseCampaign/RenderLoading";
// import RenderError from '../components/ChooseCampaign/RenderError';
import RenderCampaignAlreadyExists from "../components/ChooseCampaign/RenderCampaignAlreadyExists";
import RenderNewCampaign from "../components/ChooseCampaign/RenderNewCampaign";
import RenderNearbyCampaigns from "../components/ChooseCampaign/RenderNearbyCampaigns";

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
    const {
      searchedAddress,
      searchedGeoPoint
    } = this.props.firebaseInitialSearch;
    if (name === "EXISTING_CAMPAIGN") {
      this.redirectToExistingCampaign();
    } else if (name === "NEW_CAMPAIGN") {
      this.makeNewCampaign(searchedAddress, searchedGeoPoint);
    } else if (name === "GO BACK") {
      this.props.router.goBack();
    }
  };

  redirectToExistingCampaign = () => {
    this.props.router.push(`/campaign/${this.props.exactMatch.campaignId}`);
  };

  makeNewCampaign = async (searchedAddress, latLng) => {
    await this.props.firebaseCreateNewCampaign(searchedAddress, latLng);
    const redirectCampaignId = await this.props.firebaseCampaigns
      .activeCampaign;
    // PUSH NEWLY CREATED CAMPAIGN TO ROUTER
    browserHistory.push({
      pathname: `/campaign/${redirectCampaignId}`,
      state: { isNewCampaign: true }
    });
  };

  render() {
    const {
      exactMatch,
      firebaseInitialSearch: {
        loading,
        loaded,
        nearbyCampaigns,
        selectedAddress
      }
    } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4} mdOffset={4} className="p-0 text-white">
            {loading && <RenderLoading />}
            {/* {!loading && error && <RenderError error={error} />} */}
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
              !exactMatch && (
                <RenderNewCampaign handleSelection={this.handleSelection} />
              )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

FirebaseChooseCampaign.defaultProps = {
  exactMatch: null,
  firebaseCampaigns: { activeCampaign: null }
};

FirebaseChooseCampaign.propTypes = {
  exactMatch: PropTypes.shape({
    campaignId: PropTypes.string.isRequired
  }),
  firebaseCampaigns: PropTypes.shape({
    activeCampaign: PropTypes.string
  }),
  firebaseCreateNewCampaign: PropTypes.func.isRequired,
  firebaseInitialSearch: PropTypes.shape({
    error: PropTypes.objectOf(PropTypes.any),
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    nearbyCampaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchedAddress: PropTypes.string.isRequired,
    searchedGeoPoint: PropTypes.shape({
      _lat: PropTypes.number.isRequired,
      _long: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  searchedAddress: PropTypes.string.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default connect(
  ({ auth, firebaseCampaigns, activeCampaign, firebaseInitialSearch }) => ({
    auth,
    firebaseCampaigns,
    activeCampaign,
    firebaseInitialSearch
  }),
  {
    firebaseCreateNewCampaign
  }
)(withRouter(FirebaseChooseCampaign));
