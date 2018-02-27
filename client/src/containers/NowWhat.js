import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import CollapsePanel from '.././components/CollapsePanel';

const NowWhat = () => (
  <div>
    <PageHeader className="about-page-header-overrides">What Now?</PageHeader>
    <Grid fluid>
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <CollapsePanel
            titleText={'Tips for approaching your landlord'}
            body={
              <ol>
                <li>
                  Make an appointment with your property manager or landlord to talk about your
                  campaign
                </li>
                <li>
                  Print out the signatures and find neighbors who are interested in going to the
                  meeting with you
                </li>
                <li>Listen to your property manager's feedback or concerns</li>
                <li>Let us know what they said!</li>
              </ol>
            }
          />
          <CollapsePanel
            titleText={'Our Landlord ignored or denied our request'}
            body={
              <p>
                Boo! Why? Fill out this survey and tell us what the roadblockers towards getting
                recycling services were.
              </p>
            }
          />
        </Col>
      </Row>
    </Grid>
  </div>
);
export default NowWhat;
