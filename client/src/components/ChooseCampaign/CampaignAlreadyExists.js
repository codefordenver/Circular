import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import AddressHeading from './AddressHeading';
import SubmitButton from './SubmitButton';
import Loading from './Loading';

const CampaignAlreadyExists = ({ exactMatch, router }) => {
  if (!exactMatch) {
    console.error('Eek! We are not handling this case properly');
    return <Loading />;
  }
  return (
    <Grid>
      <Row>
        <Col xs={12} md={4} mdOffset={4} className="p-0 text-white">
          <AddressHeading
            headingTitle={'Looks like this address already has a campaign. Is this your address?'}
            subTitle={exactMatch.address}
          />
          <SubmitButton
            handleSelection={() => {
              router.push(`/campaign/${exactMatch.campaignId}`);
            }}
            buttonText={'Yup! Show Me!'}
            name={'EXISTING_CAMPAIGN'}
          />
          <div style={{ marginTop: '1em' }} />
          <SubmitButton
            handleSelection={router.goBack}
            buttonText={'Nope, Take Me Back'}
            name={'GO BACK'}
            faArrowDirection={'left'}
          />
        </Col>
      </Row>
    </Grid>
  );
};

CampaignAlreadyExists.defaultProps = {
  exactMatch: null
};

CampaignAlreadyExists.propTypes = {
  exactMatch: PropTypes.shape({
    addres: PropTypes.string.isRequired,
    campaignId: PropTypes.string.isRequired
  }),
  router: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(CampaignAlreadyExists);
