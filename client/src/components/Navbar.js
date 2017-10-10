import React from 'react';
import { Link } from 'react-router';

const NavBar = () => (
  <nav className="navbar">
    <div className="container">
      <div className="row">
        <div className="col-md-9 navbar-header">
          <p>
            <Link className="home-link" to="/">Recycling Request Tool</Link>
          </p>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
