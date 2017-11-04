import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import ChooseCampaign from './containers/ChooseCampaign';
import NewCampaign from './containers/NewCampaign';
import CampaignPage from './containers/CampaignPage';
import Tips from './containers/Tips';
import DenverInfo from './containers/DenverInfo';
import ManagerResources from './containers/ManagerResources';
import NotFound from './containers/NotFound';
import About from './containers/About';

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
      <Route
        path="/new-campaign/address"
        getComponent={(location, callback) => callback(null, NewCampaign)}
      />
      <Route
        path="/new-campaign/specs"
        getComponent={(location, callback) => callback(null, NewCampaign)}
      />
      <Route
        path="/new-campaign/activate"
        getComponent={(location, callback) => callback(null, NewCampaign)}
      />
      <Route
        path="/new-campaign/success"
        getComponent={(location, callback) => callback(null, NewCampaign)}
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
    <Route path="/about" getComponent={(location, callback) => callback(null, About)} />
  </Route>
);
