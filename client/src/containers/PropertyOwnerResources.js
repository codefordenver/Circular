import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import CollapsePanel from '.././components/CollapsePanel';

const PropertyOwnerResources = () => (
  <div>
    <Grid fluid>
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <PageHeader className="about-page-header-overrides">Property Owner Resources</PageHeader>

          <CollapsePanel
            titleText="Q: My tenants have requested service, now what?"
            body={
              <p>
                A: Check your current waste contract. Do they offer recycling services? Ask about
                how much it would cost to get the service for your property. You can always shop
                around for different haulers that offer recycling services in your area.
                <a
                  className="about-link"
                  href="http://www.denvergov.org/content/denvergov/en/trash-and-recycling/recycling/business-and-multi-family-recycling.html"
                >
                  See a list of registered haulers here
                </a>
              </p>
            }
          />
          <CollapsePanel
            titleText="Q: What if I don't have space for a recycling dumpster?"
            body={
              <div>
                <p>
                  A: You can switch out a trash dumpster for a recycling dumpster. The amount of
                  waste will not increase nor decrease, it will stay the same. What will change is
                  which dumpster the materials are going in, recycle or trash.
                </p>
                <br />
                <p>
                  If there is no room in the enclosure, or you're not willing to give up a trash
                  dumpster, are your tenants willing to give up an extra parking space to make room
                  for a recycling area?
                </p>
                <br />
                <p>
                  If you have trash chutes, make sure to tell your tenants where they can find their
                  new recycling services.
                </p>
                <br />
                <p>
                  Whatever the case is, increase transparency by telling your tenants your
                  logistical issues so they can understand your obstacles and hesitations if there
                  are any.
                </p>
              </div>
            }
          />
          <CollapsePanel
            titleText="Q: I'm worried my tenants won't use the services right."
            body={
              <p>
                A: Make sure your enclosures, bins and dumpsters are properly labeled! The bigger
                the sign, the better. If contamination is really a concern, provide your tenants
                with a recycle only enclosure so those who want to do the right thing know where to
                go to do it.
              </p>
            }
          />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default PropertyOwnerResources;
