import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import CollapsePanel from '../UtilComponents/CollapsePanel';

const ToolsForTenants = () => (
  <div>
    <Grid fluid>
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <PageHeader className="info-page-header-overrides">Tools for Residents</PageHeader>
          <div className="info-text">
            <h3 className="info-heading">
              <a href="#">Recycling fact sheet:</a>
            </h3>
            <p>Useful facts that to help convince neighbors to support recycling intiatives.</p>

            <h3 className="info-heading">
              <a href="#">Posters and flyers:</a>
            </h3>
            <p>For publicizing campaigns.</p>

            <h3 className="info-heading">
              <a href="#">Campaing management sheet:</a>
            </h3>
            <p>
              This sheet guides campaign managers through the process, acting as a sort of
              "checklist". It is not required, but is a useful way to visualize the process.
            </p>

            <h3 className="info-heading">
              <a href="#">Signature sheet:</a>
            </h3>
            <p>Sheet to be printed and hung in select areas along with posters.</p>

            <h3 className="info-heading">
              <a href="#">"How we did it" Case Study:</a>
            </h3>
            <p>Stories of other residents succesfully campaigning for service.</p>

            <h3 className="info-heading">
              <a href="#">Recycling Guidelines from Denver:</a>
            </h3>
            <p>
              For both successful and ongoing campaigns. Note the types of materials that could be
              recycled.
            </p>
          </div>

          <CollapsePanel
            titleText={'FAQs'}
            body={
              <div>
                <div>
                  <strong>How much time will I need to dedicate?</strong>
                  <p>(give a baseline or minimum)</p>
                </div>

                <div className="faq-div">
                  <strong>How can I get people to sign the petition?</strong>
                  <p>
                    (Ideas of where to post locally; digtially post; attending resident meetings and
                    mixers(if there are ones), newsletter, etc.)
                  </p>
                </div>

                <div className="faq-div">
                  <strong>How should I ask my neighbors to get involved?</strong>
                  <p>
                    (Provide fact sheet; examples from case studies; door-to-door flyering, etc.){' '}
                  </p>
                </div>
              </div>
            }
            defaultExpanded
          />

          <CollapsePanel
            titleText={'Tips for approaching your landlord'}
            body={
              <ul>
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
              </ul>
            }
          />
          <CollapsePanel
            titleText={'Our Landlord ignored or denied our request'}
            body={
              <p>
                Boo! Why? Fill out{' '}
                <a
                  className="info-link"
                  href="https://docs.google.com/spreadsheets/u/2/d/1LjlhDV17ciP0v_vn3Q5K4CJRm6ENgcZMrv5XTIXzLwY/edit?usp=drive_web&ouid=111725726550951812389"
                >
                  this survey
                </a>{' '}
                and tell us what the roadblockers towards getting recycling services were.
              </p>
            }
          />
        </Col>
      </Row>
    </Grid>
  </div>
);
export default ToolsForTenants;
