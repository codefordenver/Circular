import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import SubmitButton from '../ChooseCampaign/SubmitButton';

const Collaboration = () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <PageHeader className="info-page-header-overrides text-center">Who We Are </PageHeader>
      </Col>
    </Row>
    <Row>
      <Col>
        <p className="info-text">
          <a
            className="info-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.codefordenver.org/"
          />{' '}
          <div id="f1">
            <p className="info-page-header-overrides">
              Eco-Cycle <br />
              is a Zero Waste non-profit based in Boulder Colorado. They started working in Denver
              in 2016 as a commitment at the Denver Sustainable Summit <br /> to increase Denver’s
              diversion rate to 34%.
              <SubmitButton buttonText={'Eco-Cycle'} />
            </p>
          </div>
          <div id="f2" />
          <div id="f3">
            <p className="info-page-header-overrides">
              Code For Denver <br />
              is volunteer-driven, community outreach that improves people’s lives through
              technology.
              <SubmitButton className="submit-button" buttonText={'Code For Denver'} />
            </p>
          </div>
          <p />
        </p>
      </Col>
    </Row>
  </Grid>
);

export default Collaboration;
