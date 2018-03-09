import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import fetchCampaignById from '../redux/actions/activeCampaign';
import fetchSignatures from '../redux/actions/signature';
import Discussion from '../components/Discussion';
import SignCampaign from '../components/SignCampaign';
import SignatureList from '../components/SignatureList';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import CollapsePanel from '.././components/CollapsePanel';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import * as _ from 'lodash';
import { fetchApartmentsRequest } from '../redux/actions/initialSearch';

class CampaignPage extends Component {
  componentDidMount() {
    this.props.fetchCampaignById(this.props.params.id);
    this.props.fetchSignatures(this.props.params.id);
    this.props.fetchApartmentsRequest();
  }

  render() {
    const tools = [
      {
        title: 'Tips for Approaching your Landlord',
        to: '/tips-for-requesting'
      },
      {
        title: 'Denver Recycling Facts',
        to: '/denver-recycling-info'
      }
    ];
    const toolsList = tools.map(tool => (
      <li className="toolList">
        <i className="fa fa-circle" aria-hidden="true" />
        <Link to={tool.to}>{tool.title}</Link>
      </li>
    ));
    const { activeCampaign: { loading, loaded, campaign } } = this.props;
    const hrefIsLocalhost = window.location.href.toLowerCase().includes('localhost');

    return (
      <Grid className="">
        <Row>
          <Col md={9} xs={12} className="body">
            <Row className="show-grid">
              <Col md={7} xs={12} className="top center-block">
                <h4 className="address">
                  {campaign &&
                    campaign.address && (
                      <div>
                        <div className="campaign-page-name">{campaign.name}</div>
                        <div className="campaign-page-address">
                          {loading && <i className="fa fa-recycle fa-4x fa-spin" />}
                          {loaded && campaign && campaign.address}
                        </div>
                      </div>
                    )}
                </h4>
              </Col>
              <Col className="map center-block" md={4} xs={9}>
                <MapWithAMarker
                  googleMapURL={mapUrl}
                  loadingElement={<div style={{ height: '100%' }} />}
                  containerElement={
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        height: '100%',
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                      }}
                    />
                  }
                  mapElement={<div style={{ height: '100%' }} />}
                  onMapLoad={_.noop}
                  onMapClick={_}
                  markers={apartments}
                  onMarkerRightClick={_.noop}
                />
              </Col>
            </Row>
            <Row className="show-grid top">
              <Col className="social-bar" md={12} xs={12}>
                <Col md={3} xs={12} className="text-center share">
                  <p className="vcenter">Share Your Campaign</p>
                </Col>
                <div className="share-buttons">
                  <Col md={3} xs={6}>
                    <FacebookShareButton
                      quote="Support my recycling request!"
                      // facebook url errors on localhost, it has to be able to connect to something.  so if its on dev link it to the heroku page.
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
                  <Col md={3} xs={6}>
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
                  <Col md={3} xs={12}>
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
            <Row className="show-grid top">
              <Col className="status-bar" md={12} xs={12}>
                <Col className="status" md={2} xs={6}>
                  <div className="text-center">
                    <i className="fa fa-check-circle-o complete" aria-hidden="true" />
                    <h5>December 5</h5>
                    <p>Campaign Created</p>
                  </div>
                </Col>
                <Col className="status" md={2} xs={6}>
                  <div className="text-center">
                    <i className="fa fa-check-circle-o complete" aria-hidden="true" />
                    <h5>December 12</h5>
                    <p>Print Flyers</p>
                  </div>
                </Col>
                <Col className="status" md={2} xs={6}>
                  <div className="text-center">
                    <i className="fa fa-circle-o" aria-hidden="true" />
                    <h5>December 19</h5>
                    <p>Final Signatures</p>
                  </div>
                </Col>
                <Col className="status" md={2} xs={6}>
                  <div className="text-center">
                    <i className="fa fa-circle-o" aria-hidden="true" />
                    <h5>December 26</h5>
                    <p>Request Recycling</p>
                  </div>
                </Col>
                <Col className="status " md={4} xs={12}>
                  <div className="text-center status-date">
                    <h3>10</h3>
                    <p>Days Left</p>
                    <i className="fa fa-calendar" aria-hidden="true" />
                  </div>
                </Col>
              </Col>
            </Row>
            <Row className="show-grid top">
              <Col md={12} xs={12}>
                <Col md={3} xs={10} className="tools">
                  <h3>TOOLS:</h3>
                  <ul>{toolsList}</ul>
                </Col>
                <Col md={8} mdOffset={1} xs={10} className="tools">
                  <Discussion campaignID={this.props.params.id} />
                </Col>
              </Col>
            </Row>
          </Col>
          <Col md={3} xs={12} className="side-bar">
            <SignCampaign signatureObj={this.props.signature} />
            <div className="text-center">
              <CollapsePanel
                signatures={this.props.signature.signatures}
                titleText="See Who's Signed"
                body={
                  <ol>
                    <li>
                      <SignatureList signatures={this.props.signature.signatures} />
                    </li>
                  </ol>
                }
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
  markers: PropTypes.arrayOf(PropTypes.object),
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
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  signature: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    signatures: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  openMap: PropTypes.func.isRequired,
  closeMap: PropTypes.func.isRequired
};

export default connect(
  ({ activeCampaign, signature, initialSearch }) => ({ activeCampaign, signature, initialSearch }),
  {
    fetchCampaignById,
    fetchSignatures,
    fetchApartmentsRequest
  }
)(withRouter(CampaignPage));
