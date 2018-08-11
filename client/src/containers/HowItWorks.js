import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../stylesheets/components/_HowItWorks.scss';

const SectionSlice = ({ header, description }) => (
  <div className="how-it-works-sections-slices">
    <h2> {header}</h2>
    <p>
      {' '}
      Print a flier, post in a public place, like laundry or mail room, or share via social media
    </p>
  </div>
);

SectionSlice.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string
};

class HowItWorks extends React.Component {
  state = {};
  render() {
    return (
      <div className="how-it-works-container">
        <div className="how-it-works-banner">
          <h1 style={{ color: '#164c5f' }}> HOW IT WORKS PAGE </h1>
        </div>
        <div className="how-it-works-content-section">
          <Grid>
            <Row>
              <Col sm={12} md={2}>
                <div className="how-it-works-logo">
                  <i className="fa fa-bullhorn" style={{ width: '100%', fontSize: '2em' }} />
                  Create a Campaign
                </div>
              </Col>
              <Col sm={12} md={4}>
                <SectionSlice
                  header="Share your campaign"
                  description="Print a flier, post in a public place, like laundry or mail room, or share via social media"
                />
                <SectionSlice
                  header="Time Feature"
                  description="You can have extra time if you need"
                />
                <SectionSlice
                  header="Tools"
                  description="Access resources like recycling guidelines, tip for approaching your lanloard, data documentation and more"
                />
              </Col>
              <Col sm={12} md={6} style={{ background: 'red' }}>
                content
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default HowItWorks;
