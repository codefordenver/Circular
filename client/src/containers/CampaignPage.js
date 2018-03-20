import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import fetchCampaignById from '../redux/actions/activeCampaign';
import fetchSignatures from '../redux/actions/signature';
import Discussion from '../components/Discussion';
import SignCampaign from '../components/SignCampaign';
import SignatureList from '../components/SignatureList';
import MapCard from '../components/MapCard';
import CollapsePanel from '.././components/CollapsePanel';
import { fetchApartmentsRequest } from '../redux/actions/initialSearch';
import CampaignProgressBar from '../components/CampaignProgressBar';
import CampaignStatus from '../components/CampaignStatus';

const CAMPAIGN_DURATION = 15;
class CampaignPage extends Component {
  componentDidMount() {
    this.props.fetchCampaignById(this.props.params.id);
    this.props.fetchSignatures(this.props.params.id);
    this.props.fetchApartmentsRequest();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.params.id !== nextProps.params.id) {
      nextProps.fetchCampaignById(nextProps.params.id);
      nextProps.fetchSignatures(nextProps.params.id);
    }
  }

  render() {
    const {
      activeCampaign: { loading, loaded, campaign },
      initialSearch: { apartments }
    } = this.props;
    const hrefIsLocalhost = window.location.href.toLowerCase().includes('localhost');

    return (
      <Grid className="">
        <Row>
          <Col md={9} xs={12} className="campaign-wrapper">
            <Row className="show-grid top">
              <Col md={6} xs={12} className="center-block">
                <div className="map-wrapper">
                  {campaign &&
                    campaign.address && (
                      <MapCard
                        campaign={campaign}
                        apartments={apartments}
                        campaignAddress={campaign.address}
                      />
                    )}
                </div>
              </Col>
              <Col className="center-block" md={6} xs={12}>
                <Row>
                  <Col className="status-bar" xs={12}>
                    {campaign &&
                      campaign.createdAt && (
                        <Row className="show-grid top">
                          <CampaignProgressBar
                            loading={loading}
                            loaded={loaded}
                            createdAt={campaign.createdAt}
                            phases={[
                              'Campaign Created',
                              'Print Flyers',
                              'Final Signatures',
                              'Request Recycling'
                            ]}
                            duration={CAMPAIGN_DURATION}
                          />
                        </Row>
                      )}
                  </Col>
                </Row>
                <Row className="top share-campaign-row">
                  <Col md={12} xs={12} className="text-center">
                    <p className="vcenter">Share Your Campaign</p>
                  </Col>
                  <Col md={12} xs={12}>
                    <div className="share-buttons">
                      <Col md={6} xs={6} className="share-bar">
                        <FacebookShareButton
                          quote="Support my recycling request!"
                          /*
                      facebook url errors on localhost, it has to be able to
                      connect to something.  so if its on dev link it to the heroku page.
                      */
                          url={
                            hrefIsLocalhost
                              ? `https://denver-reimagine.herokuapp.com/campaign/${
                                this.props.params.id
                              }`
                              : window.location.href
                          }
                        >
                          <Button bsStyle="remove-default" className="btn btn-facebook" block>
                            <i className="fa fa-facebook-square " />Facebook
                          </Button>
                        </FacebookShareButton>
                      </Col>
                      <Col md={6} xs={6} className="share-bar">
                        <TwitterShareButton
                          url={window.location.href}
                          title="Support my recycling request!"
                          via="EcoCycle"
                          hashtags={['ZeroWasteDenver', 'Recycle']}
                        >
                          <Button bsStyle="remove-default" className="btn btn-twitter" block>
                            <i className="fa fa-twitter-square" />Tweet
                          </Button>
                        </TwitterShareButton>
                      </Col>
                      <Col md={12} xs={12} className="share-bar">
                        <a
                          className="btn btn-flyer btn-block"
                          href={`${process.env.PUBLIC_URL}/flyer.pdf`}
                          target="_blank"
                        >
                          <i className="fa fa-download" /> Download Flyer
                        </a>
                      </Col>
                    </div>
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col className="status-bar" xs={12}>
                    {campaign &&
                      campaign.createdAt && (
                        <CampaignStatus
                          createdAt={campaign.createdAt}
                          duration={CAMPAIGN_DURATION}
                        />
                      )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="show-grid top">
              <Col md={12} xs={12}>
                <Discussion campaignID={this.props.params.id} />
              </Col>
            </Row>
          </Col>
          <Col md={3} xs={12} className="side-bar">
            <SignCampaign signatureObj={this.props.signature} />
            <div className="text-center sig-bar-collapse-panel">
              <CollapsePanel
                defaultExpanded
                titleText="See Who's Signed"
                body={<SignatureList signatures={this.props.signature.signatures} />}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

CampaignPage.defaultProps = {
  markers: []
};

CampaignPage.propTypes = {
  initialSearch: PropTypes.shape({
    apartments: PropTypes.array.isRequired
  }).isRequired,
  activeCampaign: PropTypes.shape({
    campaign: PropTypes.shape({
      street_address: PropTypes.string
    }),
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  }).isRequired,
  fetchCampaignById: PropTypes.func.isRequired,
  fetchSignatures: PropTypes.func.isRequired,
  fetchApartmentsRequest: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  signature: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    signatures: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.objectOf(PropTypes.any)
  }).isRequired
};

export default connect(
  ({ activeCampaign, signature, initialSearch }) => ({
    activeCampaign,
    signature,
    initialSearch
  }),
  {
    fetchCampaignById,
    fetchSignatures,
    fetchApartmentsRequest
  }
)(withRouter(CampaignPage));
