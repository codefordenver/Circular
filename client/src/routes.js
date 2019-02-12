import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import CampaignSearchContainer from './containers/CampaignSearchContainer';
// import CreateCampaignStep1 from './components/CreateCampaignStep1';
// import CreateCampaignStep2 from './components/CreateCampaignStep2';
// import CreateCampaignStep3 from './components/CreateCampaignStep3';
import HowItWorks from './components/HowItWorks/HowItWorks';
import CampaignContainer from './containers/CampaignContainer';
import RequestRecyclingTips from './components/Informational/RequestRecyclingTips';
import DenverInfo from './components/Informational/DenverInfo';
import ManagerResources from './components/Informational/ManagerResources';
import DenverLearnMore from './components/Informational/DenverLearnMore';
import Collaboration from './components/Informational/Collaboration';
import PrivacyPolicy from './components/Footer/PrivacyPolicy';
import CampaignAlreadyExistsContainer from './containers/CampaignAlreadyExistsContainer';
import NewCampaignContainer from './containers/NewCampaignContainer';
import CreateCampaignContainer from './containers/CreateCampaignContainer';
import NotFound from './components/UtilComponents/NotFound';
import AuthenticatedRoutesContainer from './containers/AuthenticatedRoutesContainer';
import LoginContainer from './containers/LoginContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/search-campaign" component={CampaignSearchContainer} />
    <Route path="/existing-campaign" component={CampaignAlreadyExistsContainer} />
    <Route
      path="/campaign"
      onEnter={(nextState, replace) => !nextState.params.id && replace('/create-campaign')}
    />
    <Route path="/campaign/:id" component={CampaignContainer} />

    <Route path="/login" component={LoginContainer} />
    <Route path="/new-campaign" component={NewCampaignContainer} />
    <Route component={AuthenticatedRoutesContainer}>
      <Route path="/create-campaign" component={CreateCampaignContainer} />
    </Route>
    {/* <Route path="/new-campaign" component={NewCampaign}>
      <IndexRedirect to="address" />
      <Route path="address" component={CreateCampaignStep1} />
      <Route path="optional-info" component={CreateCampaignStep2} />
      <Route path="activate" component={CreateCampaignStep3} />
    </Route> */}
    <Route path="/tips-for-requesting" component={RequestRecyclingTips} />
    <Route path="/denver-recycling-info" component={DenverInfo} />
    <Route path="/manager-resources" component={ManagerResources} />
    <Route path="/denver-learn-more" component={DenverLearnMore} />
    <Route path="/who-are-we" component={Collaboration} />
    <Route path="/privacy-policy" component={PrivacyPolicy} />
    <Route path="/how-does-this-work" component={HowItWorks} />

    <Route path="*" component={NotFound} />
  </Route>
);
