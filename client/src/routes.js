import React from 'react';
import { IndexRoute, Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import FirebaseChooseCampaign from './containers/FirebaseChooseCampaign';
import NewCampaign from './containers/NewCampaign';
import CreateCampaignStep1 from './components/CreateCampaignStep1';
import CreateCampaignStep2 from './components/CreateCampaignStep2';
import CreateCampaignStep3 from './components/CreateCampaignStep3';
import HowItWorks from './components/HowItWorks/HowItWorks';
import CampaignContainer from './containers/CampaignContainer';
import ToolsForTenants from './components/Informational/ToolsForTenants';
import DenverInfo from './components/Informational/DenverInfo';
import ManagerResources from './components/Informational/ManagerResources';
import DenverLearnMore from './components/Informational/DenverLearnMore';
import Collaboration from './components/Informational/Collaboration';
import PrivacyPolicy from './components/Footer/PrivacyPolicy';
import NotFound from './components/UtilComponents/NotFound';

export default (
  <Route path="/" getComponent={(location, callback) => callback(null, App)}>
    <IndexRoute getComponent={(location, callback) => callback(null, Home)} />
    <Route
      path="/choose-campaign"
      getComponent={(location, callback) => callback(null, FirebaseChooseCampaign)}
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
      path="/campaign/:id"
      getComponent={(location, callback) => callback(null, CampaignContainer)}
    />
    <Route
      path="/tips-for-requesting"
      getComponent={(location, callback) => callback(null, ToolsForTenants)}
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
    <Route
      path="/who-are-we"
      getComponent={(location, callback) => callback(null, Collaboration)}
    />
    <Route
      path="/privacy-policy"
      getComponent={(location, callback) => callback(null, PrivacyPolicy)}
    />
    <Route
      path="/how-does-this-work"
      getComponent={(location, callback) => callback(null, HowItWorks)}
    />

    <Route path="*" getComponent={(location, callback) => callback(null, NotFound)} />
  </Route>
);
