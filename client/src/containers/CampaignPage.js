import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import fetchCampaignById from '../redux/actions/activeCampaign';
import fetchSignatures from '../redux/actions/signature';
import ApartmentMap from '../components/CampaignsMap';
import Discussion from '../components/Discussion';
import SignCampaign from '../components/SignCampaign';
import SignatureList from '../components/SignatureList';

class CampaignPage extends Component {
  componentDidMount() {
    this.props.fetchCampaignById(this.props.params.id);
    this.props.fetchSignatures(this.props.params.id);
  }

  render() {
    const tools = ['Download a flyer', 'Tips for Approaching your Landlord', 'Denver Recycling Facts'];
    const toolsList = tools.map(tool => (
      <li className="toolList">
        <i className="fa fa-circle" aria-hidden="true" />
        {tool}
      </li>
    ));
    const { activeCampaign: { loading, loaded, campaign } } = this.props;
    return (
      <Grid fluid>
        <Row className="show-grid">
          <Col lg={9} sm={12} className="body">
            <Row className="show-grid">
              <Col lg={7} sm={12} className="top">
                <h4>
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
              <Col className="map" md={3} lgPush={1}>
                <ApartmentMap />
              </Col>
            </Row>
            <Row className="show-grid">
              <Col className="social-bar" md={12} xs={12}>
                <Row>
                  <Col className="share center-text" md={3} xs={3}>
                    <h3>Share Your Campaign:</h3>
                  </Col>
                  <Col md={3} xs={3}>
                    <Button className="btn btn-facebook" block>
                      <i className="fa fa-facebook-square " />Facebook
                    </Button>
                  </Col>
                  <Col md={3} xs={3}>
                    <Button className="btn btn-twitter" block>
                      <i className="fa fa-twitter-square" />Tweet
                    </Button>
                  </Col>
                  <Col md={3} xs={3}>
                    <Button className="btn btn-text" block>
                      <i className="fa fa-comment" />
                      Text a Link
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col className="status" md={2}>
                <div className="status-child">
                  <i className="fa fa-check-circle-o complete" aria-hidden="true" />
                  <h5>December 5</h5>
                  <p>Campaign Created</p>
                </div>
              </Col>
              <Col className="status" md={2}>
                <div className="status-child">
                  <i className="fa fa-check-circle-o complete" aria-hidden="true" />
                  <h5>December 12</h5>
                  <p>Print Flyers</p>
                </div>
              </Col>
              <Col className="status" md={2}>
                <div className="status-child">
                  <i className="fa fa-circle-o" aria-hidden="true" />
                  <h5>December 19</h5>
                  <p>Final Signatures</p>
                </div>
              </Col>
              <Col className="status" md={2}>
                <div className="status-child">
                  <i className="fa fa-circle-o" aria-hidden="true" />
                  <h5>December 26</h5>
                  <p>Request Recycling</p>
                </div>
              </Col>
              <Col className="status" md={3}>
                <div className="status-child date">
                  <h3>10</h3>
                  <p>Days Left</p>
                  <i className="fa fa-calendar" aria-hidden="true" />
                </div>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col className="tools" md={3}>
                <h3>TOOLS:</h3>
                <ul>{toolsList}</ul>
              </Col>
              <Col lg={9} sm={12}>
                <Discussion campaignID={this.props.params.id} />
              </Col>
            </Row>
          </Col>
          <Col md={3} sm={12} className="side-bar">
            <SignCampaign signatureObj={this.props.signature} />
            <SignatureList signatures={this.props.signature.signatures} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

CampaignPage.propTypes = {
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
  }).isRequired
};

export default connect(({ activeCampaign, signature }) => ({ activeCampaign, signature }), {
  fetchCampaignById,
  fetchSignatures
})(withRouter(CampaignPage));
