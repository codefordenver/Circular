import React from 'react';
import { IndexRoute, Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import ChooseCampaign from './containers/ChooseCampaign';
import NewCampaign from './containers/NewCampaign';
import CreateCampaignStep1 from './components/CreateCampaignStep1';
import CreateCampaignStep2 from './components/CreateCampaignStep2';
import CreateCampaignStep3 from './components/CreateCampaignStep3';
import CampaignPage from './containers/CampaignPage';
import RequestRecyclingTips from './containers/RequestRecyclingTips';
import DenverInfo from './containers/DenverInfo';
import ManagerResources from './containers/ManagerResources';
import DenverLearnMore from './containers/DenverLearnMore';
import Tools from './containers/Tools';
import Collaboration from './containers/Collaboration';
import PrivacyPolicy from './components/PrivacyPolicy';
import NotFound from './containers/NotFound';

export default (
  <Route path="/" getComponent={(location, callback) => callback(null, App)}>
    <IndexRoute getComponent={(location, callback) => callback(null, Home)} />
    <Route
      path="/choose-campaign"
      getComponent={(location, callback) => callback(null, ChooseCampaign)}
    />
    <Route
      path="/campaign"
      onEnter={(nextState, replace) => !nextState.params.id && replace('/new-campaign')}
    />
    <Route path="/new-campaign" getComponent={(location, callback) => callback(null, NewCampaign)}>
      <IndexRedirect to="address" />
      <Route
        path="address"
        getComponent={(location, callback) => callback(null, CreateCampaignStep1)}
      />
      <Route
        path="optional-info"
        getComponent={(location, callback) => callback(null, CreateCampaignStep2)}
      />
      <Route
        path="activate"
        getComponent={(location, callback) => callback(null, CreateCampaignStep3)}
      />
    </Route>
    <Route
      exact
      path="/campaign/:id"
      getComponent={(location, callback) => callback(null, CampaignPage)}
    />
    <Route
      path="/tips-for-requesting"
      getComponent={(location, callback) => callback(null, RequestRecyclingTips)}
    />
    <Route
      path="/denver-recycling-info"
      getComponent={(location, callback) => callback(null, DenverInfo)}
    />
    <Route
      path="/manager-resources"
      getComponent={(location, callback) => callback(null, ManagerResources)}
    />
    <Route
      path="/denver-learn-more"
      getComponent={(location, callback) => callback(null, DenverLearnMore)}
    />
    <Route path="/tools" getComponent={(location, callback) => callback(null, Tools)} />
    <Route
      path="/who-are-we"
      getComponent={(location, callback) => callback(null, Collaboration)}
    />
    <Route
      path="/privacy-policy"
      getComponent={(location, callback) => callback(null, PrivacyPolicy)}
    />

    <Route path="*" getComponent={(location, callback) => callback(null, NotFound)} />
  </Route>
);
