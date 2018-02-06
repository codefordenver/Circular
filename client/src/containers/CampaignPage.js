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
            {campaign &&
              campaign.address && (
                <div className="row">
                  <div className="col-7">
                    <h1 className="campaign-page-name col-7 text-left">{campaign.name}</h1>
                    <h2 className="campaign-page-address text-left">
                      {loading && <i className="fa fa-recycle fa-4x fa-spin" />}
                      {loaded && campaign && campaign.address}
                    </h2>
                    <h4>CLASSIC PROPERTIES OF DENVER</h4>
                    <h4>
                      1620 E 6th Ave, Denver, CO 80218 <br /> (303) 355-4112
                    </h4>
                  </div>
                  <div className="col-4 offset-md-1">
                    <button className="btn btn-secondary btn-block">Facebook</button>
                  </div>
                </div>
              )}
            <div className="row ml-auto">
              <h2 className="col"> SHARE YOUR CAMPAGIN: </h2>
              <div className="col">
                <button className="btn btn-secondary btn-block">Facebook</button>
              </div>
              <div className="col">
                <button className="btn btn-danger btn-block">Instagram</button>
              </div>
              <div className="col">
                <button className="btn btn-success btn-block">Test</button>
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
