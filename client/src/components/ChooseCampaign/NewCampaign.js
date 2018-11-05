import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import SubmitButton from '../UtilComponents/SubmitButton';
import AddressHeading from '../UtilComponents/AddressHeading';

function NewCampaign({ auth, router }) {
  const handleSelection = () => {
    auth.uid
      ? router.push({
          pathname: '/create-campaign'
        })
      : router.push({
          pathname: '/login',
          state: {
            createCampaignFlow: true
          }
        });
  };
  return (
    <Grid>
      <Row>
        <Col xs={12} md={4} mdOffset={4} className="p-0 text-white">
          <AddressHeading
            headingTitle={"You're the first to support recycling for your building!"}
            subTitle={
              'As the leader for your campaign, your account lets you access your campaign and make progress.'
            }
          />
          <SubmitButton
            buttonText={'CREATE CAMPAIGN'}
            handleSelection={handleSelection}
            name={'NEW_CAMPAIGN'}
          />
        </Col>
      </Row>
    </Grid>
  );
}

NewCampaign.defaultProps = {
  firebaseCampaigns: { activeCampaign: null },
  firebaseInitialSearch: null
};

NewCampaign.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    uid: PropTypes.string
  }).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
  // firebaseCampaigns: PropTypes.shape({
  //   activeCampaign: PropTypes.string
  // }),
  // firebaseCreateNewCampaign: PropTypes.func.isRequired,
  // router: PropTypes.shape({
  //   push: PropTypes.func.isRequired
  // }).isRequired,
  // firebaseInitialSearch: PropTypes.shape({
  //   searchedGeoPoint: PropTypes.shape({
  //     _lat: PropTypes.number.isRequired,
  //     _long: PropTypes.number.isRequired
  //   }).isRequired
  // })
};

export default withRouter(NewCampaign);
