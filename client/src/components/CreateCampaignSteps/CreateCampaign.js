import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import SubmitButton from '../UtilComponents/SubmitButton';
import AddressHeading from '../UtilComponents/AddressHeading';

class CreateCampaign extends React.Component {
  state = {
    creatingCampaign: false
  };

  _makeNewCampaign = async () => {
    this.setState({ creatingCampaign: true });
    const {
      auth,
      firebaseCampaigns,
      firebaseCreateNewCampaign,
      firebaseInitialSearch,
      router
    } = this.props;
    await firebaseCreateNewCampaign(
      firebaseInitialSearch.searchedAddress,
      firebaseInitialSearch.searchedGeoPoint,
      auth.uid
    );
    const redirectCampaignId = await firebaseCampaigns.activeCampaign;
    // PUSH NEWLY CREATED CAMPAIGN TO ROUTER
    router.push({
      pathname: `/campaign/${redirectCampaignId}`,
      state: { isNewCampaign: true }
    });
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4} mdOffset={4} className="p-0 text-white">
            <AddressHeading
              headingTitle={"You're the first to support recycling for your building!"}
              subTitle={
                "Launch your building's request for recycling! (We promise it will only take a minute)"
              }
            />
            <SubmitButton
              buttonText={'CREATE CAMPAIGN'}
              handleSelection={this._makeNewCampaign}
              name={'NEW_CAMPAIGN'}
              disabled={this.state.creatingCampaign}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

CreateCampaign.defaultProps = {
  firebaseCampaigns: { activeCampaign: null },
  firebaseInitialSearch: null
};

CreateCampaign.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    uid: PropTypes.string
  }).isRequired,
  firebaseCampaigns: PropTypes.shape({
    activeCampaign: PropTypes.string
  }),
  firebaseCreateNewCampaign: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  firebaseInitialSearch: PropTypes.shape({
    searchedGeoPoint: PropTypes.shape({
      _lat: PropTypes.number.isRequired,
      _long: PropTypes.number.isRequired
    }).isRequired
  })
};

export default withRouter(CreateCampaign);
