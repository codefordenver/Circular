/* eslint-disable react/prop-types */ /* - TODO: Fix and remove this line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';
import { createCampaign } from '../redux/actions/initialSearch';

class NewCampaign extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { childRoutes } = this.props.route;
    const { pathname } = this.props.location;

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
        <section className="create_campaign_subroute_wrapper">{this.props.children}</section>
      </div>
    );
  }
}

export default connect(({ initialSearch }) => ({ initialSearch }))(NewCampaign);
