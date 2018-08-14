import React from 'react';
import RecyclingInfo from './RecyclingInfo';
import PropManagerLinks from './PropManagerLinks';

const InfoAndLinks = () => (
  <div className="info-and-links-wrapper">
    <RecyclingInfo />
    <div className="vertical-line" />
    <PropManagerLinks />
  </div>
);

export default InfoAndLinks;
