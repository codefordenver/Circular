import React from 'react';
import RecyclingInfo from '../components/RecyclingInfo';
import PropManagerLinks from '../components/PropManagerLinks';

const InfoAndLinks = () => (
  <div className="info-and-links">
    <RecyclingInfo />
    <div className="vertical-line" />
    <PropManagerLinks />
  </div>
);

export default InfoAndLinks;
