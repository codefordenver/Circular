import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

// miliseconds in a day
const ONE_DAY = 1000 * 60 * 60 * 24;

class CampaignStatus extends React.Component {
  calculateDaysLeft = (createdDate, duration) => {
    const expireDate = new Date(createdDate);
    expireDate.setTime(expireDate.getTime() + duration * ONE_DAY);
    const now = new Date(Date.now());

    return Math.max(Math.round((expireDate.getTime() - now.getTime()) / ONE_DAY), 0);
  };

  render() {
    let { createdAt } = this.props;
    const { duration } = this.props;
    const timestamp = Date.parse(createdAt);
    if (isNaN(timestamp)) {
      createdAt = new Date(Date.now()).toString();
    }

    return (
      <Col className="status " md={12} xs={12}>
        <div className="text-center status-date">
          <h3>{this.calculateDaysLeft(createdAt, duration)}</h3>
          <p>Days Left</p>
          <i className="fa fa-calendar" aria-hidden="true" />
        </div>
      </Col>
    );
  }
}

CampaignStatus.propTypes = {
  createdAt: PropTypes.instanceOf(Date).isRequired,
  duration: PropTypes.number.isRequired
};

export default CampaignStatus;
