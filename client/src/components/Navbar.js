import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Navbar = props => {
  let homeText;
  if (props.location.pathname === '/') {
    homeText = 'RE:IMAGINE DENVER';
  } else {
    homeText = 'HOME';
  }

  return (
    <nav className="nav-bar-component">
      <div className="nav-bar-container">
        <div className="nav-bar-row">
          <p className="float-left">
            <Link className="home-link" to="/">
              {homeText}
            </Link>
          </p>
          <ul className="top-nav-list">
            <li>
              <Link className="fa" to="/about">
                Why
              </Link>
            </li>
            <li>
              <Link className="fa" to="/tools">
                Tools
              </Link>
            </li>
            <li>
              <Link className="fa" to="/who-are-we">
                Who Are We
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default Navbar;
