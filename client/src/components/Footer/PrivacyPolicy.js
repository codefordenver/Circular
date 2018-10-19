import React, { PureComponent } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

class PrivacyPolicy extends PureComponent {
  // patch for weird scrolling behavior to get page at top on mount
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={10} xsOffset={1}>
            <PageHeader className="info-page-header-overrides">Privacy Policy</PageHeader>
            <p className="home-section-footer text-justify">
              Privacy Policy Eco-Cycle aims to be as responsible when it comes to your privacy
              rights as we are when it comes to the environment. To this end, Eco-Cycle will not
              trade, rent, or sell any piece of member information to any individual or
              organization. Eco-Cycle is the sole owner of the information collected on this site.
              This information will not be sold or rented to others in ways different from what is
              disclosed in this statement. User Information Eco-Cycle collects basic user
              information to help maintain and enhance our website, information such as the user’s
              web browser, visit history, country of origin, and operating system. Any personal
              information you choose to provide is done so voluntarily. This information is used to
              provide services you request. You may unsubscribe at any time from any and all
              services through the subscription management page. Financial Transactions Eco-Cycle
              employs certified service providers to securely process charitable contributions,
              product purchases, or other financial exchanges. Personal information is kept private
              and secure and is not sold, rented, or traded to third parties. Credit card numbers
              are used only at the time of the transaction, and are not stored following the
              conclusion of the transaction unless a transaction is selected that occurs on a
              regular basis. For transactions that recur, credit card information is stored in an
              encrypted format. Links to external sites Throughout our website, Eco-Cycle provides
              links to external sites. While we take some precautions in directing visitors to other
              sites, Eco-Cycle is not responsible for the privacy practices of any sites outside of
              www.ecocycle.org. Site visitors are encouraged to exercise caution when conducting
              transactions outside of www.ecocycle.org and to read the privacy statements of each
              and every website that collects personally identifiable information. Use of material
              Eco-Cycle strongly believes in the importance of environmental education. Eco-Cycle
              encourages members to forward newsletters, donation requests, action alerts, and other
              communications to other interested parties to help raise environmental awareness.
              However, the reprinting or reuse of any text-based or graphic material from our
              website, publications, or other communications is strictly prohibited without express
              written consent from Eco-Cycle staff. Please contact Eco-Cycle for more information.
              Policy changes We reserve the right to modify this privacy policy at any time by
              posting a new policy to this site.
            </p>
            <PageHeader className="info-page-header-overrides">
              For questions on this policy, please contact Eco-Cycle at:
            </PageHeader>
            <p>Eco-Cycle</p>
            <p>Inc. P.O. Box 19006</p>
            <p>Boulder, CO 80308</p>
            <p>(303) 444-6634</p>
            <p>recycle@ecocycle.org</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default PrivacyPolicy;
