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
import Tips from './containers/Tips';
import DenverInfo from './containers/DenverInfo';
import ManagerResources from './containers/ManagerResources';
import NotFound from './containers/NotFound';
import About from './containers/About';
// import NotFound from './containers/NotFound'; -- TODO: Add back


export default (
  <Route path="/" getComponent={(location, callback) => callback(null, App)}>
    <IndexRoute getComponent={(location, callback) => callback(null, Home)} />
    <Route
      path="/choose-campaign"
      getComponent={(location, callback) => callback(null, ChooseCampaign)}
    />
    <Route
      path="/campaign"
      onEnter={(nextState, replace) =>
        !nextState.params.id && replace('/new-campaign')}
    />
    <Route
      path="/new-campaign"
      getComponent={(location, callback) => callback(null, NewCampaign)}
    >
      <IndexRedirect to="address" />
      <Route
        path="address"
        getComponent={(location, callback) =>
          callback(null, CreateCampaignStep1)}
      />
      <Route
        path="optional-info"
        getComponent={(location, callback) =>
          callback(null, CreateCampaignStep2)}
      />
      <Route
        path="activate"
        getComponent={(location, callback) =>
          callback(null, CreateCampaignStep3)}
      />
    </Route>
    <Route
      path="/campaign/:id"
      getComponent={(location, callback) => callback(null, CampaignPage)}
    />
    <Route
      path="/tips-for-requesting"
      getComponent={(location, callback) => callback(null, Tips)}
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
      path="/about"
      getComponent={(location, callback) => callback(null, About)}
    />
  </Route>
);
