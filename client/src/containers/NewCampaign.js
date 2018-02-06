/* eslint-disable react/prop-types */ /* - TODO: Fix and remove this line */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';

function NewCampaign(props) {
  const { childRoutes } = props.route;
  const { pathname } = props.location;

  return (
    <div className="create_campaign_wrapper">
      <h1 className="create_campaign_header">{"Let's create a campaign!"}</h1>
      <div className="create_campaign_breadcrumbs">
        {childRoutes.map(childRoute => (
          <Link to={`/new-campaign/${childRoute.path}`}>
            <div
              className={cx(
                'breadcrumb',
                pathname === `/new-campaign/${childRoute.path}` && 'active_route'
              )}
            />
          </Link>
        ))}
      </div>
      <section className="create_campaign_subroute_wrapper">{props.children}</section>
    </div>
  );
}

export default connect(({ initialSearch }) => ({ initialSearch }))(NewCampaign);
