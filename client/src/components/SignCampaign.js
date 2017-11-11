import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SocialLogin from 'react-social-login';
import Checkbox from './SignatureCheckbox';
// import GoogleButton from 'react-google-button';
import { addSignatureToCampaign, logSignerOut } from '../redux/actions/signature';
// import { beginAuth } from '../redux/actions/authorization';

const Button = ({ children, triggerLogin, ...props }) => (
  <button onClick={triggerLogin} {...props}>
    {children}
  </button>
);

const SocialButton = SocialLogin(Button);

class SignCampaign extends Component {
  renderError() {
    return (
      <div className="error-message">
        {this.props.signatureObj.error && this.props.signatureObj.error.code === 11000
          ? 'You already have signed this petition!'
          : null}
      </div>
    );
  }

 componentWillMount = () => {
   this.selectedCheckboxes = new Set();
 };

 toggleCheckbox = (label) => {
   if (this.selectedCheckboxes.has(label)) {
     this.selectedCheckboxes.delete(label);
   } else {
     this.selectedCheckboxes.add(label);
   }
 };

 handleFormSubmit = async (formSubmitEvent) => {
   formSubmitEvent.preventDefault();

   const campaignId =
   this.props.activeCampaign &&
   this.props.activeCampaign.campaign &&
   this.props.activeCampaign.campaign._id;

   // if (this.props.auth === undefined) {
   //   return <div />;
   // } // I'm not sure this is needed but I don't remember what it was for...

   await this.props.addSignatureToCampaign(
     this.props.auth._id,
     this.selectedCheckboxes,
     campaignId
   );

   for (const checkbox of this.selectedCheckboxes) {
     console.log(checkbox, 'is selected.');
   }
   this.props.logSignerOut();
 };

 createCheckbox = label => (
   <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label} />
 );

 createCheckboxes = () => {
   const checkboxes = ['Keep me updated on the status of this request'];
   return checkboxes.map(label => this.createCheckbox(label));
 };

 handleSocialLogin = (user) => {
   console.log(user);
 };

 handleSocialLoginFailure = (err) => {
   console.error(err);
 };

 checkSignIn = () => {
   if (this.props.auth && !this.props.auth.googleID) {
     return (
       <SocialButton
         provider="google"
         appId={'AIzaSyAwICoMBInIKadYG6gXwsfSaL4fGNbog3U'}
         onLoginSuccess={this.handleSocialLogin}
         onLoginFailure={this.handleSocialLoginFailure}
       >
         {'sign with the googs'}
       </SocialButton>
     );
   }
 };

 renderContent() {
   return (
     <div className="container">
       <div className="row">
         <div className="col-sm-12">
           {this.createCheckboxes()}
           <SocialButton
             provider="google"
             appId={'45736087042-kdq1atpud65dca2a44hmtpadura3qcfa.apps.googleusercontent.com'}
             onLoginSuccess={this.handleSocialLogin}
             onLoginFailure={this.handleSocialLoginFailure}
           >
             {'sign with the googs'}
           </SocialButton>
         </div>
       </div>
     </div>
   );
 }

 render() {
   return (
     <div className="sign-campaign-wrapper">
       <h1>Yes, I Want Recycling!</h1>
       {this.renderError()}
       <div className="sign-campaign-signature-button">
         <div>Sign with:</div>
         <SocialButton
           provider="google"
           appId={'45736087042-kdq1atpud65dca2a44hmtpadura3qcfa.apps.googleusercontent.com'}
           onLoginSuccess={this.handleSocialLogin}
           onLoginFailure={this.handleSocialLoginFailure}
         >
           {'sign with the googs'}
         </SocialButton>
       </div>
     </div>
   );
 }
}

SignCampaign.defaultProps = {
  signatureObj: { signatures: [] },
  auth: {}
};

SignCampaign.propTypes = {
  signatureObj: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    signatures: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  auth: PropTypes.shape({
    _id: PropTypes.string,
    googleID: PropTypes.string
  }),
  activeCampaign: PropTypes.shape({
    campaign: PropTypes.shape({
      street_address: PropTypes.string,
      _id: PropTypes.string
    }),
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  }).isRequired,
  addSignatureToCampaign: PropTypes.func.isRequired,
  logSignerOut: PropTypes.func.isRequired
};

export default connect(({ auth, activeCampaign }) => ({ auth, activeCampaign }), {
  addSignatureToCampaign,
  logSignerOut
})(withRouter(SignCampaign));
