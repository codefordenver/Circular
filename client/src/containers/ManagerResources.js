import React from 'react';
import { Row, Col, Grid, PageHeader } from 'react-bootstrap';
import CollapsePanel from '.././components/CollapsePanel';

const ManagerResources = () => (
  <div>
    <Grid fluid>
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <PageHeader className="info-page-header-overrides">Property Manager Resources</PageHeader>
          <CollapsePanel
            titleText="Tips for Purchasing Service"
            body={
              <ul>
                <li>Check your current contract</li>
                <li>See list of haulers offering recycling in your area</li>
                <li>Obtain different bids</li>
              </ul>
            }
          />
          <CollapsePanel
            titleText="Going through the bid process"
            body={
              <ul>
                <li>Have your address ready</li>
                <li>Know how many bins, and what sizes you currently have</li>
                <li>Establish pick-up frequency</li>
              </ul>
            }
          />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default ManagerResources;
