import React from 'react';
import { Link } from 'react-router';
import { Col, PageHeader } from 'react-bootstrap';
import SingleGraphBar from '../SingleGraphBar';

const RecyclingInfo = () => (
  <Col xs={10} xsOffset={1} md={6} mdOffset={0} className="recycling-info-wrapper">
    <div className="home-section-div">
      <div className="home-section-page-header page-header">
        <div className="bar-and-label">
          <span className="bar-label">Denver's recycling rate:</span>
          <SingleGraphBar
            num={23}
            denom={100}
            barColor="#f9c764"
            bgColor="rgba(0,0,0,0.2)"
            thickness="32px"
          />
        </div>

        <div className="bar-and-label">
          <span className="bar-label">National recycling rate:</span>
          <SingleGraphBar
            num={35}
            denom={100}
            barColor="#00c78b"
            bgColor="rgba(0,0,0,0.2)"
            thickness="32px"
          />
        </div>
      </div>

      <p className="home-section-description">
        The City of Denver only provides recycling service to single-family residential homes and
        buildings with seven or fewer units. Furthermore, multi-family building managers are not
        mandated to provide recycling service, but you and your neighbors can request recycling
        service from your landlord today!
      </p>
      <Link to="/denver-learn-more" className="home-section-link">
        LEARN MORE
      </Link>
    </div>
  </Col>
);

/*
<PageHeader className="home-section-page-header">
        Denver's recycling rate:
        <SingleGraphBar num={23} denom={100} barColor="#f9c764" bgColor="rgba(0,0,0,0.2)" thickness="60px"/>
      </PageHeader>

      <PageHeader className="home-section-page-header">
        National recycling rate:
        <SingleGraphBar num={35} denom={100} barColor="#00c78b" bgColor="rgba(0,0,0,0.2)" thickness="32px"/>
      </PageHeader>
*/
export default RecyclingInfo;
