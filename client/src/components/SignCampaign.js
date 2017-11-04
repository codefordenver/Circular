import React from 'react';
import {connect} from 'react-redux';
import {OAuthSignInButton} from "redux-auth/default-theme";
import {addSignatureToCampaign} from '../redux/actions/signature'
// import { Link } from 'react-router';

const SignCampaign = (props) => {
  const { auth } = props;
  const { activeCampaign } = props;
  const user = auth && auth.user;
  // const isSignedIn = user && user.isSignedIn;
  // const name = user && user.attributes && user.attributes.name;
  // const email = user && user.attributes && user.attributes.email;
  const campaignId = activeCampaign && activeCampaign.campaign && activeCampaign.campaign.id;
  const sendUserSignature = (userId, campaignId) => { addSignatureToCampaign(userId, campaignId)};
  return (
    <div className="sign-campaign-wrapper">
      <h2>Show your support!</h2>
      <OAuthSignInButton next={(response) => {sendUserSignature(response.user.id, campaignId)}} provider="google">Google</OAuthSignInButton>
      <OAuthSignInButton provider="facebook">Facebook</OAuthSignInButton>
    </div>
  )
};

export default connect(
  ({auth, activeCampaign}) => ({auth, activeCampaign}), {addSignatureToCampaign})(SignCampaign);