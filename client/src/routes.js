import React from 'react';
import { IndexRoute, Route } from 'react-router';

export default store => (
  <Route
    path="/"
    getComponent={(location, callback) => {
      require.ensure([], (require) => {
        callback(null, require('./containers/App'));
      });
    }}
  >
    <IndexRoute
      getComponent={(location, callback) => {
        require.ensure([], (require) => {
          callback(null, require('./containers/Home'));
        });
      }}
    />
    <Route
      path="/campaign"
      onEnter={(nextState, replace) => !nextState.params.id && replace('/campaign/new')}
    >
      <Route
        path="/campaign/new"
        getComponent={(location, callback) => {
          require.ensure([], (require) => {
            callback(null, require('./containers/NewCampaign'));
          });
        }}
      />
      <Route
        path="/campaign/:id"
        getComponent={(location, callback) => {
          require.ensure([], (require) => {
            callback(null, require('./containers/CampaignPage'));
          });
        }}
      />
    </Route>
    <Route
      path="/request-tips"
      getComponent={(location, callback) => {
        require.ensure([], (require) => {
          callback(null, require('./containers/RequestTips'));
        });
      }}
    />
    <Route
      path="/denver-recycling-info"
      getComponent={(location, callback) => {
        require.ensure([], (require) => {
          callback(null, require('./containers/DenverInfo'));
        });
      }}
      ignoreScrollBehavior={false}
    />
    <Route
      path="/manager-resources"
      getComponent={(location, callback) => {
        require.ensure([], (require) => {
          callback(null, require('./containers/ManagerResources'));
        });
      }}
      ignoreScrollBehavior={false}
    />
    <Route
      path="/error"
      status={404}
      getComponent={(location, callback) => {
        require.ensure([], (require) => {
          callback(null, require('./containers/NotFound'));
        });
      }}
    />
    {/* Catch all route */}
    <Route
      path="*"
      status={404}
      onEnter={(nextState, replace) => {
        replace('/error');
      }}
    />
  </Route>
);
