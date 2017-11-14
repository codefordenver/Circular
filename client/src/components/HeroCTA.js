import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import AutoSuggestInput from './AutoSuggestInput';

const HeroCTA = ({ openMap }) => (
  <div className="hero_wrapper">
    <div className="container">
      <button className="open_map_button" onClick={openMap}>
        Explore The Map
      </button>
      <form className="search_address_wrapper">
        <h1 className="search_address_heading">Need recycling at your building?</h1>
        <h2 className="search_address_sub_heading"> Join or create a campaign!</h2>
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
