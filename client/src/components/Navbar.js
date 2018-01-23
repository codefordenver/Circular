import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <div className="row">
        <div className="col-md-2 navbar-header">
          <p>
            <Link className="home-link" to="/">
              RE:IMAGINE DENVER
            </Link>
            <Link className="home-right1-link">WHY</Link>
            <Link className="home-right2-link">TOOLS</Link>
            <Link className="home-right3-link">MY CAMPAIGN</Link>
            <Link className="home-right4-link">WHO WE ARE</Link>
          </p>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
