/* eslint-disable react/prop-types */ /* - TODO: Fix and remove this line */
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';
import { Grid, Row, Col } from 'react-bootstrap';

function NewCampaign(props) {
  const { childRoutes } = props.route;
  const { pathname } = props.location;

  return (
    <Grid fluid>
      <Row>
        <Col xs={12} md={4} mdOffset={4}>
          <div className="create-campaign-breadcrumbs">
            {childRoutes.map(childRoute => (
              <Link
                key={childRoute.path}
                to={`/new-campaign/${childRoute.path}`}
                className={cx(
                  'breadcrumb',
                  pathname === `/new-campaign/${childRoute.path}` && 'active_route'
                )}
              />
            ))}
          </div>
          <section className="create-campaign-subroute-wrapper">{props.children}</section>
        </Col>
      </Row>
    </Grid>
  );
}

export default connect(({ initialSearch }) => ({ initialSearch }))(NewCampaign);
