import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import fetchCampaignById from '../redux/actions/activeCampaign';
import fetchSignatures from '../redux/actions/signature';
import Discussion from '../components/Discussion';
import SignCampaign from '../components/SignCampaign';
import SignatureList from '../components/SignatureList';

class CampaignPage extends Component {
  componentDidMount() {
    this.props.fetchCampaignById(this.props.params.id);
    this.props.fetchSignatures(this.props.params.id);
  }

  render() {
    const { activeCampaign: { loading, loaded, campaign } } = this.props;
    return (
      <div className="">
        <div className="row">
          <div className="col-9 camp-main">
            <div className="row">
              <div className="col-6">
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
              </div>
              <div className="col-6">
                <img
                  id="mapImg"
                  src="http://gws2.maps.yahoo.com/MapImage?appid=ysbs_map&mflags=y&zoom=15&imw=350&imh=250&street=3935+Dupont+Circle++Suite+A&city=+Louisville&state=+KY&zip=+40207"
                  alt=""
                />
              </div>
            </div>
            <div className="row ml-auto">
              <h2 className="col-3"> SHARE YOUR CAMPAGIN: </h2>
              <div className="col-3">
                <button className="large ui facebook button">
                  <i className="facebook icon" />
                  Facebook
                </button>
              </div>
              <div className="col-3">
                <button className="large ui instagram button">
                  <i className="instagram icon" />
                  Instagram
                </button>
              </div>
              <div className="col-3">
                <button className="btn btn-secondary">
                  <i className="twitter icon" />
                  Twitter
                </button>
              </div>
            </div>
            <div className="row ml-auto">
              <div>
                <h2 className="col-4">TOOLS:</h2>
                <ul className="toolList">
                  <li>
                    <span>Download a Flyer</span>
                  </li>
                  <li>
                    <span>Level of Service Esimator</span>
                  </li>
                  <li>
                    <span>Tips for Approaching Your Landlord</span>
                  </li>
                  <li>
                    <span>Denver Recycling Facts</span>
                  </li>
                </ul>
              </div>
              <div className="col-8">
                <a> Hello </a>
              </div>
            </div>
          </div>
          <div className="col-3 camp-sm">
            <SignCampaign signatureObj={this.props.signature} />
            <SignatureList signatures={this.props.signature.signatures} />
            <Discussion campaignID={this.props.params.id} />
          </div>
        </div>
      </div>
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
