import React from "react";
import { PageHeader, Grid, Row, Col } from "react-bootstrap";

const DenverInfo = () => (
  <div>
    <Grid fluid>
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <PageHeader className="info-page-header-overrides">Recycling Request Tool FAQ</PageHeader>
          <ol className="info-list info-numeric-list">
            <li>
              The primary goal of the project is to provide tenants with the ability to
              transparently and collectively petition their landlord, through an automated and
              highly efficient process. The flow of the tool would be as follows:
            </li>
            <li>
              A tenant creates an online campaign to petition their landlord for recycling
              collection. Information regarding landlord contact details, building occupancy,
              existing waste capacity and hauling company, etc is collected. An 8.5" x 11" poster is
              generated for print and used to advertise the campaign in common areas of the building
              such as a lobby, mail room, or hallway. The poster provides a link to the building’s
              campaign where tenants can access and sign their building's online petition. This link
              can also be electronically distributed if a channel is available.
            </li>
            <li>Tenants can track the progress of their petition.</li>
            <li>
              The collection companies will submit standardized bids specifically tailored to the
              building’s collection needs (size and schedule) through the tool.
            </li>
            <li>
              After a 1 or 2-week sign and comment period, the petition, along with supplemental
              information and resources, is delivered to the landlord either electronically,
              physically, or both. A copy will also be emailed to each tenant that signed the
              petition. The deliverable will include the following:
              <ol className="info-list info-alpha-list">
                <li>Statement regarding the benefits of recycling.</li>
                <li>
                  Signed petition highlighting the number and overall fraction of tenants requesting
                  recycling collection.
                </li>
                <li>
                  An informational guide on available service providers and tips, including how to
                  calculate the reduction in trash collection services if recycling is adopted. The
                  landlord will also be provided with a set of recent tailored bids from local
                  collection companies.
                </li>
              </ol>
            </li>
            <li>
              The landlord then reviews the deliverable and commits to providing recycling
              collection for the building or denies the request. He or she will have the ability to
              respond to tenants through the tool.
            </li>
            <li>
              If successful, the tenants and landlord will be sent a guide on how to properly
              recycle. If not, then the app will inform them of alternative options such as the
              nearest centralized collection point.
            </li>
            <li>
              Data will be collected and mapped to visualize the adoption or denial of recycling
              collection. The data will be utilized to measure the efficacy of the tool, and
              provided to the public for their use.
            </li>
          </ol>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default DenverInfo;
