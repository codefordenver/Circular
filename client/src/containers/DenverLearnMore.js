import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import CollapsePanel from '../components/CollapsePanel';

const DenverLearnMore = () => (
  <Grid fluid>
    <Row>
      <Col xs={12} md={10} mdOffset={1}>
        <PageHeader className="info-page-header-overrides">
          Denver, we can do A LOT better than 20%!
        </PageHeader>
        <div className="info-text">
          <p>
            Denver recycles and composts only 20% of its waste, far behind the national average of
            34%. Curbside recycling is available only to most single-family residents--not to
            multi-family properties or businesses--and only 6% of Denver residents have composting
            collection. Multi-family and businesses are said to recycle and compost 22% of their
            waste- still a lot of room for improvement!
          </p>

          <p>
            Denver is falling behind on the basics of recycling at a time when major cities,
            including San Francisco, New York and Los Angeles, have set Zero Waste goals. Even
            Denver's peer cities, such as Salt Lake City, UT; Charlotte, NC; and Austin, TX, recycle
            twice as much as Denver. See how Denver compares on recycling to its peers.
          </p>

          <p>
            It's time to speak up and make better recycling and composting a priority for Denver!
            Get involved by{' '}
            <a className="info-link" href="http://ecocycle.org/take-action/denver">
              signing our letter
            </a>{' '}
            to Mayor Hancock.
          </p>
        </div>
        <CollapsePanel
          titleText="Why Recycle?"
          body={
            <div>
              <p>
                Recycling is known as the Climate Solution's best ket secret. Recycling is not about
                the materials kept in the economy, it's about the energy saved in making all of your
                things.
              </p>
              <ul className="info-list">
                <p>Energy Savings in:</p>
                <li>Mining Natural Resources</li>
                <li>Transportation</li>
                <li>Manufacturing</li>
              </ul>
              <p>
                When you recycle, you give a material a second life. Plastic bottles can become new
                things like carpet or clothing; aluminum cans and other metals are easily melted and
                made into new products.
              </p>
              <p>Don't "feed the 'fill". Recycle and compost instead.</p>
            </div>
          }
        />
        <CollapsePanel
          titleText="Tips for Recycling"
          body={
            <div>
              <p>PDF's with recycling guidelines (City of Denver and other haulers?)</p>
            </div>
          }
        />
        <CollapsePanel
          titleText="Common Myths"
          body={
            <div>
              <p className="collapse-panel-bold-p">"Most of my recycling goes to the landfill"</p>
              <p>
                Heavily contaminated loads do sometimes make it to the landfill. Recycling is a
                commodity, a clean product needs to be sorted at the Materials Recovery Facility
                (MRF) and is then sent to different markets worldwide.
              </p>
              <p>
                When a load is "too contaminated", it's barely distinguishable from your trash
                dumpster! There are organic materials, plastic bags, paper towels, appliances and
                even electronics! Most property managers are reluctant to provide recycling services
                for fear of contamination. When a bin is too contaminated, the property has the
                option of 1. cleaning out the recycling bin or 2. getting charged extra to haul the
                recyclables away as trash.
              </p>
              <br />
              <p className="collapse-panel-bold-p">"Landfills are ok, they recover energy"</p>
              <p>
                While modern landfills are incorporating "waste to energy" methane capture, over a
                landfill's lifespan, only 20% of the methane gas is adequately captured. The rest
                goes up to the atmosphere. Methane is 80x stronger than CO2!
              </p>
              <br />
              <p className="collapse-panel-bold-p">"All plastic is recyclable"</p>
              <p>
                Remember how we mentioned plastic bags are considered contamination? All of your
                recyclables go to a big machine which separates materials. Aluminum with aluminum,
                glass with glass, paper with paper, cardboard with cardboard and so on. Plastic bags
                are very lightweight, they can actually get stuck in between the machine's gear and
                clog it. Make sure your neighbors DON'T add "tanglers" like headphones or christmas
                lights.
              </p>
              <p>
                Make sure your neighbors DON'T add "tanglers" like headphones or christmas lights.
              </p>
            </div>
          }
        />
        <CollapsePanel
          titleText="FAQ's"
          body={
            <ol className="info-numeric-list">
              <p className="collapse-panel-bold-p">Why does recycling cost more?</p>
              <p>
                There is a cost to provide recycling services to apartments, as well as to homes and
                businesses. The biggest expense to providing the service is the cost of the driver
                and the truck. While recyclable materials like cardboard are valuable and can be
                sold for revenue, this revenue does not cover the costs of driving the truck to the
                property. Trash service also costs money for the same reason--the primary expense is
                driving the truck to the property.
              </p>
              <br />
              <p>
                It’s important to talk to your trash hauler about assessing how much trash service
                you need. Some properties may be able to save money on trash service by reducing the
                volume or frequency of services. This can help offset the costs of adding recycling
                service.
              </p>
              <br />
              <p className="collapse-panel-bold-p">
                I live in another city. How can I get recycling at my building? What happens if I
                live in...?
              </p>
              <p>
                First, make sure services aren’t available. Walk around the property and check out
                each dumpster enclosure for recycling and/or composting bins. Often times there are
                recycling bins in some enclosures and not others, or the bins are not conveniently
                located next to the trash containers.
              </p>

              <br />
              <p>
                If you’re sure there’s no recycling service, talk to your Property Manager or Home
                Owners Association. Ask if they have looked into providing recycling and/or
                composting service. What are the costs and barriers or concerns? <br />
                Some cities have municipally run systems like Denver, others have open markets like
                Boulder, others have a single hauler like Golden and Commerce City.
              </p>
              <br />
              <p>
                If your property manager or HOA is still not interested in providing recycling
                services, reach out to your local city staff to see if they can provide any
                assistance. Many cities can help the property owner through the process to add
                recycling. This may include helping the property owner get quotes for services,
                offering financial rebates to help offset the costs, conducting waste audits or
                providing recycling guidelines and other educational tools. In some cases the
                property owner may be able to reduce the frequency or volume of trash services,
                which will help offset the costs to add recycling.
              </p>
              <p>
                Check with your city to see if there are regulations in place that require property
                owners to provide services.
              </p>
              <br />
              <p>
                Get your neighbors involved. Ask your neighbors to sign a petition supporting adding
                recycling and composting to your community. You may need to show the property
                manager or the HOA that there is strong support for adding recycling and/or
                composting service.
              </p>
              <br />
              <p>
                Make a proposal. Present a proposal to your property manager or HOA board. You will
                need to do some research, contacting different haulers to get estimates and prepare
                a proposal of costs and services. Help us expand this tool!
              </p>
              <br />
              <p>
                This recycling campaign was developed for the City of Denver but we’d love your help
                to expand it to other cities in Colorado and nationwide. Contact us to learn more
                [recycle@ecocycle.org].
              </p>
            </ol>
          }
        />
      </Col>
    </Row>
  </Grid>
);

export default DenverLearnMore;
