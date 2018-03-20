import React from 'react';
import dateformat from 'dateformat';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class CampaignProgessBar extends React.Component {
  getPhaseCompletionDates = (startDate, numSteps, duration) => {
    const phaseDates = [];
    for (let i = 0; i < numSteps; i += 1) {
      const phaseDate = new Date(startDate);
      phaseDate.setDate(phaseDate.getDate() + i * duration / (numSteps - 1));
      phaseDates.push(phaseDate);
    }

    return phaseDates;
  };

  getMonthAndDay = date => dateformat(date, 'mmm dS');

  renderProgressPhase = (phaseCompletionDate, phaseTitle) => {
    const phaseComplete = Date.now() > phaseCompletionDate.getTime();
    const iconClasses = phaseComplete ? 'fa-check-circle-o complete' : 'fa-circle-o';
    return (
      <Col md={3} xs={6} className="status" key={phaseTitle}>
        <div className="text-center">
          <i className={`fa ${iconClasses}`} aria-hidden="true" />
          <h5>{this.getMonthAndDay(phaseCompletionDate)}</h5>
          <p>{phaseTitle}</p>
        </div>
      </Col>
    );
  };

  render() {
    let { createdAt } = this.props;
    const { phases, duration } = this.props;
    const timestamp = Date.parse(createdAt);
    if (isNaN(timestamp)) {
      createdAt = new Date(Date.now()).toString();
    }

    const phaseDates = this.getPhaseCompletionDates(createdAt, phases.length, duration);
    const progressSteps = phaseDates.map((phaseDate, index) =>
      this.renderProgressPhase(phaseDate, phases[index])
    );

    return <div>{progressSteps}</div>;
  }
}

CampaignProgessBar.propTypes = {
  createdAt: PropTypes.string.isRequired, // Date string
  phases: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.number.isRequired
};

export default CampaignProgessBar;
