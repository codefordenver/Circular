import React from 'react';
import { Row, Col, Grid, PageHeader } from 'react-bootstrap';
import CollapsePanel from '.././components/CollapsePanel';

const ManagerResources = () => (
  <div>
    <PageHeader className="about-page-header-overrides">Property Manager Resources</PageHeader>
    <Grid fluid>
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <CollapsePanel
            titleText="Tips for Purchasing Service"
            body={
              <ol>
                <li>Check your current contract</li>
                <li>See list of haulers offering recycling in your area</li>
                <li>Obtain different bids</li>
              </ol>
            }
          />
          <CollapsePanel
            titleText="Going through the bid process"
            body={
              <ol>
                <li>Have your address ready</li>
                <li>Know how many bins, and what sizes you currently have</li>
                <li>Establish pick-up frequency</li>
              </ol>
            }
          />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default ManagerResources;
