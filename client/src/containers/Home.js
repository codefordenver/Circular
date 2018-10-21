import React from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import HeroCTA from '../components/HeroCTA';
// import CampaignsMap from '../components/CampaignsMap';
import StepByStep from '../components/StepByStep';
import TenantOrPMChoice from '../components/TenantOrPMChoice';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner';

const Home = () => (
  <div>
    <HeroCTA />
    <Grid>
      <Banner>
        <div>
          <strong>Most Denver apartments don't have recycling on site.</strong>
        </div>
        <div>We can help you get recycling at your building.</div>
      </Banner>
    </Grid>
    <StepByStep />
    <TenantOrPMChoice />
    <Footer />
  </div>
);

export default connect(
  null,
  null
)(Home);
