import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import AutoSuggestInput from './AutoSuggestInput';

const HeroCTA = ({ openMap }) => (
  <div className="hero_wrapper">
    <div className="container">
      <form className="search_address_wrapper">
        <h1 className="search_address_heading">NEED RECYCLING</h1>
        <h1 className="search_address_heading_in"> -- IN -- </h1>
        <h1 className="search_address_heading">YOUR BUILDING?</h1>

        <AutoSuggestInput />
        <Link className="search_address_link" to="/denver-recycling-info">
          Learn more first
        </Link>
      </form>
    </div>
  </div>
);

HeroCTA.propTypes = {
  openMap: PropTypes.func.isRequired
};

export default HeroCTA;
