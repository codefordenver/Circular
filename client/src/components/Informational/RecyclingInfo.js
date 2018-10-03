import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SingleGraphBar from '../SingleGraphBar';

const RecyclingInfo = () => (
  <Row>
    <Col xs={12} sm={8} smOffset={2} md={12} mdOffset={0}>
      <div className="recycling-info">
        <div className="text-content">
          <div>
            <div>
              <span>
                Colorado <strong>buries</strong> more than
              </span>
              <span className="large">$265M</span>
              <span>worth of resources every year.</span>
            </div>
          </div>

          <div>
            Be a part of the solution! We can help you and your neighbors request recycling from
            your landlord in 3 easy steps.
          </div>
        </div>

        <div className="bar-graphs">
          <div className="bar-and-label">
            <span className="bar-label">Denver's recycling rate:</span>
            <SingleGraphBar
              num={23}
              denom={100}
              barColor="#FC8D8D" // "#F16767"
              bgColor="#164c5f"
              thickness="32px"
            />
          </div>

          <div className="bar-and-label">
            <span className="bar-label">National recycling rate:</span>
            <SingleGraphBar
              num={35}
              denom={100}
              barColor="#f9c764"
              bgColor="#164c5f"
              thickness="32px"
            />
          </div>

          <div className="bar-and-label">
            <span className="bar-label">San Francisco's recycling rate:</span>
            <SingleGraphBar
              num={85}
              denom={100}
              barColor="#00c78b"
              bgColor="#164c5f"
              thickness="32px"
            />
          </div>
        </div>
      </div>
    </Col>
  </Row>
);

export default RecyclingInfo;
